import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const county = searchParams.get("county") || undefined;
    const houseType = searchParams.get("houseType") || undefined;
    const status = searchParams.get("status") || undefined;
    const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;
    const search = searchParams.get("search") || undefined;
    const featured = searchParams.get("featured") === "true" ? true : undefined;
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 12);
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (county) where.county = { name: county };
    if (houseType) where.houseType = houseType;
    if (status) where.status = status;
    if (maxPrice) where.startingPrice = { lte: maxPrice };
    if (featured !== undefined) where.isFeatured = featured;
    if (search) where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { town: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];

    const [properties, total] = await Promise.all([
      db.property.findMany({
        where,
        include: { county: true, paymentPlans: true },
        orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
        skip,
        take: limit,
      }),
      db.property.count({ where }),
    ]);

    return NextResponse.json({ properties, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error("Properties fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, countyId, town, address, houseType, bedrooms, startingPrice, totalUnits, availableUnits, status, amenities, nearbyFacilities, isFeatured } = body;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const property = await db.property.create({
      data: { name, slug, description, countyId, town, address, houseType, bedrooms: Number(bedrooms), startingPrice: Number(startingPrice), totalUnits: Number(totalUnits), availableUnits: Number(availableUnits), status: status || "AVAILABLE", amenities: amenities || [], nearbyFacilities: nearbyFacilities || [], images: [], isFeatured: isFeatured || false },
      include: { county: true },
    });

    return NextResponse.json(property, { status: 201 });
  } catch (err) {
    console.error("Property create error:", err);
    return NextResponse.json({ error: "Failed to create property" }, { status: 500 });
  }
}
