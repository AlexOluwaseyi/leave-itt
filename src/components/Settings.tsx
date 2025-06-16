import { useState } from "react";
import TabButton from "@/components/ui/TabButton";
import SpecialDaysContent from "@/components/SpecialDaysContent";
import BookingSettingsContent from "@/components/BookingSettingsContent";

// Main Layout Component
export default function Settings() {
  const [activeTab, setActiveTab] = useState("bookingSettings");

  return (
    <div className="mt-16 md:mt-0 min-h-[calc(100vh-138px)] md:h-screen dark:bg-gray-900 dark:text-gray-200 bg-white text-gray-800">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 dark:text-gray-200 text-gray-900">
          Settings
        </h1>

        {/* Navigation Tabs */}
        <div className="flex mb-8 border-2 rounded-md border-gray-900 dark:border-gray-100 ">
          <TabButton
            label="Booking Settings"
            isActive={activeTab === "bookingSettings"}
            onClick={() => setActiveTab("bookingSettings")}
            position="first"
          />
          <TabButton
            label="Special Days"
            isActive={activeTab === "specialDays"}
            onClick={() => setActiveTab("specialDays")}
            position="last"
          />
        </div>

        {/* Content Area */}
        <div className="py-6 bg-white text-gray-900 border-gray-900 dark:text-gray-100 dark:bg-gray-900 dark:border-gray-200">
          {activeTab === "bookingSettings" && <BookingSettingsContent />}
          {activeTab === "specialDays" && <SpecialDaysContent />}
        </div>
      </div>
    </div>
  );
}
