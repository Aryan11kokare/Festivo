import { X, Calendar, MapPin, Minus, Plus, IndianRupee } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTicket } from "../redux/actions/eventActions";

export default function BookingModal({ event, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const totalAmount = event.price * quantity;
  const eventDate = new Date(event.date);
  const available_tickets = event.totalTickets - event.sellTickets;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (quantity > available_tickets) {
      setError("Not enough tickets available");
      return;
    }

    const responce = await dispatch(
      createTicket({
        numberOfTickets: quantity,
        eventId: event._id,
        totalAmount: totalAmount,
      }),
    );

    if (responce?.error?.message === "Rejected") {
      setIsSubmitting(false);
      setError(JSON.stringify(responce.payload));
    } else {
      setTimeout(() => {
        setIsSubmitting(false);
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Book Your Tickets
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {event.title}
            </h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                <span className="text-sm">
                  {eventDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  at{" "}
                  {eventDate.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                <span className="text-sm">
                  {event.location.address}&nbsp;,&nbsp;{event.location.city}
                  &nbsp;,&nbsp;
                  {event.location.state}&nbsp;,&nbsp;{event.location.country}
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Number of Tickets
              </label>
              <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-2xl font-bold text-gray-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity(Math.min(available_tickets, quantity + 1))
                  }
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5 " />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Maximum {available_tickets} tickets available
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Price per ticket:</span>
                <span className="font-semibold flex justify-center items-center text-gray-900">
                  <IndianRupee className="w-4 h-4" />
                  {event.price}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-semibold text-gray-900">{quantity}</span>
              </div>
              <div className="border-t border-blue-200 my-3"></div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">
                  Total Amount:
                </span>
                <span className="text-3xl flex justify-center items-center font-bold text-teal-600">
                  <IndianRupee />
                  {totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isSubmitting ? "Processing..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
