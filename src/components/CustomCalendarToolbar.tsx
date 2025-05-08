import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface CustomToolbarProps {
  onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
  label: string;
}

const CustomToolbar = (toolbar: CustomToolbarProps) => {
  const { darkMode } = useTheme();

  const goToBack = () => {
    toolbar.onNavigate("PREV");
  };

  const goToNext = () => {
    toolbar.onNavigate("NEXT");
  };

  const goToCurrent = () => {
    toolbar.onNavigate("TODAY");
  };

  return (
    <div
      className={`flex justify-between items-center p-4 border-1 rounded-t-xl ${
        darkMode
          ? "bg-gray-800 text-white border-gray-200"
          : "bg-white text-gray-900 border-gray-900"
      }`}
    >
      <button
        onClick={goToBack}
        className={`flex items-center gap-1 px-3 py-2 rounded ${
          darkMode ? "hover:bg-gray-700" : "hover:bg-blue-100"
        } transition-colors`}
        aria-label="Previous month"
      >
        <ChevronLeft size={20} />
        <span className="hidden md:block text-sm font-medium">PREV</span>
      </button>

      <button onClick={goToCurrent} className="text-lg font-bold">
        {toolbar.label}
      </button>

      <button
        onClick={goToNext}
        className={`flex items-center gap-1 px-3 py-2 rounded ${
          darkMode ? "hover:bg-gray-700" : "hover:bg-blue-100"
        } transition-colors`}
        aria-label="Next month"
      >
        <span className="hidden md:block text-sm font-medium">NEXT</span>
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default CustomToolbar;
