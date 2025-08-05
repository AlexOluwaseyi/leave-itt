"use client";
import { useState, useEffect } from "react";
import { LeaveBookingPeriod, DashboardStats } from "@/types";
import StatsCards from "@/components/StatsCards";
import LeaveBookingPeriods from "@/components/LeaveBookingPeriods";
import Link from "next/link";
import { Settings } from "lucide-react";
import TabButton from "@/components/ui/TabButton";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";
import { toast, Toaster } from "react-hot-toast";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);
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

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (
          !session ||
          (session.user.role !== "ADMIN" && session.user.role !== "MANAGER")
        ) {
          return;
        }
        const res = await fetch("/api/v1/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const err = await res.json();
          toast.error(err.message || "Failed to fetch dashboard stats");
          return;
        }

        const { stats } = await res.json();
        setStats(stats);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Failed to fetch dashboard stats.");
        }
      }
    };
    fetchStats();
  }, []); // eslint-disable-line

  if (status === "loading") {
    return <Loading />;
  }

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
        {activeTab === "overview" && stats && <StatsCards stats={stats} />}
        {activeTab === "periods" && (
          <LeaveBookingPeriods
            periods={bookingPeriods}
            setPeriods={setBookingPeriods}
          />
        )}
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
