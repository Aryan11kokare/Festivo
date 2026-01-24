import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],

  category: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  startTime: {
    type: String,
  },

  endTime: {
    type: String,
  },

  location: {
    address: String,
    city: String,
    state: String,
    country: String,
  },

  price: {
    type: Number,
    required: true,
  },

  media: {
    type: String,
    default: null,
  },

  fileType: {
    type: String,
    default: "",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  totalTickets: {
    type: Number,
    default: 0,
    requied: true,
  },

  sellTickets: {
    type: Number,
    default: 0,
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
