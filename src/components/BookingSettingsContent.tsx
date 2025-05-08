import { useState } from "react";
import { Clock } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

// Booking Settings Content Component
export default function BookingSettingsContent() {
  const [bookingEnabled, setBookingEnabled] = useState(true);
  const { darkMode } = useTheme();
  const [selectedDays, setSelectedDays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ]);

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div>
      <h2
        className={`text-xl font-bold ${
          darkMode ? "text-gray-200" : "text-gray-900"
        }`}
      >
        Booking Settings
      </h2>
      <p className={`${darkMode ? "text-gray-200" : "text-gray-900"} mb-6`}>
        Configure booking windows and allowed days.
      </p>

      {/* Booking Status Section */}
      <div
        className={`border rounded-md p-6 mb-6 ${
          darkMode ? "border-gray-200 " : "border-gray-900 "
        }`}
      >
        <h3
          className={`text-lg font-medium mb-4 ${
            darkMode ? "text-gray-200" : "text-gray-900"
          }`}
        >
          Booking Status
        </h3>

        <div className="flex justify-between items-center">
          <div>
            <p
              className={`font-medium ${
                darkMode ? "text-gray-200" : "text-gray-900"
              }`}
            >
              Booking Availability
            </p>
            <p className={`text-sm text-gray-500 `}>
              (Toggle booking system on or off for all users)
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={bookingEnabled}
              onChange={() => setBookingEnabled(!bookingEnabled)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-red-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-500 after:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600 peer-checked:after:bg-gray-300"></div>
          </label>
        </div>
      </div>

      {/* Booking Window Section */}
      <div
        className={`border rounded-md p-6 mb-6 ${
          darkMode ? "border-gray-200" : "border-gray-900"
        }`}
      >
        <h3
          className={`text-lg font-medium mb-4 ${
            darkMode ? "text-gray-200" : "text-gray-900"
          }`}
        >
          Booking Window
        </h3>

        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <p
              className={`font-medium mb-2 ${
                darkMode ? "text-gray-200" : "text-gray-900"
              }`}
            >
              Booking Opens
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. May 3rd, 2025"
                // value="May 3rd, 2025 13:39"
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
                readOnly
              />
              <Clock
                size={16}
                className="absolute right-3 top-3 text-gray-400"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              When users can start booking leave
            </p>
          </div>

          <div>
            <p
              className={`font-medium mb-2 ${
                darkMode ? "text-gray-200" : "text-gray-900"
              }`}
            >
              Booking Closes
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Pick a date"
                // value=""
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
                // readOnly
              />
              <Clock
                size={16}
                className="absolute right-3 top-3 text-gray-400"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              When booking will automatically close
            </p>
          </div>
        </div>
      </div>

      {/* Allowed Days Section */}
      <div className="border border-gray-200 rounded-md p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Allowed Days</h3>

        <div>
          <p className="font-medium mb-2">Booking Days</p>
          <p className="text-sm text-gray-600 mb-4">
            Select which weekdays are allowed for booking leave
          </p>

          <div className="flex flex-wrap gap-6">
            {weekdays.map((day) => (
              <div key={day} className="flex items-center">
                <input
                  id={`day-${day}`}
                  type="checkbox"
                  checked={selectedDays.includes(day)}
                  onChange={() => toggleDay(day)}
                  className="w-4 h-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label
                  htmlFor={`day-${day}`}
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  {day}
                </label>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-600 mt-4">
            If no days are selected, booking will be allowed on all weekdays.
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-4 py-2 bg-black text-white rounded-md">
          Save Settings
        </button>
      </div>
    </div>
  );
}
