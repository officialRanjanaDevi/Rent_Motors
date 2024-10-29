// ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedRoute(props) {
    const {Component}=props
   const usertype = localStorage.getItem('usertype');
   console.log(usertype)
   return usertype==="Client" ? <Component/> : <Navigate to="/login" />;
 
}

export default ProtectedRoute;
