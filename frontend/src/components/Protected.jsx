// ProtectedRoute.js
import React from "react";
import Cookies from "js-cookie";

import { Navigate, Outlet } from "react-router-dom";
function ProtectedRoute() {
   const accessToken=Cookies.get('accessToken');
   return accessToken ? <Outlet/> : <Navigate to="/login" />;
 
}

export default ProtectedRoute;
