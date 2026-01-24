import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 flex flex-col justify-center items-center ">
      <div className="h-[50vh] w-full flex justify-center items-center align-middle">
        <img
          src="https://assets.dochipo.com/editor/animations/404-error/34436078-a766-4673-b05a-1a30bdf86537.gif"
          alt="Page not found"
          className="h-[25rem] w-[30rem] object-contain"
        />
      </div>
      <div className="flex flex-col gap-2 mt-7">
        <h1 className="text-black font-bold text-6xl">Page Not Found !</h1>
        <Link
          to={"/"}
          className="mt-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-center font-bold text-sm py-2 px-4 w-full rounded-xl"
        >
          Back to Home{" "}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
