interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  position?: "first" | "middle" | "last" | "single"; // Add position prop
}

export default function TabButton({
  label,
  isActive,
  onClick,
  position = "single",
}: TabButtonProps) {
  // Determine border radius based on position
  const getBorderRadius = () => {
    switch (position) {
      case "first":
        return "rounded-l-md rounded-r-none"; // Left rounded only
      case "middle":
        return "rounded-none"; // No rounding
      case "last":
        return "rounded-r-md rounded-l-none"; // Right rounded only
      case "single":
      default:
        return "rounded-md"; // All corners rounded
    }
  };
  return (
    <button
      className={`px-6 py-3 w-full text-sm text-gray-900 dark:text-gray-200 ${getBorderRadius()} ${
        isActive
          ? "inset-ring-2 inset-ring-white bg-gray-900 text-white dark:bg-gray-200 dark:text-gray-900 dark:inset-ring-gray-900"
          : "bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
