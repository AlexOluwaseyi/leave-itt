"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Teams, Users } from "@/types";
import { toast, Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { GlassCard } from "@/components/ui/GlassCard";

export function AddUserModal({
  isOpen,
  onCloseAction,
  onSuccessAction,
}: {
  isOpen: boolean;
  onCloseAction: () => void;
  onSuccessAction: () => void;
}) {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teams, setTeams] = useState([]);
  const [formData, setFormData] = useState<Users>({
    id: "",
    name: "",
    username: "",
    password: "",
    role: "MEMBER",
    status: "ACTIVE",
    teamId: "",
  });

  useEffect(() => {
    const getTeams = async () => {
      try {
        const res = await fetch("/api/v1/teams", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const err = await res.json();
          toast.error(err.message || "Failed to fetch teams");
          return;
        }

        const { teams } = await res.json();
        setTeams(teams);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Failed to fetch teams.");
        }
      }
    };

    getTeams();
  }, []);

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      if (!formData.name || !formData.username || !formData.password) {
        alert("Please fill in all required fields");
        return;
      }

      console.log(formData);

      const res = await fetch("/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.message || "Failed to add user");
        return;
      }

      const { user } = await res.json();
      toast.success(`User added: ${user.name}`);

      // Reset form and close modal
      setFormData({
        id: "",
        name: "",
        username: "",
        password: "",
        role: "MEMBER",
        status: "ACTIVE",
        teamId: "",
        managerId: "",
      });
      onSuccessAction();
      onCloseAction();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to add user.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 min-h-full bg-opacity-50 flex items-center justify-center p-4"
      onClick={onCloseAction}
    >
      <GlassCard className="max-w-2xl w-4/5">
        <div
          // className="bg-white dark:bg-gray-900 border border-gray-500 rounded-lg max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3
                id="modal-title"
                className="text-lg font-medium text-gray-900 dark:text-gray-100"
              >
                Add New User
              </h3>
              <p
                id="modal-description"
                className="text-sm text-gray-500 dark:text-gray-400"
              >
                Create a new user account for team member access.
              </p>
            </div>
            <button
              onClick={onCloseAction}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center">
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-500 rounded-md px-3 py-2 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
              focus:ring-blue-500 focus:border-blue-500"
              >
                {session?.user.role === "ADMIN" && (
                  <>
                    <option value="MEMBER">Member</option>
                    <option value="MANAGER">Manager</option>
                    <option value="ADMIN">Admin</option>
                  </>
                )}
                {session?.user.role === "MANAGER" && (
                  <>
                    <option value="MEMBER">Member</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={formData.role !== "ADMIN" && teams.length === 0}
                className="mt-1 block w-full border border-gray-500 rounded-md px-3 py-2 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
              focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Username *
              </label>
              <input
                type="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                disabled={formData.role !== "ADMIN" && teams.length === 0}
                className="mt-1 block w-full border border-gray-500 rounded-md px-3 py-2 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
              focus:ring-blue-500 focus:border-blue-500"
                placeholder="john.doe@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={formData.role !== "ADMIN" && teams.length === 0}
                minLength={8}
                className="mt-1 block w-full border border-gray-500 rounded-md px-3 py-2 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
              focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>

            {formData.role !== "ADMIN" && (
              <div className="flex flex-col items-center">
                <select
                  name="teamId"
                  value={formData.teamId}
                  onChange={handleInputChange}
                  disabled={teams.length === 0}
                  className="mt-1 block w-full border border-gray-500 rounded-md px-3 py-2 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
              focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Team</option>
                  {teams &&
                    teams.length > 0 &&
                    teams.map((team: Teams) => (
                      <option key={team.id} value={team.id}>
                        {team.alias}
                      </option>
                    ))}
                </select>
                {/* Display message if no teams are available */}
                {teams && teams.length === 0 && (
                  <p className="text-sm text-red-500 mt-2">
                    No teams available. Please create a team first.
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onCloseAction}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium 
              text-white bg-red-800 hover:bg-red-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 border border-transparent rounded-md text-sm font-medium 
              text-white bg-blue-600 hover:bg-blue-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
              disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Adding..." : "Add User"}
              </button>
            </div>
          </form>
        </div>
      </GlassCard>
      <Toaster position="top-center" />
    </div>
  );
}

export function BulkImportUsersModal({
  isOpen,
  onCloseAction,
  onSuccessAction,
}: {
  isOpen: boolean;
  onCloseAction: () => void;
  onSuccessAction: () => void;
}) {
  const { data: session } = useSession();
  const [teams, setTeams] = useState<Teams[]>([]);
  const [csvContent, setCsvContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [role, setRole] = useState("MEMBER");
  const [teamId, setTeamId] = useState("");

  useEffect(() => {
    const getTeams = async () => {
      try {
        const res = await fetch("/api/v1/teams", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const err = await res.json();
          toast.error(err.message || "Failed to fetch teams");
          return;
        }

        const { teams } = await res.json();
        setTeams(teams);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Failed to fetch teams.");
        }
      }
    };

    getTeams();
  }, []);

  if (!isOpen) return null;

  const handleBulkImport = async () => {
    setIsSubmitting(true);
    try {
      // Parse CSV content and import users
      // CSV parsing implemented in importBulkUsers

      const res = await fetch("/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "text/csv",
          "X-Role": role,
          "X-Team-Id": teamId,
        },
        body: csvContent,
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.message || "Failed to import users");
      }

      const { bulkUsers } = await res.json();
      toast.success(`Users imported: ${bulkUsers.length} users`, {
        duration: 5000,
      });

      setCsvContent("");
      onSuccessAction();
      onCloseAction();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to import users.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4"
      onClick={onCloseAction}
    >
      <GlassCard className="max-w-2xl w-4/5">
        <div onClick={(e) => e.stopPropagation()}>
          <div className="mb-4">
            <h3 className="text-lg font-medium dark:text-gray-200 text-gray-900">
              Import Users
            </h3>
            <p className="text-sm text-gray-500">
              Upload a CSV file with user data. <br /> Format:
              name,username,password
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <select
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full border border-gray-500 rounded-md px-3 py-2 
          bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
          focus:ring-blue-500 focus:border-blue-500"
              >
                {session?.user.role === "ADMIN" && (
                  <>
                    <option value="MEMBER">Member</option>
                    <option value="ADMIN">Admin</option>
                  </>
                )}
                {session?.user.role === "MANAGER" && (
                  <>
                    <option value="MEMBER">Member</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-200">
                CSV Content
              </label>
              <textarea
                rows={10}
                value={csvContent}
                onChange={(e) => setCsvContent(e.target.value)}
                className="mt-1 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm placeholder-gray-500 text-gray-900 dark:text-gray-200 "
                placeholder="John Doe,johndoe,password123"
              />
            </div>

            <div className="text-sm border border-gray-500 rounded-md">
              <h4 className="font-medium text-gray-900 dark:text-gray-200 pt-1 px-1">
                Example:
              </h4>
              <pre className="mt-1 p-2 bg-white dark:bg-gray-900 text-gray-500 rounded text-xs">
                John Doe,johndoe01,password123
                <br />
                Jane Smith,janesmith02,securepass
              </pre>
            </div>

            {role === "MEMBER" && (
              <div className="flex flex-col items-center">
                <select
                  name="teamId"
                  value={teamId}
                  onChange={(e) => setTeamId(e.target.value)}
                  disabled={teams.length === 0}
                  required
                  className="mt-1 block w-full border border-gray-500 rounded-md px-3 py-2 
          bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
          focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Team</option>
                  {teams &&
                    teams.length > 0 &&
                    teams.map((team: Teams) => (
                      <option key={team.id} value={team.id}>
                        {team.alias}
                      </option>
                    ))}
                </select>
                {/* Display message if no teams are available */}
                {teams && teams.length === 0 && (
                  <p className="text-sm text-red-500 mt-2">
                    No teams available. Please create a team first.
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onCloseAction}
                className="px-4 py-2 rounded-md text-sm font-medium text-white
          bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
      </GlassCard>
    </div>
  );
}
