// import { Download, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Upload, Plus } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "ADMIN",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "USER",
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "USER",
    status: "ACTIVE",
  },
  {
    id: 5,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "USER",
    status: "ACTIVE",
  },
  {
    id: 4,
    name: "Bob Wilson",
    email: "bob@example.com",
    role: "USER",
    status: "SUSPENDED",
  },
];

// Team Members Content Component
export default function TeamMembersContent() {
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isBulkImportDialogOpen, setIsBulkImportDialogOpen] = useState(false);
  const [csvContent, setCsvContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // eslint-disable-line
  const [users, setUsers] = useState(teamMembers);
  const { darkMode } = useTheme();

  const handleAddUser = async () => {};

  const handleToggleUserStatus = async (
    userId: number, // eslint-disable-line
    currentStatus: string // eslint-disable-line
  ) => {};

  const handleBulkImport = async () => {};

  const activeMembers = async () => {
    const activeUsers = users.filter(
      (user) => user.status === "ACTIVE" && user.role !== "ADMIN"
    );
    setUsers(activeUsers);
  };

  useEffect(() => {
    activeMembers();
  }, []); // eslint-disable-line

  return (
    <div className="space-y-6">
      <div
        className={`flex justify-between mb-6 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div>
          <h2 className="text-xl font-semibold">Team Members</h2>
          <p className="text-sm text-gray-500">
            Manage team access to the booking system
          </p>
        </div>
        <div className="flex space-x-3">
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
      <div
        className={`overflow-x-auto border-2 rounded-lg ${
          darkMode ? "border-gray-100" : "border-gray-900"
        }`}
      >
        <table
          className={`min-w-full divide-y ${
            darkMode ? "divide-gray-100" : "divide-gray-900"
          }`}
        >
          <thead className={`${darkMode ? "bg-gray-900" : "bg-white"}`}>
            <tr>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Name
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Email
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Role
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Status
              </th>
              <th
                className={`px-6 py-3 text-right text-xs font-medium uppercase tracking-wider ${
                  darkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody
            className={`divide-y ${
              darkMode ? "divide-gray-100" : "divide-gray-900"
            }`}
          >
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className={`px-6 py-4 text-center text-sm ${
                    darkMode ? "text-red bg-gray-900" : "text-gray-900 bg-white"
                  }`}
                >
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      darkMode
                        ? "text-gray-100 bg-gray-900"
                        : "text-black bg-white"
                    }`}
                  >
                    {user.name}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      darkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    {user.email}
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

      {/* Add User Modal */}
      {isAddUserDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium">Add New User</h3>
              <p className="text-sm text-gray-500">
                Create a new user account for team member access.
              </p>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="john.doe@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isAdmin"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Admin Access
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsAddUserDialogOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isSubmitting ? "Adding..." : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Import Modal */}
      {isBulkImportDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium">Import Users</h3>
              <p className="text-sm text-gray-500">
                Upload a CSV file with user data. Format:
                name,email,password,role
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  CSV Content
                </label>
                <textarea
                  rows={10}
                  value={csvContent}
                  onChange={(e) => setCsvContent(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="John Doe,john@example.com,password123,USER"
                />
              </div>

              <div className="text-sm text-gray-500">
                <h4 className="font-medium">Example:</h4>
                <pre className="mt-1 p-2 bg-gray-100 rounded text-xs">
                  John Doe,john@example.com,password123,USER
                  <br />
                  Jane Smith,jane@example.com,securepass,ADMIN
                </pre>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsBulkImportDialogOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkImport}
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isSubmitting ? "Importing..." : "Import Users"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
