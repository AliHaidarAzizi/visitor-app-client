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

  
  
  function AppRoutes() {
    return (
      <BrowserRouter basename="/">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/secured/*" element={<ProtectedRoutes />} />

        </Routes>
      </BrowserRouter>

    )
  }

  const ProtectedRoutes = () => {
    const cookies = new Cookies(null,{ path: "/"})
    const token = cookies.get("token")
    const navigate = useNavigate()
    const [userId, setUserId] = useState(null)

    const checkToken = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        }
        const res = await axios.get("http://localhost:3000/protected", config )
        setUserId(res.data.data.user)
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message)
        cookies.remove("token");
        navigate("/login");
      }
    }
    useEffect(()=> {
      if (token) {
        checkToken()
        
      } else {
          navigate("/login");
        
      }
    }, []) 

    return (
      <Routes>
            <Route path="/" element={<Dashboard userId={userId} />} />
            <Route path="/profile" element={<Profile />} />
            

      </Routes>
    )
  }
  
  export default AppRoutes