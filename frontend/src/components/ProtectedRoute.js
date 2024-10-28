import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const token = localStorage.getItem("authToken");
  const isLoggedIn = token !== null;

  return isLoggedIn==="true"?<Outlet/> : <Navigate to="login"/>;
}

export default ProtectedRoute;
