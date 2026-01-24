import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../redux/actions/userActions.js";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    } else {
      return setIsLogin(false);
    }
    dispatch(getUser());
  }, []);

  return (
    <div className=" h-[14vh] w-full flex justify-between px-10 items-center ">
      <div>
        <h3 className="text-black font-bold text-4xl">Festivo</h3>
      </div>
      <div className="sm:flex gap-10 hidden font-bold ">
        <button className=" hover:underline">Home</button>
        <button className=" hover:underline">Contact</button>
        <button className=" hover:underline">About</button>
      </div>
      <div className="flex gap-4">
        {isLogin === true ? (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              setIsLogin(false);
            }}
            className="  py-2 px-4 rounded-full font-bold text-sm bg-gradient-to-r from-teal-500 to-teal-600 text-white "
          >
            Logout
          </button>
        ) : (
          <>
            {" "}
            <Link
              to={"/signup"}
              className="border border-black hover:border-none  py-2 px-4 rounded-full font-bold text-sm hover:bg-slate-800 hover:text-white"
            >
              Signup
            </Link>
            <Link
              to={"/login"}
              className="  py-2 px-4 rounded-full font-bold text-sm bg-gradient-to-r from-teal-500 to-teal-600 text-white "
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
