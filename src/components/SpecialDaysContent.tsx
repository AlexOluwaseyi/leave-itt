import { useState } from "react";
import { Calendar } from "lucide-react";

interface SpecialDay {
  date: string;
  maxBookings: number;
}

// Special Days Content Component
export default function SpecialDaysContent() {
  const [specialDays] = useState<SpecialDay[]>([]);

  return (
    <div>
      <h2 className="text-xl font-bold">Special Days</h2>
      <p className="text-gray-600 mb-6">
        Define days where two people can book annual leave.
      </p>

      <div className="grid grid-cols-2 gap-6">
        {/* Add Special Day Form */}
        <div>
          <h3 className="text-lg font-medium mb-2">Add Special Day</h3>
          <p className="text-sm text-gray-600 mb-4">
            Define days where multiple team members can book leave
          </p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Pick a date"
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
              />
              <Calendar
                size={16}
                className="absolute right-3 top-3 text-gray-400"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Bookings
            </label>
            <input
              type="number"
              defaultValue="2"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <button className="w-full py-2 bg-black text-white rounded-md">
            Add Special Day
          </button>
        </div>

        {/* Special Days List */}
        <div>
          <h3 className="text-lg font-medium mb-2">Special Days</h3>
          <p className="text-sm text-gray-600 mb-4">
            Days with increased booking capacity
          </p>

          <div className="border border-gray-200 rounded-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Max Bookings
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {specialDays.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-6 text-center text-sm text-gray-500"
                    >
                      No special days defined
                    </td>
                  </tr>
                ) : (
                  specialDays.map((day, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{day.date}</td>
                      <td className="px-4 py-2">{day.maxBookings}</td>
                      <td className="px-4 py-2 text-right">
                        <button className="text-sm text-gray-700">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
