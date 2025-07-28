import { SlotInfo } from "react-big-calendar";
import { format } from "date-fns";

const BookLeaveModal = ({
  isOpen,
  onClose,
  slotInfo,
}: {
  isOpen: boolean;
  onClose: () => void;
  slotInfo: SlotInfo | null;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed min-h-full inset-0 dark:bg-black bg-white bg-opacity-50 flex items-center justify-center z-40 text-black">
      <div className="bg-gray-100 dark:bg-gray-900 border border-gray-500 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 dark:text-gray-200 text-gray-800">
          Add New Event
        </h2>
        {slotInfo && (
          <p className="mb-4 dark:text-gray-200 text-gray-800">
            Selected time: {format(slotInfo.start, "PPP")}
          </p>
        )}
        <div className="mb-4">
          <label className="block mb-2 dark:text-gray-200 text-gray-800">
            Event Title
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 dark:text-gray-200 text-gray-800 placeholder:text-gray-500"
            placeholder="Enter event title"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-400 rounded text-white"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-800 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookLeaveModal;
