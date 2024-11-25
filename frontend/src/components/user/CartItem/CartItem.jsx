import React, { useState, useEffect } from "react";
import "./CartItem.css";

const CartItem = ({ data, updateBikesAndPrice }) => {
  const [vehicleData, setVehicleData] = useState({});
  const [isDeleted, setIsDeleted] = useState(false);
  const [quantity, setQuantity] = useState(data.quantity || 1);
  const [stdate, setStdate] = useState(data.startdate.substring(0, 10));
  const [days, setDays] = useState(data.days);
  const [loading, setLoading] = useState(false);
  const userid=localStorage.getItem("userid");
  const loadVehicleData = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER}/client/viewVehicle/${data.vehicle}/${userid}`,
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
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadVehicleData();
  }, []);

  const update = async () => {
    try {
      await fetch(`${import.meta.env.VITE_SERVER}/client/cart/${userid}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: vehicleData._id,
          quantity,
          startdate: stdate,
          days,
        }),
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const increaseQuantity = () => {
    if (quantity < 5) {
      setQuantity(prevQuantity => prevQuantity + 1);
      updateBikesAndPrice();
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
      updateBikesAndPrice();
    }
  };

  const increaseDays = () => setDays(prevDays => prevDays + 1);
  const decreaseDays = () => {
    if (days > 1) setDays(prevDays => prevDays - 1);
  };
  console.log(vehicleData);
  const handleDelete = async () => {
    try {
      await fetch(`${import.meta.env.VITE_SERVER}/client/cart/${userid}`, {
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
    <div className="bg-neutral-200 shadow-md shadow-neutral-400 my-2 rounded-md p-2 flex justify-between items-center w-full flex-col md:flex-row">
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
            className="bg-lime-600 shadow-md shadow-black text-white p-1 mt-2 rounded-md  hover:bg-lime-700"
          >
            Remove
          </button>
          <button
            onClick={update}
            className="bg-lime-600 shadow-md shadow-black text-white p-1 mt-2 rounded-md  hover:bg-lime-700"
          >
            Update
          </button>
        </div>

        <div>
          <p className="font-bold">Quantity</p>
          <div className="flex justify-center rounded-sm border-2 border-black">
            <button
              onClick={increaseQuantity}
              className="h-full w-6 bg-black text-white text-center hover:bg-lime-600"
            >
              +
            </button>
            <input
              type="number"
              min={1}
              max={5}
              value={quantity}
              onChange={(e) => {
                const newQuantity = Number(e.target.value);
                if (newQuantity >= 1 && newQuantity <= 5) {
                  setQuantity(newQuantity);
                }
              }}
              className="text-center w-8"
            />
            <button
              onClick={decreaseQuantity}
              className="h-full w-6 bg-black text-white text-center hover:bg-lime-600"
            >
              -
            </button>
          </div>
        </div>

        <div>
          <p className="font-bold">Start Date</p>
          <input
            type="date"
            value={stdate}
            onChange={(e) => setStdate(e.target.value)}
            className="text-center w-32 bg-neutral-200 border-2 border-black rounded-sm"
          />
        </div>
        
        <div>
          <p className="font-bold">Days</p>
          <div className="flex justify-center rounded-sm border-2 border-black">
            <button
              onClick={increaseDays}
              className="h-full w-6 bg-black text-white text-center hover:bg-lime-600"
            >
              +
            </button>
            <input
              type="number"
              min={1}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="text-center w-8 h-full bg-neutral-200  border-black"
            />
            <button
              onClick={decreaseDays}
              className="h-full w-6 bg-black text-white text-center hover:bg-lime-600"
            >
              -
            </button>
          </div>
        </div>
        <div className="flex flex-col items-end me-2">
          <p className="text-md font-bold">
            Total: {vehicleData.price * quantity*days}
          </p>
          <p className="flex font-semibold">
            Price per day:&nbsp;
            <span>{vehicleData.price} rs</span>
          </p>
        </div>
      </div>
    </div>
  ) : null;
};

export default CartItem;
