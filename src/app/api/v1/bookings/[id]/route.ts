import { NextRequest, NextResponse } from "next/server"
import { deleteBooking } from "@/lib/bookings"


export async function DELETE(request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "ID is required." },
        { status: 400 }
      );
    }

    const booking = await deleteBooking(id);

    return NextResponse.json(
      { message: "Booking deleted successfully", booking },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      { message: `${error}` },
      { status: 500 }
    );
  }
}