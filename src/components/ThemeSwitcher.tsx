"use client";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface ThemeSwitcherProps {
  collapsed?: boolean;
  className?: string;
}

export default function ThemeSwitcher({
  collapsed = false, // eslint-disable-line
  className = "",
}: ThemeSwitcherProps) {
  const { darkMode, toggleTheme} = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-md hover:bg-gray-100 ${
        darkMode
          ? "hover:bg-gray-200 hover:text-gray-900"
          : "hover:bg-gray-900 hover:text-gray-200"
      } ${className}`}
      title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
