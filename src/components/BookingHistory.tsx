import { useState, useEffect } from "react";
import { Bookings, Teams } from "@/types";
import { parseDate } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";
import { toast, Toaster } from "react-hot-toast";

export default function BookingHistory() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [bookings, setBookings] = useState<Bookings[]>([]);
  const [teams, setTeams] = useState<Teams[]>([]);
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

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

  const filteredBookings = bookings.filter((booking: Bookings) => {
    console.log(booking);
    const bookingDate = parseDate(booking.date);
    return (
      bookingDate.getMonth() === selectedMonth &&
      bookingDate.getFullYear() === selectedYear
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const query = new URLSearchParams();

        // Use session data directly for immediate fetch (fallback to URL params)
        const userId = session?.user.id;
        const userRole = session?.user.role;

        // Use session from the hook
        if (userId) query.append("id", userId);
        if (userRole) query.append("role", userRole.toLowerCase());

        const res = await fetch(`api/v1/bookings/v?${query.toString()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          const err = await res.json();
          toast.error(err.message || "Failed to fetch bookings");
          return;
        }
        const { bookings } = await res.json();

        const resTeams = await fetch("/api/v1/teams", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!resTeams.ok) {
          const err = await resTeams.json();
          toast.error(err.message || "Failed to fetch teams");
          return;
        }
        const { teams } = await resTeams.json();

        setBookings(bookings);
        setTeams(teams);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Failed to fetch bookings & teams.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // eslint-disable-line

  if (status === "loading" || isLoading) {
    return <Loading />;
  }

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
                    Team
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium dark:text-gray-100 text-gray-900 uppercase tracking-wider">
                    Leave date
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-medium dark:text-gray-100 text-gray-900 uppercase tracking-wider">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking: Bookings) => (
                  <tr key={booking.id} className="dark:bg-gray-900 bg-white">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium dark:text-gray-100 text-gray-900">
                      {booking.title}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm dark:text-gray-100 text-gray-900">
                      Team{" "}
                      {teams.find((team) => team.id === booking.teamId)
                        ?.alias || "N/A"}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm dark:text-gray-100 text-gray-900">
                      {booking.date}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm dark:text-gray-100 text-gray-900">
                      {booking?.createdAt
                        ? new Date(booking.createdAt).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
