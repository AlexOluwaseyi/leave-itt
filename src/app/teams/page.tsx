"use client";
import Menu from "@/components/menu/Menu";
import TeamMembersContent from "@/components/TeamMembersContent";
import AccessControlWrapper from "@/components/AccessControlWrapper";

export default function TeamMembers() {
  return (
    <Menu>
      <AccessControlWrapper requiredRoles={["ADMIN", "MANAGER"]}>
        <TeamMembersContent />
      </AccessControlWrapper>
    </Menu>
  );
}
