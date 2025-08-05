import { KeyRound } from "lucide-react";
import { PasswordResetModal } from "@/components/modals/PasswordResetModal";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";
import { Users, Bookings } from "@/types";
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";

export default function Profile() {
  const [isPasswordResetDialogOpen, setPasswordResetDialogOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<Users | null>(null);
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetchUser();
      await fetchBookings();
      setIsLoading(false);
    };
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchUser = async () => {
    try {
      if (status === "loading") return;
      const userId = session?.user?.id;
      const res = await fetch(`/api/v1/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const err = await res.json();
        toast.error(err.message || "Failed to fetch user data");
        return;
      }
      const { user } = await res.json();
      setUser(user);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to reset password.");
      }
    }
  };

  const fetchBookings = async () => {
    try {
      const query = new URLSearchParams();

      // Use session data directly for immediate fetch (fallback to URL params)
      const userId = session?.user.id;
      const userRole = session?.user.role;

      // Use session from the hook
      if (userId) query.append("id", userId);
      if (userRole) query.append("role", userRole.toLowerCase());

      const res = await fetch(`api/v1/bookings/v?${query.toString()}`, {
        method: "GET",
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.message || "Failed to fetch bookings");
        return;
      }
      const { bookings } = await res.json();
      setBookings(bookings);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to fetch bookings.");
      }
    }
  };

  if (isLoading || status === "loading") {
    return <Loading />;
  }

  return (
    <div className="mt-[65px] mb-[73px] md:my-0 h-[calc(100vh-138px)] md:h-screen max-w-7xl mx-auto px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <h1 className="text-3xl font-bold mb-6 dark:text-gray-200 text-gray-900">
          Profile
        </h1>
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-500">
            This is the profile page. You can view and edit your profile details
            here.
          </p>
          <div className="flex items-center space-x-4">
            <button
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-900 bg-white dark:text-gray-200 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:text-gray-200 hover:bg-gray-900 dark:hover:bg-gray-200 dark:hover:text-gray-900"
              onClick={() => setPasswordResetDialogOpen(true)}
            >
              <KeyRound size={20} />
              <span>Reset Password</span>
            </button>
          </div>
        </div>
      </div>

      <div className="border-2 rounded-lg dark:border-gray-100 border-gray-900 mb-8 overflow-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-800 sticky top-0">
            <tr>
              <th
                className="px-6 py-3 text-left text-s font-medium dark:text-gray-200 text-gray-900 uppercase tracking-wider"
                colSpan={2}
              >
                User Basic Information
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-gray-200 text-gray-900">
                Name
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-gray-200 text-gray-900">
                {user?.name}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-gray-200 text-gray-900">
                Username
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-200 text-gray-900">
                {user?.username}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-gray-200 text-gray-900">
                Role
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-200 text-gray-900">
                {user?.role}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-gray-200 text-gray-900">
                Status
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-200 text-gray-900">
                {user?.status}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="border-2 rounded-lg dark:border-gray-100 border-gray-900 max-h-1/2 overflow-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-800 sticky top-0">
            <tr>
              <th
                className="px-6 py-3 text-left text-s font-medium dark:text-gray-200 text-gray-900 uppercase tracking-wider"
                colSpan={3}
              >
                Booking History
              </th>
            </tr>
            {/* </thead> */}

            {/* <thead className="w-full bg-gray-200 dark:bg-gray-800 sticky top-12"> */}
            {session && session.user.role === "MEMBER" && (
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-200 text-gray-900 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-200 text-gray-900 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-200 text-gray-900 uppercase tracking-wider">
                  Created At
                </th>
              </tr>
            )}
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {session && session.user.role !== "MEMBER" ? (
              <tr>
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center dark:text-gray-200 text-gray-900"
                  colSpan={3}
                >
                  No leave history found for this user. Please go to{" "}
                  <Link
                    href="/history"
                    className="text-blue-500 hover:underline font-bold"
                  >
                    history
                  </Link>{" "}
                  to view your team&apos;s leave history.
                </td>
              </tr>
            ) : (
              bookings?.map((booking: Bookings) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-gray-200 text-gray-900">
                    {booking.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-200 text-gray-900">
                    {booking.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-200 text-gray-900">
                    {booking.createdAt
                      ? new Date(booking.createdAt).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Password reset modal */}
      {isPasswordResetDialogOpen && (
        <PasswordResetModal
          isOpen={isPasswordResetDialogOpen}
          onCloseAction={() => setPasswordResetDialogOpen(false)}
        />
      )}
      <Toaster position="top-center" />
    </div>
  );
}
