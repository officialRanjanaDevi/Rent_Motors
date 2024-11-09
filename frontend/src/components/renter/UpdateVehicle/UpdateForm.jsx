import React, { useRef, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UpdateForm = (props) => {
  const navigate = useNavigate();
  const data = props.data;
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
  });
  const { vertical, horizontal, open, message,severity } = state;

  const handleClick = (newState, msg,sev) => {
    setState({ ...newState, open: true, message: msg ,severity:sev});
    setTimeout(() => setState({ ...newState, open: false }), 1500);
    setTimeout(navigate("/updateVehicle"), 1600);
  };

  const form = useRef();
  const [credentials, setCredentials] = useState({
    title: data.title,
    price: data.price,
    mileage: data.mileage,
    description: data.description,
    type: data.type,
    seater: data.seater,
    speed: data.speed,
    fuel: data.fuel,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response =  await fetch(`http://localhost:4000/api/renter/vehicle`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: data._id,
          title: credentials.title,
          price: credentials.price,
          mileage: credentials.mileage,
          description: credentials.description,
          type: credentials.type,
          seater: credentials.seater,
          speed: credentials.speed,
          fuel: credentials.fuel,
        }),
      });

      const res = await response.json();

      if (res.success) {
       
        handleClick(
          { vertical: "top", horizontal: "center" },
          "Vehicle updated successfully","success"
        );
        setTimeout(() => {
          setCredentials({
            title: "",
            price: "",
            mileage: "",
            description: "",
            type: "",
            seater: "",
            speed: "",
            fuel: "",
          });
        }, 1500);
     
      }
    } catch (error) {
      console.error("Error during product updation:", error);
      handleClick(
        { vertical: "top", horizontal: "center" },
        "Failed to update Vehicle","error"
      );
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form
        ref={form}
        onSubmit={handleSubmit}
        className="bg-neutral-100 mx-auto w-[90vw] md:w-[70vw] p-6 rounded-lg"
      >
        <h1 className="text-center font-bold text-lg">Update Vehicle</h1>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            onChange={onChange}
            placeholder="Enter name of Product"
            type="text"
            name="title"
            value={credentials.title}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-x-4">
          <div>
            <label
              htmlFor="price"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Price
            </label>
            <input
              onChange={onChange}
              placeholder="Enter price in Rupees"
              type="number"
              name="price"
              value={credentials.price}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div>
            <label
              htmlFor="type"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Choose a category:
            </label>
            <select
              name="type"
              onChange={onChange}
              value={credentials.type}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select category</option>
              <option value="Scooter">Scooter</option>
              <option value="Crusier">Crusier</option>
              <option value="Off-Road">Off-Road</option>
              <option value="Touring">Touring</option>
              <option value="Sports Bike">Sports Bike</option>
              <option value="Standard">Standard</option>
            </select>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-x-4">
          <div>
            <label
              htmlFor="mileage"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Mileage
            </label>
            <input
              onChange={onChange}
              placeholder="Enter mileage in Kmph"
              type="number"
              name="mileage"
              value={credentials.mileage}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div>
            <label
              htmlFor="seater"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Number of seats
            </label>
            <select
              name="seater"
              required
              onChange={onChange}
              value={credentials.seater}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a seater type</option>
              <option value="One-seater">One Seater</option>
              <option value="Two-seater">Two Seater</option>
            </select>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-x-4">
          <div>
            <label
              htmlFor="speed"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Speed
            </label>
            <input
              onChange={onChange}
              placeholder="Enter speed in Kmph"
              type="number"
              name="speed"
              value={credentials.speed}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div>
            <label
              htmlFor="fuel"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Fuel type:
            </label>
            <select
              name="fuel"
              required
              onChange={onChange}
              value={credentials.fuel}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a fuel type</option>
              <option value="Petrol">Petrol</option>
              <option value="Electricity">Electricity</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <textarea
            onChange={onChange}
            placeholder="Enter description for Vehicle"
            name="description"
            rows={4}
            value={credentials.description}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white text-sm hover:bg-lime-600 font-bold py-2 px-12 rounded focus:outline-none focus:shadow-outline"
        >
          Update
        </button>

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          sx={{ width: "20rem" }}
          key={vertical + horizontal}
        >
          <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      </form>
    </div>
  );
};

export default UpdateForm;
