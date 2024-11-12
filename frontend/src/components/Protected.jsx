// ProtectedRoute.js
import React from "react";
import Cookies from "js-cookie";

import { Navigate, Outlet } from "react-router-dom";
function ProtectedRoute() {
   const accessToken=Cookies.get("accessToken");
   console.log(Cookies.get("accessToken"))
   console.log(Cookies.get("refreshToken"))
   const isloggedin=localStorage.getItem("username");
   return isloggedin ? <Outlet/> : <Navigate to="/login" />;
 
}

export default ProtectedRoute;
