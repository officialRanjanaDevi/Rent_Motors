import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Snackbar, Alert } from "@mui/material";
import "./OrderItem.css"
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
};

const OrderItem = ({ data }) => {
  const [state, setState] = useState({
    openAlert: false,
    vertical: "top",
    horizontal: "center",
    message: "",
  });
  const { vertical, horizontal, openAlert, message ,severity} = state;

  const handleClick = (newState, msg,sev) => {
    setState({ ...newState, openAlert: true, message: msg , severity:sev});
    setTimeout(() => setState({ ...newState, openAlert: false }), 1500);
    setTimeout(()=>  handleClose(),1500)
   };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [vehicleData, setVehicleData] = useState({});
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [review,setReview]=useState({rating:4,comment:""});
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res=await fetch("http://localhost:4000/api/client/review", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id:vehicleData._id,rating:review.rating,comment:review.comment}),
      });
      const response=await res.json();
      if(response.success){
        handleClick(
          { vertical: "top", horizontal: "center" },
          "Review Added","success"
        );
      
      }
    } catch (error) {
      console.error("Error posting review:", error);
      handleClick(
        { vertical: "top", horizontal: "center" },
        "Failed to post review","error"
      );
    }
    
  };

  const onChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-neutral-100 shadow-md shadow-neutral-400 my-3 rounded-md p-2 w-full lg:w-5/6 mx-auto ">
      <p className="text-center text-xs font-bold text-neutral-500">Order ID: {data._id}</p>
      <div className="flex justify-around items-center flex-col md:flex-row">
      <img
        src={vehicleData.images[0] || "https://via.placeholder.com/150"} 
        alt={vehicleData.title || "Product image"} 
        className="rounded-md h-52 w-40 shadow-md shadow-black"
      />
      <div className="grid lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-1 w-full md:basis-5/6 px-2">
        <div className="flex flex-col text-sm">
          <h2 className="font-bold">{vehicleData.title}</h2>
          <p><b>Brand: </b> {vehicleData.brand}</p>
          <p><b>Speed: </b> {vehicleData.speed} KMPH</p>
          <p><b>Mileage: </b> {vehicleData.mileage} KMPL</p>
          <p><b>Price: </b> {vehicleData.price} rs</p>
        </div>
        <div className="flex flex-col items-center me-2 text-sm">
          <p ><b>Total: </b>{data.price || "N/A"}rs</p>
          <p ><b>Days: </b>{data.days || "N/A"}</p>
          <p ><b>Quantity: </b>{data.quantity || "N/A"}</p>
        </div>
        <div className="text-center mx-1">
          <h2 className="font-bold text-sm">Start Date</h2>
          <p className="p-1 bg-neutral-300 shadow-md shadow-neutral-400 rounded-md text-center mt-1  mx-auto">
            {data.startdate.substring(0,10) || "N/A"}
          </p>
        </div>
        <div className="text-center mx-1">
          <h2 className="font-bold text-sm">Delivery Status</h2>
          <p className="p-1 bg-neutral-300 shadow-md shadow-neutral-400 rounded-md text-center mt-1  mx-auto">
            {data.status || "Pending"}
          </p>
        </div>
        {data.status==="Placed"||data.status==="Accepted"? <button onClick={handlecancel} className="bg-black shadow-md shadow-neutral-600 mx-1 text-white mt-4 rounded-md max-h-8 hover:bg-neutral-700" >
          Cancel
        </button>:""}
        {data.status==="Placed"||data.status==="Accepted"? <button onClick={handleOpen} className="bg-lime-600 shadow-md shadow-neutral-600 mx-1 text-white mt-4 rounded-md max-h-8 hover:bg-lime-700" >
          Add Review
        </button>:""}
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-md">
         
            <p className="text-center font-bold">Add your review</p>
            <form
        onSubmit={handleSubmit}
       
      >

       <div className="rating w-full mx-auto flex  justify-center">
  <input type="radio" id="star5" name="rating" value="5"/>
  <label htmlFor="star5"></label>
  <input type="radio" id="star4" name="rating" value="4"/>
  <label htmlFor="star4"></label>
  <input type="radio" id="star3" name="rating" value="3"/>
  <label htmlFor="star3"></label>
  <input type="radio" id="star2" name="rating" value="2"/>
  <label htmlFor="star2"></label>
  <input type="radio" id="star1" name="rating" value="1"/>
  <label htmlFor="star1"></label>
        </div>

        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Comment
          </label>
          <input
            name="comment"
            onChange={onChange}
            placeholder="Enter your comment"
            type="text"
            value={review.comment}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex flex-col items-center justify-between">
          <button
            type="submit"
            className="bg-lime-600 text-white text-sm hover:bg-lime-700 font-bold py-2 px-12 rounded focus:outline-none focus:shadow-outline"
          >
            Post
          </button>
        
        </div>
      </form>
          
        </Box>
      </Modal>
      <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={openAlert}
          sx={{ width: "20rem" }}
          key={vertical + horizontal}
        >
          <Alert  severity={severity}  variant="filled" sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      </div>
      </div>
    
    </div>
  );
};

export default OrderItem;
