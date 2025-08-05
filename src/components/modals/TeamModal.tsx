import { useState } from "react";
import { X } from "lucide-react";
import { CreateTeamData } from "@/types";
import { toast, Toaster } from "react-hot-toast";
import { GlassCard } from "../ui/GlassCard";

export function CreateTeamModal({
  isOpen,
  onCloseAction,
  onSuccessAction,
}: {
  isOpen: boolean;
  onCloseAction: () => void;
  onSuccessAction: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateTeamData>({
    alias: "",
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
      if (!formData.alias) {
        alert("Please fill in all required fields");
        return;
      }

      const res = await fetch("/api/v1/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create team");
      }

      const { team } = await res.json();
      toast.success(`Team '${team.alias}' created successfully`);

      // Reset form and close modal
      setFormData({
        alias: "",
      });
      onSuccessAction();
      onCloseAction();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to create team.");
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
                Add New Team
              </h3>
              <p
                id="modal-description"
                className="text-sm text-gray-500 dark:text-gray-400"
              >
                Create a new team.
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
                Team Alias *
              </label>
              <input
                type="text"
                name="alias"
                value={formData.alias}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-500 rounded-md px-3 py-2 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
              focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Doe"
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
                {isSubmitting ? "Creating team..." : "Create team"}
              </button>
            </div>
          </form>
        </div>
      </GlassCard>
      <Toaster position="top-center" />
    </div>
  );
}
