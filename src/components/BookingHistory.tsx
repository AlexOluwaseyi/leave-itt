import { useState } from "react";
import { LeaveBooking } from "../types";

interface BookingHistoryProps {
  bookings: LeaveBooking[];
}

export default function BookingHistory({ bookings }: BookingHistoryProps) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const filteredBookings = bookings.filter((booking) => {
    const bookingDate = booking.startDate;
    return (
      bookingDate.getMonth() === selectedMonth &&
      bookingDate.getFullYear() === selectedYear
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calculateDays = (startDate: Date, endDate: Date) => {
    const timeDiff = endDate.getTime() - startDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
  };

  return (
    <div className="mt-16 md:mt-0 min-h-[calc(100vh-138px)] md:h-screen max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 dark:text-gray-200 text-gray-900">
        Leave History
      </h1>

      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-gray-500">View leave bookings by month</p>
        <div className="flex justify-end space-x-3">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="dark:text-gray-100 text-gray-900 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {months.map((month, index) => (
              <option
                className="dark:bg-gray-900 bg-white dark:text-gray-100 text-gray-900"
                key={index}
                value={index}
              >
                {month}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="dark:text-gray-100 text-gray-900 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[2024, 2025, 2026].map((year) => (
              <option
                className="dark:bg-gray-900 bg-white dark:text-gray-100 text-gray-900"
                key={year}
                value={year}
              >
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="py-6">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No bookings found for {months[selectedMonth]} {selectedYear}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border-2 rounded-lg dark:border-gray-100 border-gray-900 divide-y divide-gray-400">
            <table className="w-full divide-y divide-gray-400">
              <thead className="dark:bg-gray-900 bg-white">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium dark:text-gray-100 text-gray-900 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium dark:text-gray-100 text-gray-900 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium dark:text-gray-100 text-gray-900 uppercase tracking-wider">
                    Days
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium dark:text-gray-100 text-gray-900 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium dark:text-gray-100 text-gray-900 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium dark:text-gray-100 text-gray-900 uppercase tracking-wider">
                    Requested
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="dark:bg-gray-900 bg-white">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium dark:text-gray-100 text-gray-900">
                      {booking.memberName}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm dark:text-gray-100 text-gray-900">
                      {booking.startDate.toLocaleDateString()} -{" "}
                      {booking.endDate.toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm dark:text-gray-100 text-gray-900">
                      {calculateDays(booking.startDate, booking.endDate)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm dark:text-gray-100 text-gray-900">
                      {booking.reason}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm dark:text-gray-100 text-gray-900">
                      {booking.createdAt.toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
