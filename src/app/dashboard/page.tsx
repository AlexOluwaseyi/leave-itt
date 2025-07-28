"use client";
import AdminDashboard from "@/components/AdminDashboard";
import Menu from "@/components/menu/Menu";
import AccessControlWrapper from "@/components/AccessControlWrapper";

export default function AdminPage() {
  return (
    <Menu>
      <AccessControlWrapper requiredRoles={["ADMIN", "MANAGER"]}>
        <AdminDashboard />
      </AccessControlWrapper>
    </Menu>
  );
}
