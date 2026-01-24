import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  numberOfTickets: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  created_At: {
    type: Date,
    default: Date.now(),
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
