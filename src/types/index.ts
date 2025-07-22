export interface LeaveBooking {
  id: string;
  memberId: string;
  memberName: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: 'approved' | 'pending' | 'rejected';
  createdAt: Date;
}

export interface LeaveBookingPeriod {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  maxDaysPerMember: number;
}

export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  suspendedMembers: number;
  totalLeaveDays: number;
  bookedLeaveDays: number;
  remainingLeaveDays: number;
}

// export type UserData = {
//   id: string;
//   username: string;
//   name: string;
//   password: string;
//   status: "ACTIVE" | "INACTIVE";
//   createdAt?: Date;
//   updatedAt?: Date;
// } & {
//   role: "MEMBER";
//   teamId: string;
//   managerId: string;
// } | {
//   role: "MANAGER";
//   teamId: string;
// } | {
//   role: "ADMIN";
// }

export type TeamMember = {
  id: string;
  name: string;
  username: string;
  role: "ADMIN" | "MANAGER" | "MEMBER";
  status: "ACTIVE" | "INACTIVE";
  password: string;
  teamId?: string;
  managerId?: string;
} & Partial<{
  createdAt: Date;
  updatedAt: Date;
}>;

export interface AddTeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser?: (userData: TeamMember) => void;
}
