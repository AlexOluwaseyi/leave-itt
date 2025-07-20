import { useState } from "react";

interface SpecialDay {
  date: string;
  maxBookings: number;
}

export default function SpecialDaysContent() {
  const [specialDays] = useState<SpecialDay[]>([]);

  return (
    <>
      <div className="border rounded-md p-6 mb-6 dark:border-gray-200 border-gray-900">
        <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Add Special Day</h3>
            <p className="text-sm dark:text-gray-200 text-gray-900 mb-4">
              Define days where multiple team members can book leave
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium dark:text-gray-200 text-gray-900 mb-1">
                Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  placeholder="Pick a date"
                  className="w-full border border-gray-900 dark:border-gray-200 rounded-md px-3 py-2 dark:text-gray-200 text-gray-900"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium dark:text-gray-200 text-gray-900 mb-1">
                Maximum Bookings
              </label>
              <input
                type="number"
                defaultValue="2"
                className="w-full border border-gray-900 dark:border-gray-200 rounded-md px-3 py-2"
              />
            </div>

            <button className="w-full py-2 bg-white dark:bg-gray-900 dark:text-gray-200 text-gray-900 rounded-md border-2 border-gray-900 dark:border-gray-200 hover:bg-gray-900 dark:hover:bg-gray-200 hover:text-gray-200 dark:hover:text-gray-900">
              Add Special Day
            </button>
          </div>

          {/* Special Days List */}
          <div>
            <h3 className="text-lg font-medium mb-2 dark:text-gray-200 text-gray-900">
              Special Days
            </h3>
            <p className="text-sm dark:text-gray-200 text-gray-900 mb-4">
              Days with increased booking capacity
            </p>

            <div className="border border-gray-900 dark:border-gray-200 rounded-md overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="dark:bg-gray-900 bg-white border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-xs font-medium dark:text-gray-200 text-gray-900 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium dark:text-gray-200 text-gray-900 uppercase tracking-wider">
                      Max Bookings
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-medium dark:text-gray-200 text-gray-900 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {specialDays.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-4 py-6 text-center text-sm dark:text-gray-200 text-gray-900 bg-white dark:bg-gray-900"
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
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-green-800 text-white rounded-md">
          Save Settings
        </button>
      </div>
    </>
  );
}
