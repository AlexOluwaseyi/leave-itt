import { useState } from "react";
import { LeaveBookingPeriod } from "../types";

interface LeaveBookingPeriodsProps {
  periods: LeaveBookingPeriod[];
  setPeriods: (periods: LeaveBookingPeriod[]) => void;
}

export default function LeaveBookingPeriods({
  periods,
  setPeriods,
}: LeaveBookingPeriodsProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    maxDaysPerMember: 10,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPeriod: LeaveBookingPeriod = {
      id: Date.now().toString(),
      name: formData.name,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      isActive: true,
      maxDaysPerMember: formData.maxDaysPerMember,
    };
    setPeriods([...periods, newPeriod]);
    setFormData({ name: "", startDate: "", endDate: "", maxDaysPerMember: 10 });
    setShowAddForm(false);
  };

  const togglePeriodStatus = (periodId: string) => {
    setPeriods(
      periods.map((period) =>
        period.id === periodId
          ? { ...period, isActive: !period.isActive }
          : period
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200">
              Leave Booking Periods
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Configure when team members can book leave
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Add Period
          </button>
        </div>

        <div className="p-6">
          {periods.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No leave booking periods configured
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {periods.map((period) => (
                <div key={period.id} className=" p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-200">
                        {period.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {period.startDate.toLocaleDateString()} -{" "}
                        {period.endDate.toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        Max {period.maxDaysPerMember} days per member
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          period.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {period.isActive ? "Active" : "Inactive"}
                      </span>
                      <button
                        onClick={() => togglePeriodStatus(period.id)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                          period.isActive
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                      >
                        {period.isActive ? "Deactivate" : "Activate"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Period Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Add Leave Booking Period
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Period Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Days Per Member
                </label>
                <input
                  type="number"
                  value={formData.maxDaysPerMember}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maxDaysPerMember: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  required
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Add Period
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
