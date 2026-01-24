import Event from "../models/event.js";

export const createEvent = async (req, res) => {
  const user = req.user;
  try {
    const {
      title,
      description,
      category,
      date,
      startTime,
      endTime,
      location,
      totalTickets,
      price,
    } = req.body;

    const newEvent = new Event({
      title: title,
      description: description,
      category: category,
      date: date,
      startTime: startTime,
      endTime: endTime,
      location: JSON.parse(location),
      price: price,
      createdBy: user._id,
      totalTickets: totalTickets,
      media: req.file !== undefined ? req.file.filename : "",
      fileType: req.file !== undefined ? req.file.mimetype.split("/")[1] : "",
    });

    await newEvent.save();
    res.status(200).json("Event Created successfully");
  } catch (e) {
    console.log(e);
  }
};

export const deleteEvent = async (req, res) => {
  const user = req.user;
  try {
    const eventId = req.params.id;
    const foundEvent = await Event.findById(eventId);
    if (foundEvent.createdBy.toString() !== user._id.toString()) {
      return res
        .status(401)
        .json("You don't have permission to delete this event");
    }
    await Event.findByIdAndDelete(eventId);
    res.status(200).json("Event deleted");
  } catch (e) {
    console.log(e);
  }
};

export const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId)
      .populate("createdBy", " username email profileImage")
      .populate({ path: "reviews", populate: { path: "author" } });
    if (!event) {
      return res.status(404).json("event not found!");
    }
    res.status(200).json(event);
  } catch (e) {
    console.log(e);
  }
};

export const searchEvent = async (req, res) => {
  try {
    const { keyword, city, category, date } = req.query;

    let query = {};

    // 🔍 Search by title
    if (keyword) {
      query.title = { $regex: keyword, $options: "i" };
    }

    // 📍 Filter by city
    if (city) {
      query["location.city"] = city;
    }

    // 📂 Filter by category
    if (category) {
      query.category = category;
    }

    // 📅 Filter by date
    if (date) {
      query.date = { $gte: new Date(date) };
    }

    const events = await Event.find(query)
      .populate("category", "name")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate(
      "createdBy",
      " username email profileImage",
    );
    res.status(200).json({ events });
  } catch (e) {
    res.status(500).json(e.message);
  }
};
