import {
  ArrowLeft,
  BadgeCheck,
  DollarSign,
  IndianRupee,
  Ticket,
  Trash,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useEffect, useEffectEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.png";
import {
  createReview,
  deleteEvent,
  getEventById,
} from "../redux/actions/eventActions";
import ReviewCard from "../components/ReviewCard";
import BookingModal from "../components/Booking";
import { getUser } from "../redux/actions/userActions";
import { BASE_URL } from "../redux";

const View = () => {
  const eventState = useSelector((state) => state.event);
  const userState = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowFrom] = useState(false);
  const [event, setEvent] = useState();
  const [value, setValue] = useState(1);
  const [comment, setComment] = useState("");
  const path = window.location.href.split("/")[4];
  const dispatch = useDispatch();
  const route = useNavigate();

  const featchData = async () => {
    setLoading(true);
    await dispatch(getUser());
    await dispatch(getEventById({ id: path }));
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      route("/login");
    }
    featchData();
  }, []);

  useEffect(() => {
    setEvent(eventState.event);
  }, [eventState?.event]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const responce = await dispatch(
      createReview({ comment: comment, rating: value, eventId: event._id }),
    );

    if (responce?.error?.message === "Rejected") {
      await setLoading(false);
    } else {
      await dispatch(getEventById({ id: path }));
      setTimeout(() => {
        setComment("");
        setLoading(false);
      }, 2000);
    }
  };

  const handleClose = () => {
    setShowFrom(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    await dispatch(deleteEvent({ id: eventState?.event?._id }));
    setLoading(false);
    route("/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-14 h-14 text-teal-100 fill-teal-500 animate-spin fill-brand"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {showForm === true && (
        <BookingModal onClose={handleClose} event={event} />
      )}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 ">
        <section className=" w-full flex justify-between py-6 px-10">
          <div>
            <div className="flex gap-2 justify-start items-center  mb-2">
              <img src={logo} alt="" className="h-10" />
              <h1 className="text-4xl font-bold text-gray-900">Festivo</h1>
            </div>
            <p className="text-gray-600 flex gap-2 justify-center items-center ">
              {userState?.user?.username}
              <BadgeCheck size={16} className="text-blue-600" />
            </p>
          </div>
          <div className="flex justify-center items-center gap-2">
            <Link
              to={"/dashboard"}
              className="flex justify-center gap-2 items-center border rounded-full py-2 px-4"
            >
              <ArrowLeft />
              back
            </Link>
          </div>
        </section>
        <section className="md:h-[70vh] md:flex px-10">
          <div className="h-full md:w-[50%] flex justify-center items-center ">
            <img
              src={`${BASE_URL}/${event?.media}`}
              alt="Event image logo"
              className=" h-full w-full rounded-xl object-cover"
            />
          </div>
          <div className="h-full md:w-[50%] md:px-6 py-4 flex flex-col justify-start">
            <h2 className="text-black font-bold  text-4xl ">{event?.title}</h2>
            <p className="text-gray-600 text-xl mt-2">{event?.description}</p>
            <p className="text-gray-600  mt-4">
              <span className="text-black font-medium">Date : </span>
              {event?.date}
            </p>
            <p className="text-gray-600  mt-2">
              <span className="text-black font-medium">Start Time : </span>
              {event?.startTime}
            </p>
            <p className="text-gray-600  mt-2">
              <span className="text-black font-medium">End Time : </span>
              {event?.endTime}
            </p>
            <hr className="my-4" />
            <h3 className="text-lg font-bold">Location</h3>

            <p className="text-gray-600  mt-4">
              <span className="text-black font-medium">Address : </span>
              {event?.location.address}
            </p>
            <div className="flex gap-10 items-center">
              <p className="text-gray-600  mt-2">
                <span className="text-black font-medium">city : </span>
                {event?.location.city}
              </p>
              <p className="text-gray-600  mt-4">
                <span className="text-black font-medium">state : </span>
                {event?.location.state}
              </p>
              <p className="text-gray-600  mt-2">
                <span className="text-black font-medium">Country : </span>
                {event?.location.country}
              </p>
            </div>
          </div>
        </section>
        <br />
        <br />
        <hr className="mx-8 border rounded-full border-gray-200" />
        <section className="md:h-[90vh] md:flex px-10">
          <div className="h-full md:w-[50%] pr-6 py-8  ">
            <form onSubmit={handleSubmit} className="w-full">
              <label className="font-bold text-xl" htmlFor="review">
                Review this Event
              </label>
              <p className="text-gray-600 text-sm mb-4">
                Share your thoughts with other customers
              </p>
              <Box sx={{ "& > legend": { width: "100%" } }}>
                <Rating
                  size="large"
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Box>
              <textarea
                id="review"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write the event review"
                required
                className="text-black  bg-gray-200 p-2 rounded-md w-full"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Send
              </button>
            </form>
            <br />
            <hr />
            <h3 className="text-lg font-bold mt-4">Booking Tickets</h3>
            <p className="text-gray-600  mt-4 flex items-center">
              <span className="text-black font-medium">Price : </span>
              <IndianRupee className=" h-4 w-4 text-gray-900" /> {event?.price}
            </p>
            <div className="flex gap-10 items-center">
              <p className="text-gray-600  mt-4">
                <span className="text-black font-medium">Total Tickets : </span>
                {event?.totalTickets}
              </p>
              <p className="text-gray-600  mt-2">
                <span className="text-black font-medium">Remaining : </span>
                {event?.totalTickets - event?.sellTickets}
              </p>
            </div>
            <br />
            <button
              onClick={() => setShowFrom(true)}
              className="flex justify-center mb-2 gap-2 w-full items-center border rounded-md py-2 px-4"
            >
              Buy ticket <Ticket />
            </button>
            {userState?.user?._id.toString() ===
            eventState?.event?.createdBy._id.toString() ? (
              <button
                onClick={handleDelete}
                className="flex justify-center font-bold gap-2 w-full items-center bg-red-600 text-white rounded-md py-2 px-4"
              >
                Delete Event
              </button>
            ) : null}
          </div>
          <div className="h-full md:w-[50%] md:px-6 py-4 flex flex-col justify-start items-start ">
            <h4 className="font-bold text-xl" htmlFor="review">
              Customer Reviews
            </h4>
            <div className="mt-4 h-full border w-full rounded-md p-4 overflow-y-scroll">
              {event?.reviews.map((review) => {
                return <ReviewCard key={review._id} review={review} />;
              })}
            </div>
          </div>
        </section>
        <hr className="mx-4 border rounded-full border-gray-200" />
      </div>
    </>
  );
};

export default View;
