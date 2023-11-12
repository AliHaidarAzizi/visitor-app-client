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

  
  
  function AppRoutes() {
    return (
      <BrowserRouter basename="/">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

        </Routes>
      </BrowserRouter>

    )
  }
  
  export default AppRoutes