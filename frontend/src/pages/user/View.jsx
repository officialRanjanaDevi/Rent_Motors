import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ViewCard from "../../components/user/ViewCard/ViewCard";
import ReviewCard from "../../components/user/ViewCard/ReviewCard";
import LoadingCard from "../../components/user/ViewCard/LoadingCard";

const View = () => {
  const location = useLocation();
  const id = location.state;
  const [vehicleData, setVehicleData] = useState(null);

  const loadData = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER}/client/viewVehicle/${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const response = await res.json();
       setVehicleData(response.data);
    } catch (error) {
      console.error("Error loading vehicleData:", error);
    }
  };

  useEffect(() => {
    if (id) loadData();
  }, [id]);


  return (
    < >
      {vehicleData?(
        <>
    
         <ViewCard data={vehicleData}/>
         <ReviewCard data={vehicleData}/>
        </>
      ):<LoadingCard/>}
    </>
  );
};

export default View;
