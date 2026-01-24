import Event from "../models/event.js";
import Review from "../models/review.js";

export const eventReview = async (req, res) => {
  const user = req.user;
  try {
    const { eventId, comment, rating } = req.body;
    let event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json("event not found");
    }
    let newReview = new Review({
      comment: comment,
      rating: rating,
    });
    newReview.author = user._id;
    event.reviews.push(newReview);
    await newReview.save();
    await event.save();
    res.status(200).json("review created successfully");
  } catch (e) {
    console.log(e);
  }
};

export const deleteReview = async (req, res) => {
  const user = req.user;
  try {
    let { evnentId, reviewId } = req.body;
    const foundReview = await Review.findById(reviewId);
    if (foundReview.author.toString() !== user._id.toString()) {
      return res
        .status(401)
        .json("You don't have permission to delete this review");
    }
    await Event.findByIdAndUpdate(evnentId, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.status(200).json("review deleted successfully");
  } catch (e) {
    console.log(e);
  }
};
