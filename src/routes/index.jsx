import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "../pages/Home";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import Cookies from "universal-cookie";
import Dashboard from "../pages/Dashboard";
import axios from "axios";
import { toast } from "react-toastify";
import Profile from "../pages/Profile";
import Venue from "../pages/Venue";
import VenueForm from "../pages/VenueForm";
import VisitorLogForm from "../components/VisitorLogForm";
import ThankYou from "../pages/ThankYou";
import { BASE_URL } from "../utils/api";

function AppRoutes() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/add/:venueId" element={<VisitorLogForm />} />
        <Route path="/secured/*" element={<ProtectedRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

const ProtectedRoutes = () => {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  const checkToken = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.get(`${BASE_URL}/protected`, config);
      setUserId(res.data.data.user);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
      cookies.remove("token");
      navigate("/login");
    }
  };
  useEffect(() => {
    if (token) {
      checkToken();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Dashboard userId={userId} />} />
      <Route path="/profile" element={<Profile userId={userId} />} />
      <Route path="/:venueId" element={<Venue />} />
      <Route path="/add" element={<VenueForm />} />
    </Routes>
  );
};

export default AppRoutes;
