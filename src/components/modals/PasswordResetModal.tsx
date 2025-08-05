import { toast, Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Loading from "@/components/Loading";
import { GlassCard } from "@/components/ui/GlassCard";

export function PasswordResetModal({
  isOpen,
  onCloseAction,
}: {
  isOpen: boolean;
  onCloseAction: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    if (status === "authenticated") {
      if (!session?.user?.id) {
        toast.error("User ID not found in session");
        return;
      }
      setIsLoading(false);
    }
  }, [status, session?.user?.id]);

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
      const userId = session?.user?.id;
      if (!userId) {
        toast.error("User ID not found in session");
        return;
      }

      // Validate form
      if (
        !formData.oldPassword ||
        !formData.newPassword ||
        !formData.confirmNewPassword
      ) {
        toast.error("Please fill in all required fields");
        return;
      }

      if (formData.newPassword !== formData.confirmNewPassword) {
        toast.error("New password and confirmation do not match");
        return;
      }

      const res = await fetch(`/api/v1/users/${userId}/reset-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.message || "Failed to reset password.");
        return;
      }

      toast.success("Password reset successfully.");

      // Reset form and close modal
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      onCloseAction();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to reset password.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || status === "loading") {
    return <Loading />;
  }

  return (
    <div
      className="fixed inset-0 min-h-full bg-opacity-50 flex items-center justify-center p-4"
      onClick={onCloseAction}
    >
      <GlassCard className="max-w-2xl w-4/5 md:w-1/4 items-center">
        <div
          className=" rounded-lg items-center p-6"
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
                Reset Password
              </h3>
              <p
                id="modal-description"
                className="text-sm text-gray-500 dark:text-gray-400"
              >
                Reset your account password here.
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
                Username
              </label>
              <input
                type="username"
                name="username"
                value={session?.user.username}
                disabled
                className="mt-1 block w-full border border-gray-500 rounded-md px-3 py-2 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
              focus:ring-blue-500 focus:border-blue-500"
                placeholder="Old password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Old password *
              </label>
              <input
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-500 rounded-md px-3 py-2 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
              focus:ring-blue-500 focus:border-blue-500"
                placeholder="Old password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                New Password *
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                required
                minLength={8}
                className="mt-1 block w-full border border-gray-500 rounded-md px-3 py-2 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
              focus:ring-blue-500 focus:border-blue-500"
                placeholder="New password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm New Password *
              </label>
              <input
                type="password"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleInputChange}
                required
                minLength={8}
                className="mt-1 block w-full border border-gray-500 rounded-md px-3 py-2 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
              focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm new password"
              />
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
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>
        </div>
      </GlassCard>
      <Toaster position="top-center" />
    </div>
  );
}
