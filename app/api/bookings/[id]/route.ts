import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const validStatuses = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ booking });
  } catch (error) {
    console.error("Booking update error:", error);
    return NextResponse.json({ error: "Failed to update booking." }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.booking.delete({ where: { id } });
    return NextResponse.json({ message: "Booking deleted successfully." });
  } catch (error) {
    console.error("Booking delete error:", error);
    return NextResponse.json({ error: "Failed to delete booking." }, { status: 500 });
  }
}
