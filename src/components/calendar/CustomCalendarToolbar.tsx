import { ChevronLeft, ChevronRight } from "lucide-react";
import { ToolbarProps, NavigateAction } from "react-big-calendar";

// eslint-disable-next-line
interface CustomToolbarProps extends ToolbarProps {}

const CustomToolbar = (toolbar: CustomToolbarProps) => {
  const goToPrev = () => {
    toolbar.onNavigate("PREV" as NavigateAction);
  };

  const goToNext = () => {
    toolbar.onNavigate("NEXT" as NavigateAction);
  };

  const goToCurrent = () => {
    toolbar.onNavigate("TODAY" as NavigateAction);
  };

  return (
    <div className="flex justify-between items-center p-4 border-1 rounded-t-xl dark:bg-gray-900 dark:text-white dark:border-gray-200 bg-white text-gray-900 border-gray-900">
      <button
        onClick={goToPrev}
        className="flex items-center gap-1 px-3 py-2 rounded dark:hover:bg-gray-700 hover:bg-blue-100 transition-colors"
        aria-label="Previous month"
      >
        <ChevronLeft size={20} />
        <span className="block text-sm font-medium">PREV</span>
      </button>

      <button onClick={goToCurrent} className="text-lg font-bold">
        {toolbar.label}
      </button>

      <button
        onClick={goToNext}
        className="flex items-center gap-1 px-3 py-2 rounded dark:hover:bg-gray-700 hover:bg-blue-100 transition-colors"
        aria-label="Next month"
      >
        <span className="block text-sm font-medium">NEXT</span>
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default CustomToolbar;
