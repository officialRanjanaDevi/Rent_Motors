import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { red } from "@mui/material/colors";
import Alert from '@mui/material/Alert';
const ViewCard = (props) => {
  const vehicleData = props.data;
  const [add, setAdd] = useState("Add to cart");
  const [liked, setLiked] = useState(false);
 
    const handleLikeClick = async () => {
      setLiked((prevLiked) => !prevLiked);
      const response = await fetch("http://localhost:4000/api/client/wishlist", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id: vehicleData._id}),
       
      });
      const res=await response.json();
      if (res.success) {
        console.log(response.message);
      } else {
        setLiked((prevLiked) => !prevLiked);
      }
    };
  
  

  const handleAddBtn = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/client/cart`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: vehicleData._id, quantity: 1 }),
      });
      const response = await res.json();
      setAdd("Added");
      setTimeout(() => setAdd("Add to cart"), 3000);
    } catch (error) {
      console.error("Error loading vehicleData:", error);
      setAdd("Failed");
      setTimeout(() => setAdd("Add to cart"), 3000);
    }
  };

  return (
  <div className="mt-12"> 
 {add === "Added" && (
        <div className="flex justify-center">
          <Alert variant="filled" severity="success" className="mt-6 sm:w-1/2 w-2/3">
            Vehicle added to your cart successfully!
          </Alert>
        </div>
      )}
      {add === "Failed" && (
        <div className="flex justify-center">
          <Alert variant="filled" severity="error" className="mt-6 sm:w-1/2 w-2/3">
           Failed to add Vehicle in your cart!
          </Alert>
        </div>
      )}
    <div className=" p-3 flex md:flex-row flex-col">
       
        
      <div
        id="carouselExampleIndicators"
        className="carousel slide  md:w-2/3 w-full my-1"
        data-ride="carousel"
        style={{ maxHeight: "800px" }}
      >
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner rounded-md" style={{ maxHeight: "700px" }}>
          {vehicleData.images && vehicleData.images[1] && (
            <div className="carousel-item">
              <img src={vehicleData.images[1]} className="d-block w-100 h-full" alt="Other services" />
            </div>
          )}
          {vehicleData.images && vehicleData.images[2] && (
            <div className="carousel-item active">
              <img src={vehicleData.images[2]} className="d-block w-100 h-full" alt="Hair styling" />
            </div>
          )}
          {vehicleData.images && vehicleData.images[0] && (
            <div className="carousel-item">
              <img src={vehicleData.images[0]} className="d-block w-100" alt="Makeup" />
            </div>
          )}
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>

      <div className="md:w-1/3 my-1  w-full rounded-md bg-black ml-2 p-4 text-white relative flex flex-col justify-between">
        <p className="text-lg md:text-2xl font-bold mb-4">{vehicleData.title}</p>
        <div className="text-justify text-md">
          <p>
            <ArrowRightAltIcon /> {vehicleData.description}
          </p>
          <p>
            <ArrowRightAltIcon /> Product category: {vehicleData.brand}
          </p>
          <p>
            <ArrowRightAltIcon /> <b>Description: </b>
            {vehicleData.description}
          </p>
          <p>
            <ArrowRightAltIcon /> <b>Price:</b> {vehicleData.price}
          </p>
          <p>
            <ArrowRightAltIcon /> <b>Mileage: </b> {vehicleData.mileage}
          </p>
          <p>
            <ArrowRightAltIcon /> <b>Fuel: </b> {vehicleData.fuel}
          </p>
          <p>
            <ArrowRightAltIcon /> <b>Vehicle type:</b> {vehicleData.type}
          </p>
          <p>
            <ArrowRightAltIcon /> <b>Seater: </b> {vehicleData.seater}
          </p>
          <p>
            <ArrowRightAltIcon /> <b>Speed: </b> {vehicleData.speed}
          </p>
        </div>

        <div>
          <button
            className="w-full rounded-full bg-lime-600 py-2 mt-4 hover:font-bold hover:bg-lime-500 font-semibold"
            onClick={handleAddBtn}
            style={{
              backgroundColor: add === "Added" ? "rgb(101 163 13)" : "",
            }}
          >
            <AddShoppingCartIcon /> {add}
          </button>
        </div>
        <div className="absolute flex justify-center z-30 top-2 right-4">
          <div onClick={handleLikeClick}>
            <FavoriteIcon
              sx={{ fontSize: "2rem", color: liked ? red[600] : "white" }}
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ViewCard;
