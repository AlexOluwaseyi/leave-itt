"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { Users } from "@/types";
import { toast, Toaster } from "react-hot-toast";

export function AddUserModal({
  isOpen,
  onCloseAction,
}: {
  isOpen: boolean;
  onCloseAction: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Users>({
    id: "",
    name: "",
    username: "",
    password: "",
    role: "MEMBER",
    status: "ACTIVE",
  });

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

      const res = await fetch("/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to add user");
      }

      const newUser = await res.json();
      toast.success(`User added: ${newUser.name}`);

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
      onCloseAction();
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to add user.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 min-h-full dark:bg-black bg-white bg-opacity-50 flex items-center justify-center p-4"
      onClick={onCloseAction}
    >
      <div
        className="bg-white dark:bg-gray-900 border border-gray-500 rounded-lg max-w-md w-full p-6"
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
              minLength={6}
              className="mt-1 block w-full border border-gray-500 rounded-md px-3 py-2 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
              focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center">
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-500 rounded-md px-3 py-2 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
              focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="MEMBER">Member</option>
              <option value="MANAGER">Manager</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

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
      <Toaster position="top-center" />
    </div>
  );
}

export function BulkImportUsersModal({
  isOpen,
  onCloseAction,
}: {
  isOpen: boolean;
  onCloseAction: () => void;
}) {
  const [csvContent, setCsvContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleBulkImport = async () => {
    setIsSubmitting(true);
    try {
      // Parse CSV content and import users
      const users = csvContent
        .trim()
        .split("\n")
        .map((line) => {
          const [name, email, password, role] = line
            .split(",")
            .map((item) => item.trim());
          return { name, username: email, password, role: role || "MEMBER" };
        })
        .filter((user) => user.name && user.username && user.password);

      if (users.length === 0) {
        alert("Please provide valid CSV content");
        return;
      }

      const res = await fetch("/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "text/csv" },
        body: JSON.stringify({
          users: users.map((user) => ({
            ...user,
            role: "MEMBER",
            status: "ACTIVE",
            teamId: "",
            managerId: "",
          })),
        }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to import users");
      }

      const result = await res.json();
      toast.success(`Users imported: ${result.length} users`);
      setCsvContent("");
      onCloseAction();
    } catch (error) {
      console.error("Error importing users:", error);
      toast.error("Failed to import users.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 dark:bg-black bg-white bg-opacity-50 flex items-center justify-center p-4"
      //   onClick={onCloseAction}
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg border-2 border-gray-500 max-w-md w-full p-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium dark:text-gray-200 text-gray-900">
            Import Users
          </h3>
          <p className="text-sm text-gray-500">
            Upload a CSV file with user data. <br /> Format:
            name,email,password,role
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-200">
              CSV Content
            </label>
            <textarea
              rows={10}
              value={csvContent}
              onChange={(e) => setCsvContent(e.target.value)}
              className="mt-1 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm placeholder-gray-500 text-gray-900 dark:text-gray-200 "
              placeholder="John Doe,john@example.com,password123,USER"
            />
          </div>

          <div className="text-sm border border-gray-500 rounded-md">
            <h4 className="font-medium text-gray-900 dark:text-gray-200 pt-1 px-1">
              Example:
            </h4>
            <pre className="mt-1 p-2 bg-white dark:bg-gray-900 text-gray-500 rounded text-xs">
              John Doe,john@example.com,password123,USER
              <br />
              Jane Smith,jane@example.com,securepass,ADMIN
            </pre>
          </div>

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
      <Toaster position="top-center" />
    </div>
  );
}
