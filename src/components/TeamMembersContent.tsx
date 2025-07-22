import { useEffect, useState } from "react";
import { Upload, Plus } from "lucide-react";
import {
  AddTeamMemberModal,
  BulkImportUsersModal,
} from "./modals/AddTeamMemberModal";
import { TeamMember } from "@/types";
import { teamMembers } from "@/mock";

export default function TeamMembersContent() {
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isBulkImportDialogOpen, setIsBulkImportDialogOpen] = useState(false);
  const [users, setUsers] = useState(teamMembers);

  const handleAddUser = (userData: TeamMember) => {
    console.log("Current length of users:", users.length);
    const newUser = {
      id: "" + Date.now() + Math.random(), // Unique ID based on timestamp and random number
      name: userData.name,
      username: userData.username,
      role: userData.role,
      status: userData.status,
      password: userData.password,
      teamId: userData.teamId || "",
      managerId: userData.managerId || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);
    console.log("New user added:", newUser);
  };

  const handleBulkImport = (csvData: string) => {
    // Process CSV data here
    console.log("CSV data for import:", csvData);
    csvData.split("\n").forEach((line) => {
      const [name, username, password, role, status, teamId] = line.split(",");
      if (name && username && password && role && status && teamId) {
        handleAddUser({
          id: "" + Date.now() + Math.random(),
          status: status.trim().toUpperCase() as "ACTIVE" | "INACTIVE",
          name: name.trim(),
          username: username.trim(),
          password: password.trim(),
          role: role.trim().toUpperCase() as "ADMIN" | "MANAGER" | "MEMBER",
          teamId: teamId.trim(),
        });
      }
    });

    // You would parse the CSV and add multiple users
  };

  const handleToggleUserStatus = async (
    userId: string,
    currentStatus: string
  ) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          status: currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE",
        };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  // Show only active members.
  const activeMembers = async () => {
    const activeUsers = users.filter((user) => user.status === "ACTIVE");
    setUsers(activeUsers);
  };

  const sortedMembers = () => {
    const sortedUsers = [...users].sort((a, b) =>
      a.status.localeCompare(b.status)
    );
    setUsers(sortedUsers);
  };

  useEffect(() => {
    activeMembers();
    sortedMembers();
  }, []); // eslint-disable-line

  return (
    <div className="mt-[65px] mb-[73px] md:my-0 min-h-[calc(100vh-138px)] md:min-h-screen space-y-6 max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 dark:text-gray-200 text-gray-900">
        Team Members Management
      </h1>
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-gray-500">
            Manage team access to the booking system
          </p>
        </div>
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
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
                Email
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
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 text-center text-sm dark:text-gray-200 dark:bg-gray-900 text-gray-900 bg-white"
                >
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-gray-100 dark:bg-gray-900 text-black bg-white">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-gray-100 text-gray-900">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === "ADMIN"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
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
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button
                      onClick={() =>
                        handleToggleUserStatus(user.id, user.status)
                      }
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {user.status === "ACTIVE" ? "Suspend" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <AddTeamMemberModal
        isOpen={isAddUserDialogOpen}
        onClose={() => setIsAddUserDialogOpen(false)}
        onAddUser={handleAddUser}
      />

      <BulkImportUsersModal
        isOpen={isBulkImportDialogOpen}
        onClose={() => setIsBulkImportDialogOpen(false)}
        onImport={handleBulkImport}
      />
    </div>
  );
}
