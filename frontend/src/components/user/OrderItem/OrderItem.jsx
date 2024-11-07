import React, { useState, useEffect } from "react";

const OrderItem = ({ data }) => {
  const [vehicleData, setVehicleData] = useState({});
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const loadData = async () => {
     try {
      const res = await fetch(
        `http://localhost:4000/api/client/viewVehicle/${data.vehicle}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = await res.json();
      setVehicleData(response.data);
      setLoading(false);
      setError(false);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  
  };

  useEffect(() => {
    loadData();
  }, []);
 
  const handlecancel=async()=>{
    
    try {
      await fetch("http://localhost:4000/api/client/order", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: data._id }),
      });
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-neutral-200 shadow-md shadow-neutral-400 my-2 rounded-md p-2 flex justify-between items-center relative w-full lg:w-5/6 mx-auto flex-col md:flex-row">
      <img
        src={vehicleData.images[0] || "https://via.placeholder.com/150"} 
        alt={vehicleData.title || "Product image"} 
        className="rounded-md"
      />
      <div className="grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1 w-full md:basis-4/6 px-2">
        <div className="flex flex-col items-center">
          <h2 className="font-bold">{vehicleData.title || "Product Name"}</h2>
          <p>{vehicleData.description || "No description available."}</p>
        </div>
        <div className="flex flex-col items-center me-2">
          <p className="text-md font-bold">Total: {data.price || "N/A"}rs</p>
          <p className="text-md font-bold">Days: {data.days || "N/A"}</p>
        </div>
        <div className="text-center mx-1">
          <h2 className="font-bold text-md">Start Date</h2>
          <p className="p-1 bg-lime-600 rounded-md text-center mt-1  mx-auto">
            {data.startdate.substring(0,10) || "N/A"}
          </p>
        </div>
        <div className="text-center mx-1">
          <h2 className="font-bold text-md">Delivery Status</h2>
          <p className="p-1 bg-lime-600 rounded-md text-center mt-1  mx-auto">
            {data.status || "Pending"}
          </p>
        </div>
        {data.status==="Placed"||data.status==="Accepted"? <button onClick={handlecancel} className="bg-black text-white mt-4 rounded-md max-h-8 hover:bg-neutral-700" >
          Cancel
        </button>:""}
       
      </div>
    </div>
  );
};

export default OrderItem;
