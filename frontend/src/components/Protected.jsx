// ProtectedRoute.js
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { Navigate, Outlet } from "react-router-dom";
function ProtectedRoute() {
   const [isLoggedIn,setIsLoggedIn]=useState(localStorage.getItem("username"))
   useEffect(() => {
      setIsLoggedIn(localStorage.getItem("username"));
    })
   
   return isLoggedIn ? <Outlet/> : <Navigate to="/login" />;
 
}

export default ProtectedRoute;
