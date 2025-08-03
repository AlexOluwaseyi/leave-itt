"use client";
import Profile from "@/components/Profile";
import Menu from "@/components/menu/Menu";
// import AccessControlWrapper from "@/components/AccessControlWrapper";

export default function AdminPage() {
  return (
    <Menu>
      {/* <AccessControlWrapper requiredRoles={["ADMIN", "MANAGER", "MEMBERS"]}> */}
      <Profile />
      {/* </AccessControlWrapper> */}
    </Menu>
  );
}
