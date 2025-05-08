import { useTheme } from "@/context/ThemeContext";

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function TabButton({
  label,
  isActive,
  onClick,
}: TabButtonProps) {
  const { darkMode } = useTheme();
  return (
    <button
      className={`px-6 py-3 w-full text-sm ${
        darkMode
          ? isActive
            ? "bg-white text-gray-900"
            : "bg-gray-900 text-white"
          : isActive
          ? "bg-gray-900 text-white"
          : "bg-white text-gray-900"
      } : ""
      }
          ${
            darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-200 text-gray-900"
          }
      `}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
