"use client";
import Menu from "@/components/menu/Menu";
import Settings from "@/components/Settings";
import AccessControlWrapper from "@/components/AccessControlWrapper";

export default function AdminSettings() {
  return (
    <Menu>
      <AccessControlWrapper requiredRoles={["ADMIN", "MANAGER"]}>
        <Settings />
      </AccessControlWrapper>
    </Menu>
  );
}
