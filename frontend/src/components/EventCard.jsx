import { Calendar, Clock, MapPin, DollarSign, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";

const categoryColors = {
  Technology: { bg: "bg-blue-50", text: "text-blue-700", badge: "bg-blue-100" },
  Music: { bg: "bg-pink-50", text: "text-pink-700", badge: "bg-pink-100" },
  Business: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    badge: "bg-emerald-100",
  },
  Art: { bg: "bg-orange-50", text: "text-orange-700", badge: "bg-orange-100" },
  Food: { bg: "bg-red-50", text: "text-red-700", badge: "bg-red-100" },
  Sports: { bg: "bg-cyan-50", text: "text-cyan-700", badge: "bg-cyan-100" },
};

export default function EventCard({ event }) {
  const colors = categoryColors[event.category] || categoryColors.Technology;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={`http://localhost:3000/${event?.media}`}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div
          className={`absolute top-4 right-4 bg-gray-100 text-black px-3 py-1 rounded-full text-xs font-semibold`}
        >
          {event.category}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {event.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-700 text-sm">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            <span>{formatDate(event.date)}</span>
          </div>

          <div className="flex items-center text-gray-700 text-sm">
            <Clock className="w-4 h-4 mr-2 text-gray-400" />
            <span>
              {event.startTime} - {event.endTime}
            </span>
          </div>

          <div className="flex items-center text-gray-700 text-sm">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span>
              {event.location.city}, {event.location.state}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <IndianRupee className="w-5 h-5 text-gray-900" />
            <span className="text-2xl font-bold text-gray-900">
              {event.price}
            </span>
          </div>
          <Link
            to={`/viewEvent/${event._id}`}
            className={`border px-6 py-2 rounded-md font-semibold hover:opacity-80 transition-opacity`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
