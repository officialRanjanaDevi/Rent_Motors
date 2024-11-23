import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/user/Navbar/Navbar";
import Footer from "./components/user/Footer/Footer";
import Home from "./pages/user/Home";
import Cart from "./pages/user/Cart";
import Vehicle from "./pages/user/Vehicle";
import View from "./pages/user/View";
import Order from "./pages/user/Order";
import Wishlist from "./pages/user/Wishlist";
import Contact from "./pages/user/Contact";
import Login from "./pages/user/Login";
import Logout from "./pages/user/Logout";
import About from "./pages/user/About";
import Signup from "./pages/user/Signup";
import Dashboard from "./pages/renter/Dashboard";
import Profile from "./pages/user/Profile"
import Success from "./pages/user/Success"
import ProtectedRoute from "./components/Protected";
import Cookies from "js-cookie";
import Failure from "./pages/user/Failure";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

function AppContent() {
  console.log(Cookies.get("accessToken"))
  const [accessToken, setAccessToken] = useState(Cookies.get("accessToken"));
  const [usertype, setUsertype] = useState(localStorage.getItem("usertype"));
  const location = useLocation();
  useEffect(() => {
    setAccessToken(Cookies.get("accessToken"))
    const fetchUserType = async () => {

      if (!accessToken) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_SERVER}/auth/refreshToken`,
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const res = await response.json();
        
          // const accessToken = res?.data?.accessToken;
          // const refreshToken = res?.data?.refreshToken;
        
          // if (accessToken) {
           
          //   Cookies.set('accessToken', accessToken, {
          //     expires: 1,
          //  });
          
           
          //   setAccessToken(accessToken);
          // }
          // if (refreshToken) {
          //   Cookies.set('refreshToken', refreshToken, {
          //     expires: 7,
          //   });
          // }
          if (res?.data?.usertype) {
            setUsertype(res.data.usertype);
            localStorage.setItem("usertype", res.data.usertype);
            localStorage.setItem("username", res.data.username);
          }
        } catch (error) {
          console.error("Error fetching user type:", error);
        }
      }
    };

    fetchUserType();
  }, [usertype]);

  const renterPaths = [
    "/renter",
    "/addVehicle",
    "/newOrder",
    "/updateVehicle",
    "/cancelReq",
    "/acceptedOrder",
    "/cancelledOrder",
    "/rejectedOrder"
  ];
  const showNavbarFooter = !renterPaths.includes(location.pathname);

  return (
    <>
      {showNavbarFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicle" element={<Vehicle />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/view" element={<View />} />
        <Route path="/about" element={<About />} />

        {/* Unauthorized Routes */}
        {!accessToken && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
          </>
        )}

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/signup" element={<Navigate to="/" />} />
         
          {usertype === "Client" ? (
            <>
              {/* Client Routes */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/order" element={<Order />} />
              <Route path="/success" element={<Success />} />
              <Route path="/failure" element={<Failure />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              {/* Renter Routes */}
              <Route path="/renter" element={<Dashboard panel="analysis" />} />
              <Route
                path="/addVehicle"
                element={<Dashboard panel="addVehicle" />}
              />
              <Route
                path="/newOrder"
                element={<Dashboard panel="newOrder" />}
              />
              <Route
                path="/acceptedOrder"
                element={<Dashboard panel="acceptedOrder" />}
              />
              <Route
                path="/updateVehicle"
                element={<Dashboard panel="updateVehicle" />}
              />
              <Route
                path="/cancelReq"
                element={<Dashboard panel="cancelReq" />}
              />
              <Route
                path="/cancelledOrder"
                element={<Dashboard panel="cancelledOrder" />}
              />
              <Route
                path="/rejectedOrder"
                element={<Dashboard panel="rejectedOrder" />}
              />
              <Route path="/*" element={<Navigate to="/renter" />} />
            </>
          )}

          
        </Route>
      </Routes>

      {showNavbarFooter && <Footer />}
    </>
  );
}

export default App;
