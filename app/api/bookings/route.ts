import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { bookingSchema } from "@/lib/validations";

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxRequests = 5;
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  if (record.count >= maxRequests) return false;
  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = bookingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid booking data", details: result.error.errors },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        name: result.data.name.trim(),
        phone: result.data.phone.trim(),
        email: result.data.email.trim().toLowerCase(),
        service: result.data.service,
        date: result.data.date,
        time: result.data.time,
        notes: result.data.notes?.trim() || null,
        status: "PENDING",
      },
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json(
      { error: "Failed to create booking. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    const skip = (page - 1) * limit;

    const where = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
          { phone: { contains: search } },
          { service: { contains: search, mode: "insensitive" as const } },
        ],
      }),
      ...(status && { status: status as "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" }),
    };

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.booking.count({ where }),
    ]);

    return NextResponse.json({
      bookings,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Booking fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings." }, { status: 500 });
  }
}
