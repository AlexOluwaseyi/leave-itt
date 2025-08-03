import { Home, Users, Settings, LayoutDashboard, History } from "lucide-react";

export const NavLinks = [
  { icon: Home, text: "Home", href: "/" },
  { icon: LayoutDashboard, text: "Dashboard", href: "/dashboard" },
  { icon: Users, text: "Teams", href: "/teams" },
  { icon: History, text: "History", href: "/history" },
  { icon: Settings, text: "Settings", href: "/settings" },
];

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
  inactiveMembers: number;
  totalLeaveDays: number;
  bookedLeaveDays: number;
  remainingLeaveDays: number;
}

export type Users = {
  id: string;
  name: string;
  username: string;
  role: "ADMIN" | "MANAGER" | "MEMBER";
  status: "ACTIVE" | "INACTIVE";
  password: string;
  teamId?: string;
  managerId?: string;
  team?: { alias: string; }
} & Partial<{
  createdAt: Date;
  updatedAt: Date;
}>;

export type CreateUserData = Omit<Users, 'id' | 'createdAt' | 'updatedAt' | 'team'>

export type Teams = {
  id: string;
  alias: string;
  managerId?: string;
  members?: Users[];
} & Partial<{
  createdAt: Date;
  updatedAt: Date;
}>

export type CreateTeamData = Omit<Teams, 'id' | 'managerId' | 'createdAt' | 'updatedAt' | 'members'>;

export type Bookings = {
  id: string;
  title?: string;
  date: string;
  teamId: string;
  userId: string;
} & Partial<{
  createdAt: Date;
  updatedAt: Date;
}>;