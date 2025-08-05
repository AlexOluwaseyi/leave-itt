import { NextRequest, NextResponse } from 'next/server';
import { getBookings, getBookingsByTeam, createBooking } from '@/lib/bookings';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id') || "";
    const role = searchParams.get('role') || "";

    // console.log("Fetching bookings with id:", id, "and role:", role);
    let bookings

    if (id && (role === 'manager' || role === 'member')) {
      console.log("getting bookings for team")
      bookings = await getBookingsByTeam(id);
      // } else if (role === 'member') {
      //   console.log("getting bookings for user")
      //   bookings = await getBookingsByUserId(id)
    } else {
      console.log("getting all bookings")
      bookings = await getBookings()
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

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { date, userId } = data;


    // Validate required fields
    if (!date || !userId) {
      return NextResponse.json(
        { error: "Missing required fields: date and userId are required" },
        { status: 400 }
      );
    }

    const booking = await createBooking(data);
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { message: `${error}` },
      { status: 500 }
    );
  }
}
