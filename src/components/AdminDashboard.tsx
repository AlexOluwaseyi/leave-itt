"use client";
import { useState } from "react";
import { LeaveBookingPeriod, DashboardStats } from "@/types";
import StatsCards from "@/components/StatsCards";
import LeaveBookingPeriods from "@/components/LeaveBookingPeriods";
import Link from "next/link";
import { Settings } from "lucide-react";
import TabButton from "@/components/ui/TabButton";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  //   const [globalLeaveBookingEnabled, setGlobalLeaveBookingEnabled] =
  //     useState(true);

  // Mock data - in real app, this would come from API
  // eslint-disable-next-line
  const [teamMembers, setTeamMembers] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john@company.com",
      status: "active",
      joinDate: new Date("2023-01-15"),
      department: "Engineering",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@company.com",
      status: "active",
      joinDate: new Date("2023-03-20"),
      department: "Design",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@company.com",
      status: "suspended",
      joinDate: new Date("2022-11-10"),
      department: "Marketing",
    },
  ]);

  const [bookingPeriods, setBookingPeriods] = useState<LeaveBookingPeriod[]>([
    {
      id: "1",
      name: "Q1 2025 Leave Period",
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-03-31"),
      isActive: true,
      maxDaysPerMember: 10,
    },
  ]);

  const stats: DashboardStats = {
    totalMembers: teamMembers.length,
    activeMembers: teamMembers.filter((m) => m.status === "active").length,
    suspendedMembers: teamMembers.filter((m) => m.status === "suspended")
      .length,
    totalLeaveDays: 60, // Mock calculation
    bookedLeaveDays: 15, // Mock calculation
    remainingLeaveDays: 45, // Mock calculation
  };

  return (
    <div className="mt-[65px] mb-[73px] md:my-0 min-h-[calc(100vh-138px)] md:h-screen dark:bg-gray-900 dark:text-gray-200 bg-white text-gray-800">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 dark:text-gray-200 text-gray-900">
          Admin Dashboard
        </h1>
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-500">
            Overview of team members and leave bookings
          </p>
          <div className="flex items-center space-x-4">
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-900 bg-white dark:text-gray-200 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:text-gray-200 hover:bg-gray-900 dark:hover:bg-gray-200 dark:hover:text-gray-900">
              <Settings className="h-4 w-4" />
              <Link href="/settings">Settings</Link>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex mb-8 border-2 rounded-md border-gray-900 dark:border-gray-100 ">
          <TabButton
            label="Overview"
            isActive={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
            position="first"
          />
          <TabButton
            label="Leave Periods"
            isActive={activeTab === "periods"}
            onClick={() => setActiveTab("periods")}
            position="last"
          />
        </div>

        {/* Main Content */}
        {activeTab === "overview" && <StatsCards stats={stats} />}
        {activeTab === "periods" && (
          <LeaveBookingPeriods
            periods={bookingPeriods}
            setPeriods={setBookingPeriods}
          />
        )}
      </div>
    </div>
  );
}
