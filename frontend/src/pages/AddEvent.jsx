import { AlertCircle, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createEvent } from "../redux/actions/eventActions";

const AddEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState();
  const [startTime, setStratTime] = useState();
  const [endTime, setEndTime] = useState();
  const [price, setPrice] = useState();
  const [totalTickets, setTotalTickets] = useState();
  const [media, setMedia] = useState();
  const [location, setLocation] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
  });

  const dispatch = useDispatch();
  const route = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLocation((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      route("/login");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const responce = await dispatch(
      createEvent({
        title: title,
        description: description,
        category: category,
        date: date,
        startTime: startTime,
        endTime: endTime,
        location: location,
        price: price,
        totalTickets: totalTickets,
        media: media,
      }),
    );

    if (responce?.error?.message === "Rejected") {
      await setLoading(false);
      await setError(JSON.stringify(responce.payload));
    } else {
      setTimeout(() => {
        setLoading(false);
        route("/dashboard");
      }, 2000);
    }
  };
  return (
    <div className="min-h-screen bg-white">
      <div className="mb-4 w-full flex justify-between py-8 px-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Festivo</h1>
          <p className="text-gray-600 ">Add Your Event</p>
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
      </div>
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="w-full px-10 sm:px-20 mb-10">
        <div className="w-full sm:flex gap-10  ">
          <div className="w-full">
            <label htmlFor="title" className="font-medium">
              Title
            </label>
            <br />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the title"
              required
              className="bg-gray-200 w-full  p-2 rounded-md"
            />
          </div>
          <div className="w-full mt-4 sm:mt-0">
            <label htmlFor="category" className="font-medium">
              Category
            </label>
            <br />
            <select
              id="category"
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-200 w-full p-2 rounded-md"
            >
              <option>Select the category</option>
              <option value={"Technology"}>Technology</option>
              <option value={"Music"}>Music</option>
              <option value={"Business"}>Business</option>
              <option value={"Art"}>Art</option>
              <option value={"Food"}>Food</option>
              <option value={"Sports"}>Sports</option>
            </select>
          </div>
        </div>
        <div className="mt-4 sm:mt-8 w-full">
          <label htmlFor="description" className="font-medium">
            Description
          </label>
          <br />
          <textarea
            type="text"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the short about event"
            className="bg-gray-200 p-2  w-full rounded-md"
          />
        </div>
        <div className="w-full sm:flex gap-10 sm:mt-8  ">
          <div className="w-full ">
            <label htmlFor="date" className="font-medium">
              Date
            </label>
            <br />
            <input
              type="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Enter the title"
              required
              className="bg-gray-200 w-full  p-2 rounded-md"
            />
          </div>

          <div className="w-full mt-4 sm:mt-0">
            <label htmlFor="startTime" className="font-medium">
              Start Time
            </label>
            <br />
            <input
              type="text"
              value={startTime}
              onChange={(e) => setStratTime(e.target.value)}
              placeholder="ex. 14:00"
              required
              className="bg-gray-200 w-full  p-2 rounded-md"
            />
          </div>
          <div className="w-full mt-4 sm:mt-0">
            <label htmlFor="endTime" className="font-medium">
              End Time
            </label>
            <br />
            <input
              type="text"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              placeholder="ex. 23:00"
              required
              className="bg-gray-200 w-full  p-2 rounded-md"
            />
          </div>
        </div>
        <div className="w-full sm:flex gap-10 mt-4 sm:mt-8  ">
          <div className="w-full">
            <label htmlFor="price" className="font-medium">
              Price
            </label>
            <br />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="2000"
              required
              className="bg-gray-200 w-full  p-2 rounded-md"
            />
          </div>

          <div className="w-full mt-4 sm:mt-0">
            <label htmlFor="startTime" className="font-medium">
              Total tickets
            </label>
            <br />
            <input
              type="number"
              value={totalTickets}
              onChange={(e) => setTotalTickets(e.target.value)}
              placeholder="6000"
              required
              className="bg-gray-200 w-full  p-2 rounded-md"
            />
          </div>
          <div className="w-full mt-4 sm:mt-0">
            <label htmlFor="endTime" className="font-medium">
              Image
            </label>
            <br />
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              required
              onChange={(e) => setMedia(e.target.files[0])}
              className="bg-gray-200 w-full  p-2 rounded-md"
            />
          </div>
        </div>
        <hr className="my-4" />
        <h3 className="font-bold text-2xl">Location</h3>
        <div className="w-full sm:flex gap-10  mt-4  ">
          <div className="w-full">
            <label htmlFor="address" className="font-medium">
              Address
            </label>
            <br />
            <input
              type="text"
              name="address"
              value={location.address}
              onChange={handleInput}
              required
              placeholder="Enter the Address"
              className="bg-gray-200 w-full  p-2 rounded-md"
            />
          </div>
          <div className="w-full mt-4 sm:mt-0">
            <label htmlFor="city" className="font-medium">
              City
            </label>
            <br />
            <input
              type="text"
              name="city"
              value={location.city}
              onChange={handleInput}
              required
              placeholder="Mumbai"
              className="bg-gray-200 w-full  p-2 rounded-md"
            />
          </div>
        </div>
        <div className="w-full sm:flex gap-10 mt-4 sm:mt-8 ">
          <div className="w-full">
            <label htmlFor="state" className="font-medium">
              State
            </label>
            <br />
            <input
              type="text"
              name="state"
              value={location.state}
              onChange={handleInput}
              placeholder="Maharastra"
              required
              className="bg-gray-200 w-full  p-2 rounded-md"
            />
          </div>
          <div className="w-full mt-4 sm:mt-0">
            <label htmlFor="country" className="font-medium">
              Country
            </label>
            <br />
            <input
              type="text"
              name="country"
              value={location.country}
              onChange={handleInput}
              required
              placeholder="India"
              className="bg-gray-200 w-full  p-2 rounded-md"
            />
          </div>
        </div>
        <br />
        <br />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
