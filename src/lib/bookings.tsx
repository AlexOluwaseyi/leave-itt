import prisma from "@/lib/prisma";
import { Bookings } from "@/types";
import { getUserById } from "./users";

export async function getBookings() {
  try {
    const bookings = await prisma.booking.findMany({
      select: {
        id: true,
        userId: true,
        teamId: true,
        date: true,
        title: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        date: "desc",
      },
    });
    return bookings;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Could not fetch bookings"
    );
  }
}

export async function getBookingsByUserId(userId: string) {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId },
      select: {
        id: true,
        userId: true,
        teamId: true,
        date: true,
        title: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        date: "desc",
      },
      take: 12,
    });
    return bookings;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Could not fetch user bookings"
    );
  }
}

export async function getBookingsByTeamId(teamId: string) {
  try {
    const bookings = await prisma.booking.findMany({
      where: { teamId },
      select: {
        id: true,
        userId: true,
        teamId: true,
        date: true,
        title: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        date: "desc",
      },
    });
    return bookings;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Could not fetch team bookings"
    );
  }
}

export async function getBookingsByTeam(id: string) {
  try {
    // Get teamId by member id
    if (!id) {
      throw new Error("Member ID is required");
    }

    const team = await prisma.team.findFirst({
      where: { members: { some: { id } } },
      select: {
        id: true,
      },
    });
    if (!team) {
      throw new Error("Team not found for the given manager ID");
    }

    // Fetch bookings by teamId
    const bookings = await prisma.booking.findMany({
      where: { teamId: team.id },
      select: {
        id: true,
        userId: true,
        teamId: true,
        date: true,
        title: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    return bookings;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Could not fetch bookings by team"
    );
  }
}

export async function getBookingsByDate(date: string) {
  try {
    const bookings = await prisma.booking.findMany({
      where: { date },
      select: {
        id: true,
        userId: true,
        teamId: true,
        date: true,
        title: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        date: "desc",
      },
    });
    return bookings;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Could not fetch bookings by date"
    );
  }
}

export async function getBookingsByMonth(month: string, managerId?: string) {
  try {
    // Get teamId by managerId
    let teamId;
    if (managerId) {
      const team = await prisma.team.findFirst({
        where: { managerId: managerId },
        select: {
          id: true,
        },
      });
      if (!team) {
        throw new Error("Team not found for the given manager ID");
      }
      teamId = team.id;
    }

    const bookings = await prisma.booking.findMany({
      where: {
        date: {
          endsWith: month, // Assuming month is in 'MM-YYYY' format
        },
        teamId,
      },
      select: {
        id: true,
        userId: true,
        teamId: true,
        date: true,
        title: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        date: "desc",
      },
    });
    return bookings;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Could not fetch bookings by month"
    );
  }
}

export async function createBooking(bookingData: Bookings) {
  try {
    // Validate required fields
    if (!bookingData.date || !bookingData.userId) {
      throw new Error("Missing required fields: date and userId are required");
    }

    // Check if user exists
    const user = await getUserById(bookingData.userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if user role is MEMBER
    if (user.role !== "MEMBER") {
      throw new Error("Only members can create bookings");
    }

    // Set teamId from user
    bookingData.teamId = user.teamId as string;
    bookingData.title = user.name;

    console.log("Creating booking with data:", bookingData);
    // Create booking in the database
    const booking = await prisma.booking.create({
      data: {
        ...bookingData,
      },
    });
    return booking;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Could not create booking"
    );
  }
}

export async function deleteBooking(bookingId: string) {
  try {
    const booking = await prisma.booking.delete({
      where: { id: bookingId },
    });
    return booking;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Could not delete booking"
    );
  }
}
