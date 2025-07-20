"use client";
import BookingHistory from "@/components/BookingHistory";
import Menu from "@/components/menu/Menu";
import { LeaveBooking } from "@/types";

export default function AdminPage() {
  // Mock leave bookings
  const leaveBookings: LeaveBooking[] = [
    {
      id: "1",
      memberId: "1",
      memberName: "John Doe",
      startDate: new Date("2025-06-10"),
      endDate: new Date("2025-06-14"),
      reason: "Vacation",
      status: "approved",
      createdAt: new Date("2025-01-15"),
    },
    {
      id: "2",
      memberId: "2",
      memberName: "Jane Smith",
      startDate: new Date("2025-06-20"),
      endDate: new Date("2025-06-22"),
      reason: "Personal",
      status: "pending",
      createdAt: new Date("2025-01-20"),
    },
  ];

  return (
    <Menu>
      <BookingHistory bookings={leaveBookings} />;
    </Menu>
  );
}
