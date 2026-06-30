import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const applications = await db.application.findMany({
      where: { userId: session.userId },
      include: { property: { include: { county: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ applications });
  } catch (err) {
    console.error("Applications fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { propertySlug, unitType, employment, employer, monthlyIncome, additionalInfo, name, phone } = body;

    if (!propertySlug || !unitType || !employment || !monthlyIncome) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const session = await getSession();

    let userId = session.userId;

    if (!userId) {
      const guestUser = await db.user.findFirst({ where: { phone } });
      if (guestUser) {
        userId = guestUser.id;
      } else {
        return NextResponse.json({ error: "Please log in to submit an application" }, { status: 401 });
      }
    }

    const property = await db.property.findUnique({ where: { slug: propertySlug } });
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    if (property.status === "SOLD_OUT") {
      return NextResponse.json({ error: "This property is sold out. Please join the waitlist." }, { status: 400 });
    }

    const existing = await db.application.findFirst({
      where: { userId, propertyId: property.id },
    });
    if (existing) {
      return NextResponse.json({ error: "You have already applied for this property" }, { status: 409 });
    }

    const application = await db.application.create({
      data: {
        userId,
        propertyId: property.id,
        unitType,
        employment,
        employer: employer || null,
        monthlyIncome: Number(monthlyIncome),
        additionalInfo: additionalInfo || null,
      },
    });

    return NextResponse.json({ success: true, applicationId: application.id }, { status: 201 });
  } catch (err) {
    console.error("Application create error:", err);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
