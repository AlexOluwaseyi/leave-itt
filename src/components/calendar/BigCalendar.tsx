"use client";

import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer, SlotInfo } from "react-big-calendar";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomCalendarToolbar from "@@/calendar/CustomCalendarToolbar";
import BookLeaveModal from "@@/modals/BookLeaveModal";
import { useTheme } from "@/context/ThemeContext";

const locales = {
  "en-US": import("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Inject custom dark mode CSS
const injectCalendarStyles = (darkMode: boolean) => {
  // Remove any previously injected styles
  const existingStyle = document.getElementById("calendar-theme-styles");
  if (existingStyle) {
    existingStyle.remove();
  }

  // We'll create styles for both light and dark modes
  const style = document.createElement("style");
  style.id = "calendar-theme-styles";

  if (darkMode) {
    style.innerHTML = `
      .rbc-calendar {
        color: #e2e8f0 !important;
        background-color: #101828 !important;
      }
      .rbc-header {
        background-color: #101828 !important;
        color: #e2e8f0 !important;
        border-bottom: 1px solid #ffffff !important;
        border-right: 1px solid #ffffff !important;
        border-top: none !important;
      }
      .rbc-header:last-child {
          border-right: none !important;
      }
      .rbc-off-range-bg {
        background-color: rgba(30, 41, 59, 0.4);
      }
      .rbc-off-range {
        color: #ffffff;
      }
      .rbc-today {
        background-color: rgba(51, 65, 85, 0.6);
      }
      .rbc-day-bg {
        border-color: #475569;
      }
      .rbc-month-row + .rbc-month-row,
      .rbc-day-bg + .rbc-day-bg {
        border-color: #ffffff;
      }
      .rbc-event {
        background-color: #3b82f6;
      }
      .rbc-show-more {
        color: #60a5fa;
      }
      .rbc-month-view, .rbc-month-header {
        border-color: #ffffff;
      }
      .rbc-date-cell.rbc-now {
        color: #ffffff;
      }
    `;
  } else {
    style.innerHTML = `
      .rbc-calendar {
        color: #1e293b !important;
        background-color: transparent !important;
      }
      .rbc-header {
        background-color: rgba(241, 245, 249, 0.8) !important;
        color: #1e293b !important;
        border-bottom: 1px solid #000000 !important;
        border-right: 1px solid #000000 !important;
        border-top: none !important;
      }
        .rbc-header:last-child {
          border-right: none !important;
      }
      .rbc-off-range-bg {
        background-color: rgba(241, 245, 249, 0.5);
      }
      .rbc-off-range {
        color: #ffffff;
      }
      .rbc-today {
        background-color: rgba(219, 234, 254, 0.6);
      }
      .rbc-day-bg {
        border-color: #e2e8f0;
      }
      .rbc-month-row + .rbc-month-row,
      .rbc-day-bg + .rbc-day-bg {
        border-color: #000000;
      }
      .rbc-event {
        background-color: #3b82f6;
      }
      .rbc-show-more {
        color: #2563eb;
      }
      .rbc-month-view, .rbc-month-header {
        border-color: #000000;
      }
      .rbc-date-cell.rbc-now {
        color: #ffffff;
      }
    `;
  }
  document.head.appendChild(style);
};

const BigCalendar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  // const [currentView, setCurrentView] = useState<View>("month");
  const { darkMode } = useTheme();

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    // Check if the selected date is in the same month as the current view
    const viewMonth = currentDate.getMonth();
    const selectedMonth = new Date(slotInfo.start).getMonth();

    if (selectedMonth === viewMonth) {
      setSelectedSlot(slotInfo);
      setModalOpen(true);
    }
  };

  const handleNavigate = (date: Date) => {
    setCurrentDate(date);
  };

  // Apply custom styles for the calendar based on theme
  useEffect(() => {
    injectCalendarStyles(darkMode);
  }, [darkMode]);

  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto min-h-[calc(100vh-138px)] md:h-screen md:my-0 dark:bg-gray-900 dark:text-white bg-white text-gray-900">
      <div className="w-full max-w-3xl p-4  rounded dark:bg-gray-900 dark:text-white bg-white text-gray-900">
        <Calendar
          key={currentDate.toISOString()}
          localizer={localizer}
          components={{
            toolbar: CustomCalendarToolbar,
          }}
          tooltipAccessor={"title"}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          date={currentDate}
          defaultView="month"
          onSelectSlot={handleSelectSlot}
          selectable
          longPressThreshold={0.001}
          onNavigate={handleNavigate} // Track navigation
        />
      </div>
      <p className="mt-4 text-gray-600">Powered by React Big Calendar</p>

      {/* Modal */}
      <BookLeaveModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        slotInfo={selectedSlot}
      />
    </div>
  );
};

export default BigCalendar;
