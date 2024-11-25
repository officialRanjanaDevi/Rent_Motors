import React, { useRef, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const AddVehicle = () => {
  const navigate = useNavigate();
  const userid=localStorage.getItem("userid");
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
  });
  const { vertical, horizontal, open, message ,severity} = state;

  const handleClick = (newState, msg,sev) => {
    setState({ ...newState, open: true, message: msg ,severity:sev});
    setTimeout(() => setState({ ...newState, open: false }), 1500);
    setTimeout(navigate("/updateProduct"), 1600);
  };

  const form = useRef();
  const [credentials, setCredentials] = useState({
    title: "",
    price: "",
    mileage: "",
    description: "",
    type: "",
    seater: "",
    speed: "",
    fuel: "",
    brand:""
  });
 const [images,setImages]=useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title" ,credentials.title);
    formData.append("brand" ,credentials.brand);
    formData.append("price" ,credentials.price);
    formData.append("type" ,credentials.type);
    formData.append("speed" ,credentials.speed);
    formData.append("mileage" ,credentials.mileage);
    formData.append("description" ,credentials.description);
    formData.append("seater" ,credentials.seater);
    formData.append("fuel" ,credentials.fuel);

    images.forEach((image, index) => {
      formData.append("images", image); 
    });
    try {
   
      const response =  await fetch(`${import.meta.env.VITE_SERVER}/renter/vehicle/${userid}`, {
        method: "POST",
        credentials: "include",
        body: formData
      });

      const res = await response.json();
      console.log(res);
      if (res.success) {
       
        handleClick(
          { vertical: "top", horizontal: "center" },
          "Vehicle added successfully",
          "success"
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
            brand:""
          });
        }, 1500);
     
      }
    } catch (error) {
      console.error("Error during product updation:", error);
      handleClick(
        { vertical: "top", horizontal: "center" },
        "Failed to add Vehicle !",
        "error"
      );
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  return (
    <div className="w-full h-full rounded-md bg-neutral-100 shadow-md overflow-y-scroll">
     <form
        ref={form}
        onSubmit={handleSubmit}
        className="bg-neutral-100 mx-auto w-[90vw] md:w-[70vw] p-6 rounded-lg"
      >
        <h1 className="text-center font-bold text-lg">Add new vehicle</h1>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            onChange={onChange}
            placeholder="Enter unique title for your vehicle"
            type="text"
            name="title"
            value={credentials.title}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
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
            rows={3}
            value={credentials.description}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>


        <div className="mb-4 grid md:grid-cols-2 gap-4">
          
        <div >
          <label
              htmlFor="images"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Upload images
            </label>
        <input
            type="file"
            multiple
            onChange={handleFileChange}
            required
            className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
          />
   <p className="text-xs text-red-600" >*Please upload exactly 3 files</p>

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


        <div className="mb-4 grid md:grid-cols-3 gap-4">
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
              htmlFor="brand"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Brand
            </label>
            <input
              onChange={onChange}
              placeholder="Enter brand "
              type="text"
              name="brand"
              value={credentials.brand}
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

        <div className="mb-4 grid md:grid-cols-3 gap-4">
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
      
        
       

        <button
          type="submit"
          className="bg-black text-white text-sm hover:bg-lime-600 font-bold py-2 px-12 rounded focus:outline-none focus:shadow-outline"
        >
          Add
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

export default AddVehicle;
