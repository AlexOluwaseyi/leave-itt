import { useState } from "react";
import TabButton from "@/components/TabButton";
import TeamMembersContent from "@/components/TeamMembersContent";
import SpecialDaysContent from "@/components/SpecialDaysContent";
import BookingSettingsContent from "@/components/BookingSettingsContent";
import { useTheme } from "@/context/ThemeContext";

// Main Layout Component
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("teamMembers");
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
      }`}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        {/* Navigation Tabs */}
        <div
          className={`flex mb-8 border-2 rounded-md ${
            darkMode ? "border-gray-100" : "border-gray-900"
          }`}
        >
          <TabButton
            label="Team Members"
            isActive={activeTab === "teamMembers"}
            onClick={() => setActiveTab("teamMembers")}
          />
          <TabButton
            label="Booking Settings"
            isActive={activeTab === "bookingSettings"}
            onClick={() => setActiveTab("bookingSettings")}
          />
          <TabButton
            label="Special Days"
            isActive={activeTab === "specialDays"}
            onClick={() => setActiveTab("specialDays")}
          />
        </div>

        {/* Content Area */}
        <div
          className={`border rounded-md p-6 ${
            darkMode
              ? "text-gray-100 bg-gray-900 border-gray-200"
              : "dark:text-gray-200 border-gray-900"
          }`}
        >
          {activeTab === "teamMembers" && <TeamMembersContent />}
          {activeTab === "bookingSettings" && <BookingSettingsContent />}
          {activeTab === "specialDays" && <SpecialDaysContent />}
        </div>
      </div>
    </div>
  );
}
