// ProtectedRoute.js
import React from "react";
import Cookies from "js-cookie";

import { Navigate, Outlet } from "react-router-dom";
function ProtectedRoute() {
   const isLoggedIn=localStorage.getItem("username");
   return isLoggedIn ? <Outlet/> : <Navigate to="/login" />;
 
}

export default ProtectedRoute;
