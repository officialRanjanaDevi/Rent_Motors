import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate(); 
  const handleLogout = async () => {
    await localStorage.removeItem("authToken");

    navigate("/");
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
