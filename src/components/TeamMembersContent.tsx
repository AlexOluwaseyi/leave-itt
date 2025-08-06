import { useEffect, useState } from "react";
import { Upload, Plus } from "lucide-react";
import {
  AddUserModal,
  BulkImportUsersModal,
} from "@/components/modals/UserModal";
import { CreateTeamModal } from "@/components/modals/TeamModal";
import { Teams, Users } from "@/types";
import { useSessionUrlManager } from "@/hooks/useSessionUrlManager";
import Loading from "./Loading";
import { toast, Toaster } from "react-hot-toast";

export default function TeamMembersContent() {
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isCreateTeamDialogOpen, setIsCreateTeamDialogOpen] = useState(false);
  const [isBulkImportDialogOpen, setIsBulkImportDialogOpen] = useState(false);
  const [users, setUsers] = useState<Users[]>([]);
  const [teams, setTeams] = useState<Teams[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [sortByName, setSortByName] = useState(false);

  // Use the reusable hook (URL rewriting is handled by AccessControlWrapper)
  const { session, urlUpdated } = useSessionUrlManager({
    skipUrlRewrite: true, // Already handled by wrapper
  });

  // Fetch data when URL is ready
  useEffect(() => {
    if (!urlUpdated || !session?.user) return;

    fetchData();
  }, [urlUpdated]); // eslint-disable-line

  // Fetch users and teams
  const fetchData = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams();

      // Use session data directly for immediate fetch (fallback to URL params)
      const userId = session.user.id;
      const userRole = session.user.role;

      // Use session from the hook
      if (userId) query.append("id", userId);
      if (userRole) query.append("role", userRole.toLowerCase());

      const res = await fetch(`/api/v1/users?${query.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.message || "Failed to fetch users");
        return;
      }

      const { users } = await res.json();

      // fetch teams from API
      const resTeams = await fetch(`/api/v1/teams?${query.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!resTeams.ok) {
        const err = await resTeams.json();
        toast.error(err.message || "Failed to fetch teams.");
        return;
      }

      const { teams } = await resTeams.json();

      setUsers(users);
      setTeams(teams);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to fetch data.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...users];

    // Filter by team
    if (selectedTeam !== "all") {
      const team = teams.find((t) => t.id === selectedTeam);
      filtered = filtered.filter((user) => user.team?.alias === team?.alias);
    }

    // Filter by active status
    if (showActiveOnly) {
      filtered = filtered.filter((user) => user.status === "ACTIVE");
    }

    // Sort by name
    if (sortByName) {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredUsers(filtered);
  }, [users, teams, selectedTeam, showActiveOnly, sortByName]);

  const deactivateUser = async (userId: string, currentStatus: string) => {
    try {
      const res = await fetch(`api/v1/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE",
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.message);
        return;
      }
      const { updatedUser } = await res.json();

      // Update local state
      const updatedUsers = users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            status: (currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE") as
              | "ACTIVE"
              | "INACTIVE",
          };
        }
        return user;
      });
      setUsers(updatedUsers);
      toast.success(
        `User status updated: ${
          updatedUser.user.name
        } is now ${updatedUser.user.status.toLowerCase()}`
      );
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to update user.");
      }
    }
  };

  const handleTeamFilterChange = (teamValue: string) => {
    setSelectedTeam(teamValue);
  };

  const toggleActiveFilter = () => {
    setShowActiveOnly(!showActiveOnly);
  };

  const toggleNameSort = () => {
    setSortByName(!sortByName);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-[65px] mb-[73px] md:my-0 h-[calc(100vh-138px)] md:h-screen max-w-7xl mx-auto px-4 bg-white dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 dark:text-gray-200 text-gray-900">
        Team Management
      </h1>

      <div className="flex justify-between min-w-full flex-col mb-6">
        <div className="justify-self-end">
          <p className="text-sm text-gray-500">
            Manage team access to the booking system
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Showing {filteredUsers.length} of {users.length} members
            {session.role === "MANAGER" && " (from your team)"}
          </p>
        </div>

        <div className="flex flex-row justify-items-stretch justify-between md:justify-end md:gap-x-3 md:flex-row pt-4">
          <button
            onClick={() => setIsBulkImportDialogOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Upload className="h-4 w-4" />
            <span>Bulk Import</span>
          </button>

          <button
            onClick={() => setIsAddUserDialogOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4" />
            <span>Add User</span>
          </button>
          {session?.user.role === "ADMIN" && (
            <button
              onClick={() => setIsCreateTeamDialogOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4" />
              <span>Create Team</span>
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
        <div className="flex flex-col space-y-4">
          {/* Status and Sort Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {session.user.role === "ADMIN" && (
              <div className="flex items-center space-x-3">
                <select
                  id="team-filter"
                  value={selectedTeam}
                  onChange={(e) => handleTeamFilterChange(e.target.value)}
                  className="dark:bg-gray-700 bg-white dark:text-gray-100 text-gray-900 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all" className="dark:bg-gray-700 bg-white">
                    All Teams ({users.length})
                  </option>
                  {teams.map((team) => {
                    const teamMemberCount = users.filter(
                      (user) => user.team?.alias === team.alias
                    ).length;
                    return (
                      <option
                        key={team.id}
                        value={team.id}
                        className="dark:bg-gray-700 bg-white"
                      >
                        {team.alias} ({teamMemberCount})
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            <button
              onClick={toggleActiveFilter}
              className={`px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                showActiveOnly
                  ? "bg-green-100 text-green-800 border border-green-300"
                  : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-500"
              }`}
            >
              {showActiveOnly ? "✓ Active Only" : "Show Active Only"}
            </button>

            <button
              onClick={toggleNameSort}
              className={`px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                sortByName
                  ? "bg-blue-100 text-blue-800 border border-blue-300"
                  : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-500"
              }`}
            >
              {sortByName ? "✓ Sorted A-Z" : "Sort by Name"}
            </button>

            {(selectedTeam !== "all" || showActiveOnly || sortByName) && (
              <button
                onClick={() => {
                  setShowActiveOnly(false);
                  setSortByName(false);
                  setSelectedTeam("all");
                }}
                className="px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md transition-colors border border-red-200 dark:border-red-800"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto border-2 rounded-lg dark:border-gray-100 border-gray-900">
        <table className="min-w-full divide-y divide-gray-400">
          <thead className="dark:bg-gray-900 bg-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider dark:text-gray-100 text-gray-900">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider dark:text-gray-100 text-gray-900">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider dark:text-gray-100 text-gray-900">
                Team
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider dark:text-gray-100 text-gray-900">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider dark:text-gray-100 text-gray-900">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider dark:text-gray-100 text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-400">
            {filteredUsers.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-4 text-center text-sm dark:text-gray-200 dark:bg-gray-900 text-gray-900 bg-white"
                >
                  No users found
                  {session.role === "MANAGER" && " in your team"}
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-gray-100 dark:bg-gray-900 text-black bg-white">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-gray-100 text-gray-900 dark:bg-gray-900 bg-white">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-gray-100 text-gray-900 dark:bg-gray-900 bg-white">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {user.team?.alias || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm dark:bg-gray-900 bg-white">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === "ADMIN"
                          ? "bg-purple-100 text-purple-800"
                          : user.role === "MANAGER"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm dark:bg-gray-900 bg-white">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm dark:bg-gray-900 bg-white">
                    <button
                      onClick={() => deactivateUser(user.id, user.status)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {user.status === "ACTIVE" ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <AddUserModal
        isOpen={isAddUserDialogOpen}
        onCloseAction={() => setIsAddUserDialogOpen(false)}
        onSuccessAction={fetchData}
      />

      <BulkImportUsersModal
        isOpen={isBulkImportDialogOpen}
        onCloseAction={() => setIsBulkImportDialogOpen(false)}
        onSuccessAction={fetchData}
      />

      <CreateTeamModal
        isOpen={isCreateTeamDialogOpen}
        onCloseAction={() => setIsCreateTeamDialogOpen(false)}
        onSuccessAction={fetchData}
      />
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
    </div>
  );
}
