import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate(); 
  const handleLogout = async () => {
    console.log("inside logout")
    const response = await fetch(
      "http://localhost:4000/api/auth/logout",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res=await response.json();
    if(res.success){
      localStorage.clear();
      console.log(Cookies.get("accessToken"));
      console.log(localStorage);
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      navigate("/");
    }
   
  };
  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
