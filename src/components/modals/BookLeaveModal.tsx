import { SlotInfo } from "react-big-calendar";
import { format } from "date-fns";
import { Session } from "next-auth";
import { toast, Toaster } from "react-hot-toast";

const BookLeaveModal = ({
  isOpen,
  onClose,
  session,
  slotInfo,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  session: Session | null;
  slotInfo: SlotInfo | null;
  onSuccess: () => void;
}) => {
  if (!isOpen) return null;

  const submitBooking = async () => {
    try {
      if (!slotInfo) {
        console.error("No slot information available");
        return;
      }
      const formattedDate = format(slotInfo.start, "dd-MM-yyyy");
      console.log("Selected Date:", formattedDate);

      // Here you would typically make an API call to submit the booking
      const res = await fetch("/api/v1/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: formattedDate,
          userId: session?.user?.id,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        toast.error(err.message || "Failed to book leave");
        return;
      }
      const { booking } = await res.json();
      toast.success(`Booking successful: ${booking.date}`);
      onSuccess();
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred while booking leave.");
      }
    }
  };

  return (
    <div className="fixed min-h-full inset-0 dark:bg-black bg-white bg-opacity-50 flex items-center justify-center z-40 text-black">
      <div className="bg-gray-100 dark:bg-gray-900 border border-gray-500 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 dark:text-gray-200 text-gray-800">
          Book Leave
        </h2>
        {slotInfo && (
          <p className="mb-4 dark:text-gray-200 text-gray-800">
            Selected Date: {format(slotInfo.start, "PPP")}
          </p>
        )}
        {/* <div className="mb-4">
          <label className="block mb-2 dark:text-gray-200 text-gray-800">
            Event Title
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 dark:text-gray-200 text-gray-800 placeholder:text-gray-500"
            placeholder="Enter event title"
          />
        </div> */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-400 rounded text-white"
          >
            Cancel
          </button>
          <button
            onClick={submitBooking}
            className="px-4 py-2 bg-green-800 text-white rounded"
          >
            Book
          </button>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default BookLeaveModal;
