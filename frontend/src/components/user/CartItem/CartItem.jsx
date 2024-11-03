import React, { useState, useEffect } from "react";
import "./CartItem.css";

const CartItem = ({ data ,updateBikesAndPrice}) => {
  const [vehicleData, setVehicleData] = useState({});
  const [isDeleted, setIsDeleted] = useState(false);
  const [quantity, setQuantity] = useState(data.quantity || 1);
  const [loading, setLoading] = useState(false);
 
  const loadVehicleData = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/client/viewVehicle/${data.vehicle}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      setVehicleData(response.data);
     console.log(response.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadVehicleData();
  }, []);


  const updateQuantity = async (newQuantity) => {
    try {
      await fetch("http://localhost:4000/api/client/cart", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: vehicleData._id, quantity: newQuantity }),
       
      });
  
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const increase = async () => {
    if (quantity < 5) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      updateBikesAndPrice();
      await updateQuantity(newQuantity);
    }
  };

  const decrease = async () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateBikesAndPrice();
      await updateQuantity(newQuantity);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch("http://localhost:4000/api/client/cart", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: vehicleData._id }),
      });
      setIsDeleted(true);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return !isDeleted && !loading ? (
    <div className="bg-neutral-200 my-2 rounded-md p-2 flex justify-between items-center w-full flex-col md:flex-row">
      <img
        src={vehicleData.images?.[0]}
        alt="Product Image"
        className="rounded-md h-40"
      />

      <div className="flex justify-between flex-wrap w-full md:basis-4/6 px-2">
        <div className="flex flex-col">
          <h2 className="font-bold">{vehicleData.title}</h2>
          <p>{vehicleData.brand}</p>
          <button
            onClick={handleDelete}
            className="bg-black text-white p-1 mt-2 rounded-md w-1/2 hover:bg-neutral-700"
          >
            Remove
          </button>
        </div>

        <div>
          <p>Quantity</p>
          <div className="flex justify-center rounded-sm border-2 border-black">
            <button onClick={increase} className="h-full w-6 bg-black text-white text-center hover:bg-rose-300">+</button>
            <input
              type="number"
              min={1}
              max={5}
              value={quantity}
              onChange={(e) => {
                const newQuantity = Number(e.target.value);
                if (newQuantity >= 1 && newQuantity <= 5) {
                  setQuantity(newQuantity);
                  updateQuantity(newQuantity);
                }
              }}
              className="text-center w-8"
            />
            <button onClick={decrease} className="h-full w-6 bg-black text-white text-center hover:bg-rose-300">-</button>
          </div>
        </div>

        <div className="flex flex-col items-end me-2">
          <p className="text-md font-bold">Total: {vehicleData.price*quantity}rs</p>
          <p className="flex font-semibold">
            Price per day:&nbsp;
            <span className="">{vehicleData.price} rs</span>
          </p>
         
        </div>
      </div>
    </div>
  ) : null;
};

export default CartItem;
