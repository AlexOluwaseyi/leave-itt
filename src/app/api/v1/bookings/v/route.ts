import { NextRequest, NextResponse } from 'next/server';
import { getBookingsByUserId } from '@/lib/bookings';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id') || "";

    const bookings = await getBookingsByUserId(id)

    return NextResponse.json({ bookings, "count": bookings.length }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { message: `${error}` },
      { status: 500 }
    );
  }
}
