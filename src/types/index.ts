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

export interface UserData {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface AddTeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser?: (userData: UserData) => void;
}
