import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" min-h-screen  bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
      <Navbar />
      <div className="sm:h-[75vh]  sm:flex">
        <div className="h-full hidden sm:flex w-[50%]">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/event-management-service-illustration-svg-download-png-4693331.png"
            alt="Event image logo"
            className=" h-full w-full object-contain"
          />
        </div>
        <div className="h-full w-full sm:w-[50%] p-10 flex flex-col justify-center">
          <h4 className="text-black font-bold text-6xl ">
            Where Every Event Feels Like a Festival
          </h4>
          <p className=" font-medium mt-3 text-gray-500">
            A Smart Platform to Plan, Organize, and Manage Festive Events
            Seamlessly. Organize Events Smarter, Faster, and Better From Start
            to Finish
          </p>
          <hr className="my-4" />
          <Link
            to={"/dashboard"}
            className=" text-center bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold text-xl w-full rounded-full py-2 px-4"
          >
            Get Started
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
