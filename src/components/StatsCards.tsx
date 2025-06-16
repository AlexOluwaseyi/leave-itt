import { DashboardStats } from "../types";

interface StatsCardsProps {
  stats: DashboardStats;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Team Members",
      value: stats.totalMembers,
      icon: "👥",
      color: "bg-blue-500",
      textColor: "text-blue-600",
    },
    {
      title: "Active Members",
      value: stats.activeMembers,
      icon: "✅",
      color: "bg-green-500",
      textColor: "text-green-600",
    },
    {
      title: "Suspended Members",
      value: stats.suspendedMembers,
      icon: "⏸️",
      color: "bg-red-500",
      textColor: "text-red-600",
    },
    {
      title: "Total Leave Days",
      value: stats.totalLeaveDays,
      icon: "📅",
      color: "bg-purple-500",
      textColor: "text-purple-600",
    },
    {
      title: "Booked Days",
      value: stats.bookedLeaveDays,
      icon: "📋",
      color: "bg-orange-500",
      textColor: "text-orange-600",
    },
    {
      title: "Remaining Days",
      value: stats.remainingLeaveDays,
      icon: "🗓️",
      color: "bg-teal-500",
      textColor: "text-teal-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">
                {card.title}
              </p>
              <p className={`text-3xl font-bold ${card.textColor}`}>
                {card.value}
              </p>
            </div>
            <div
              className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center text-white text-xl`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
