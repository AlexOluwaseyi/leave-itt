import { NextRequest, NextResponse } from "next/server"
import { getBookingsByDate, getBookingsByMonth } from "@/lib/bookings"


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id') || "";
    const role = searchParams.get('role') || "";
    const day = searchParams.get('day') || "";
    const month = searchParams.get('month') || "";

    console.log("Filtering bookings with id:", id, "and role:", role);

    console.log("Filter options: day - ", day, "and month - ", month)

    if (id && role === 'member') {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    // Validate required fields
    if (!day && !month) {
      return NextResponse.json(
        { message: "Day or Month required for filtering." },
        { status: 400 }
      );
    }

    let bookings;

    if (id && role === 'manager') {
      // Fetch bookings by month if month is provided for current manager's team
      if (month) {
        bookings = await getBookingsByMonth(month, id);
      }
    } else if (role === 'admin') {
      // Fetch bookings by date if day and month are provided
      if (month) {
        bookings = await getBookingsByMonth(month);
      } else if (day) {
        bookings = await getBookingsByDate(day);
      }
    }

    return NextResponse.json(
      { message: "Bookings fetched successfully", bookings },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}