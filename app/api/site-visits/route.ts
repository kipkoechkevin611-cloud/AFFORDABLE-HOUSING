import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const visits = await db.siteVisit.findMany({
      where: { userId: session.userId },
      include: { property: { include: { county: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ visits });
  } catch (err) {
    console.error("Site visits fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch site visits" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { propertySlug, date, time, notes, name, phone } = body;

    if (!propertySlug || !date || !time) {
      return NextResponse.json({ error: "Property, date, and time are required" }, { status: 400 });
    }

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      return NextResponse.json({ error: "Date cannot be in the past" }, { status: 400 });
    }

    const session = await getSession();
    let userId = session.userId;

    if (!userId) {
      const guestUser = await db.user.findFirst({ where: { phone } });
      if (guestUser) {
        userId = guestUser.id;
      } else {
        return NextResponse.json({ error: "Please log in to book a site visit" }, { status: 401 });
      }
    }

    const property = await db.property.findUnique({ where: { slug: propertySlug } });
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    const visit = await db.siteVisit.create({
      data: {
        userId,
        propertyId: property.id,
        date,
        time,
        notes: notes || null,
      },
    });

    return NextResponse.json({ success: true, visitId: visit.id }, { status: 201 });
  } catch (err) {
    console.error("Site visit create error:", err);
    return NextResponse.json({ error: "Failed to book site visit" }, { status: 500 });
  }
}
