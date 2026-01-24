import { Calendar, DollarSign, Download, MapPin, Ticket } from "lucide-react";
import { BASE_URL, clientServer } from "../redux";
import { useState } from "react";

const TicketCard = ({ ticket }) => {
  const [loading, setLoading] = useState(false);
  const eventDate = new Date(ticket?.eventId.date);

  return (
    <div className="w-full min-h-[5rem] mb-4 rounded-md ">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {ticket?.eventId.title}
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
              {ticket?.eventId.location.address}&nbsp;,&nbsp;
              {ticket?.eventId.location.city}
              &nbsp;,&nbsp;
              {ticket?.eventId.location.state}&nbsp;,&nbsp;
              {ticket?.eventId.location.country}
            </span>
          </div>
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 mr-3 text-gray-400" />
            <span className="text-sm">{ticket?.eventId.price}</span>
          </div>
          <div className="sm:flex items-center justify-between w-full">
            <div className="flex items-center">
              <Ticket className="w-5 h-5 mr-3 text-gray-400" />
              <span className="text-sm">
                {ticket?.numberOfTickets}&nbsp;Tickets
              </span>
            </div>
            <button
              disabled={loading}
              onClick={async () => {
                setLoading(true);
                const responce = await clientServer.get(
                  `/ticket/download_ticket?id=${ticket?._id}`,
                );
                setLoading(false);

                window.open(`${BASE_URL}/${responce.data.message}`, "_blank");
              }}
              className="flex items-center disabled:opacity-50 disabled:cursor-not-allowed mt-2 sm:mt-0 cursor-pointer bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-md py-2 px-4"
            >
              <Download className="w-5 h-5 mr-3 " />
              <span className="text-sm">Download Recipt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
