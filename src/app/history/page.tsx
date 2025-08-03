"use client";
import BookingHistory from "@/components/BookingHistory";
import Menu from "@/components/menu/Menu";
import AccessControlWrapper from "@/components/AccessControlWrapper";

export default function AdminPage() {
  return (
    <Menu>
      <AccessControlWrapper requiredRoles={["ADMIN", "MANAGER", "MEMBER"]}>
        <BookingHistory />
      </AccessControlWrapper>
    </Menu>
  );
}
