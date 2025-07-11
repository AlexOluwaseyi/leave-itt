import { useState } from "react";

// Booking Settings Content Component
export default function BookingSettingsContent() {
  const [bookingEnabled, setBookingEnabled] = useState(true);
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
      {/* Booking Status Section */}
      <div className="border rounded-md p-6 mb-6 dark:border-gray-200  border-gray-900 ">
        <h3 className="text-lg font-medium mb-4 dark:text-gray-200 text-gray-900">
          Booking Status
        </h3>

        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium dark:text-gray-200 text-gray-800">
              Booking Availability
            </p>
            <p className="text-sm text-gray-500">
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
            <button
              onClick={() => setBookingEnabled(!bookingEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                bookingEnabled ? "bg-green-800" : "bg-red-800"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  bookingEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>

          </label>
        </div>
      </div>

      {/* Booking Window Section */}
      <div className="border rounded-md p-6 mb-6 dark:border-gray-200 border-gray-900">
        <h3 className="text-lg font-medium mb-4 dark:text-gray-200 text-gray-900">
          Booking Window
        </h3>

        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <p className="font-medium mb-2 dark:text-gray-200 text-gray-900">
              Booking Opens
            </p>
            <div className="relative">
              <input
                type="date"
                className="w-full border dark:border-gray-300 border-gray-800 rounded-md px-3 py-2"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              When users can start booking leave
            </p>
          </div>

          <div>
            <p className="font-medium mb-2 dark:text-gray-200 text-gray-800">
              Booking Closes
            </p>
            <div className="relative">
              <input
                type="date"
                // placeholder="yyyy-mm-dd"
                className="w-full border dark:border-gray-300 border-gray-800 rounded-md px-3 py-2"
                // readOnly
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              When booking will automatically close
            </p>
          </div>
        </div>
      </div>

      {/* Allowed Days Section */}
      <div className="border dark:border-gray-300 border-gray-800 rounded-md p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Allowed Days</h3>

        <div>
          <p className="font-medium mb-2">Booking Days</p>
          <p className="text-sm dark:text-gray-200 text-gray-800 mb-4">
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
                  className="ml-2 text-sm font-medium dark:text-gray-200 text-gray-800"
                >
                  {day}
                </label>
              </div>
            ))}
          </div>

          <p className="text-sm dark:text-gray-200 text-gray-800 mt-4">
            If no days are selected, booking will be allowed on all weekdays.
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-4 py-2 bg-green-800 text-white rounded-md">
          Save Settings
        </button>
      </div>
    </div>
  );
}
