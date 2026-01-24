import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import AddEvent from "./pages/AddEvent.jsx";
import View from "./pages/View.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Tickets from "./pages/Tickets.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addEvent" element={<AddEvent />} />
        <Route path="/viewEvent/:id" element={<View />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
