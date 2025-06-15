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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 text-black">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 ">Add New Event</h2>
        {slotInfo && (
          <p className="mb-4">Selected time: {format(slotInfo.start, "PPP")}</p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Event Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
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
