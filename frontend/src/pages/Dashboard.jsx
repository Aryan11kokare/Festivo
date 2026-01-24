import { useState, useMemo, useEffect } from "react";
import {
  Calendar,
  TrendingUp,
  DollarSign,
  Ticket,
  Clock,
  ArrowBigLeft,
  ArrowLeft,
  Plus,
} from "lucide-react";
import StatsCard from "../components/StatsCard.jsx";
import EventCard from "../components/EventCard.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents, getAllTickets } from "../redux/actions/eventActions.js";
const mockEvents = [
  {
    id: "1",
    title: "Tech Innovation Summit 2024",
    description:
      "Join industry leaders for a day of innovation, networking, and insights into the future of technology.",
    reviews: [],
    category: "Technology",
    date: new Date("2024-03-15"),
    startTime: "09:00",
    endTime: "17:00",
    location: {
      address: "123 Convention Center Blvd",
      city: "San Francisco",
      state: "CA",
      country: "USA",
    },
    price: 299,
    image:
      "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800",
    createdBy: "user1",
    isActive: true,
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "2",
    title: "Summer Music Festival",
    description:
      "Experience three days of incredible live music performances from top artists across multiple genres.",
    reviews: [],
    category: "Music",
    date: new Date("2024-06-20"),
    startTime: "14:00",
    endTime: "23:00",
    location: {
      address: "456 Park Avenue",
      city: "Austin",
      state: "TX",
      country: "USA",
    },
    price: 150,
    image:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800",
    createdBy: "user2",
    isActive: true,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "3",
    title: "Business Leadership Workshop",
    description:
      "Intensive workshop focused on developing leadership skills and strategic thinking for modern business challenges.",
    reviews: [],
    category: "Business",
    date: new Date("2024-02-28"),
    startTime: "10:00",
    endTime: "16:00",
    location: {
      address: "789 Corporate Plaza",
      city: "New York",
      state: "NY",
      country: "USA",
    },
    price: 450,
    image:
      "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800",
    createdBy: "user3",
    isActive: true,
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "4",
    title: "Modern Art Exhibition",
    description:
      "Explore contemporary art from emerging artists in this curated exhibition featuring diverse styles and mediums.",
    reviews: [],
    category: "Art",
    date: new Date("2024-04-10"),
    startTime: "11:00",
    endTime: "19:00",
    location: {
      address: "321 Gallery Street",
      city: "Los Angeles",
      state: "CA",
      country: "USA",
    },
    price: 25,
    image:
      "https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=800",
    createdBy: "user4",
    isActive: true,
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "5",
    title: "Culinary Masters Class",
    description:
      "Learn from Michelin-star chefs in this hands-on cooking experience featuring international cuisines.",
    reviews: [],
    category: "Food",
    date: new Date("2024-03-25"),
    startTime: "18:00",
    endTime: "21:00",
    location: {
      address: "555 Culinary Center",
      city: "Chicago",
      state: "IL",
      country: "USA",
    },
    price: 180,
    image:
      "https://images.pexels.com/photos/2662875/pexels-photo-2662875.jpeg?auto=compress&cs=tinysrgb&w=800",
    createdBy: "user5",
    isActive: true,
    createdAt: new Date("2024-01-12"),
  },
  {
    id: "6",
    title: "Sports Analytics Conference",
    description:
      "Deep dive into the world of sports analytics with data scientists and industry professionals.",
    reviews: [],
    category: "Sports",
    date: new Date("2024-05-05"),
    startTime: "09:00",
    endTime: "18:00",
    location: {
      address: "888 Stadium Drive",
      city: "Boston",
      state: "MA",
      country: "USA",
    },
    price: 350,
    image:
      "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800",
    createdBy: "user6",
    isActive: true,
    createdAt: new Date("2024-01-08"),
  },
];

const Dashboard = () => {
  const eventState = useSelector((state) => state.event);
  const userState = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [events, setEvents] = useState([]);
  const [state, setState] = useState({});

  const dispatch = useDispatch();
  const route = useNavigate();

  const fetchTickets = async () => {
    setLoading(true);
    await dispatch(getAllTickets());
    const responce2 = await dispatch(getAllEvents());
    if (responce2?.error?.name === "JsonWebTokenError") {
      localStorage.removeItem("token");
      route("/login");
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      route("/login");
    }
    fetchTickets();
  }, []);

  useEffect(() => {
    setEvents(eventState.events);
    const totalEvents = eventState.events.length;
    const activeEvents = eventState.events.filter((e) => e.isActive).length;
    const totalRevenue = eventState.events.reduce(
      (sum, event) => sum + event.price,
      0,
    );
    const upcomingEvents = eventState.events.filter(
      (e) => new Date(e.date) > new Date(),
    ).length;

    setState({
      totalEvents: totalEvents,
      activeEvents: activeEvents,
      totalTickets: userState?.tickets.length,
      upcomingEvents: upcomingEvents,
    });
  }, [eventState?.events]);

  const categories = [
    "All",
    ...Array.from(new Set(mockEvents.map((event) => event.category))),
  ];

  useEffect(() => {
    if (selectedCategory === "All") {
      setEvents(eventState.events);
    } else {
      const updated = eventState.events.filter(
        (event) => event.category === selectedCategory,
      );
      setEvents(updated);
    }
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div role="status">
          <svg
            aria-hidden="true"
            class="w-14 h-14 text-teal-100 fill-teal-500 animate-spin fill-brand"
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
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Festivo</h1>
            <p className="text-gray-600 hidden sm:flex ">
              Manage and track all your events in one place
            </p>
          </div>
          <div className="flex justify-center items-center gap-2">
            <Link
              to={"/addEvent"}
              className="flex gap-2  text-center bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold  rounded-full py-2 px-4"
            >
              <Plus className=" hidden sm:flex" />
              Create
            </Link>
            <Link
              to={"/"}
              className="flex justify-center gap-2 items-center border rounded-full py-2 px-4"
            >
              <ArrowLeft className=" hidden sm:flex" />
              back
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Events"
            value={state?.totalEvents}
            icon={Calendar}
            colorClass="text-blue-600"
            bgColorClass="bg-blue-50"
          />
          <StatsCard
            title="Active Events"
            value={state?.activeEvents}
            icon={TrendingUp}
            colorClass="text-emerald-600"
            bgColorClass="bg-emerald-50"
          />
          <Link to={"/tickets"}>
            <StatsCard
              title="Your Tickets"
              value={state?.totalTickets}
              icon={Ticket}
              colorClass="text-orange-600"
              bgColorClass="bg-orange-50"
            />
          </Link>
          <StatsCard
            title="Upcoming"
            value={state?.upcomingEvents}
            icon={Clock}
            colorClass="text-cyan-600"
            bgColorClass="bg-cyan-50"
          />
        </div>

        <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Filter by Category
          </h2>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedCategory === "All"
              ? "All Events"
              : `${selectedCategory} Events`}
          </h2>
          <span className="text-gray-600 font-medium">
            {events.length} {events.length === 1 ? "event" : "events"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No events found in this category
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
