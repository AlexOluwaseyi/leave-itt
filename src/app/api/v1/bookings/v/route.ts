import { NextRequest, NextResponse } from 'next/server';
import { getBookings, getBookingsByTeam, getBookingsByUserId } from '@/lib/bookings';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id') || "";
    const role = searchParams.get('role') || "";

    // const bookings = await getBookingsByUserId(id)

    let bookings

    if (id && role === 'manager') {
      bookings = await getBookingsByTeam(id);
    } else if (role === "member") {
      bookings = await getBookingsByUserId(id)
    } else {
      bookings = await getBookings();
    }

    return NextResponse.json({ bookings, "count": bookings.length }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { message: `${error}` },
      { status: 500 }
    );
  }
}
