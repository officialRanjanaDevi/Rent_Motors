import React, { useEffect, useState } from "react";
import { red } from "@mui/material/colors";
import { useLocation } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const View = () => {
  const location = useLocation();
  const id = location.state;

  const [add, setAdd] = useState("Add to cart");
  const [liked, setLiked] = useState(false);
  const [vehicleData, setVehicleData] = useState(null);

  const loadData = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/client/viewVehicle/${id}`,
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

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  const handleAddBtn = () => {
    setAdd("Added");
    setTimeout(() => setAdd("Add to cart"), 2000);
  };

  return (
    <div >
      {vehicleData && (
        <>
        <div className="mt-6  p-3 flex md:flex-row flex-col">
          <div
            id="carouselExampleIndicators"
            className="carousel slide mt-12  md:w-2/3 w-full"
            data-ride="carousel"
            style={{ maxHeight: "700px" }}
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                className="active"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="1"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="2"
              ></li>
            </ol>
            <div className="carousel-inner rounded-md" style={{ maxHeight: "600px" }}>
              <div className="carousel-item">
                <img
                  src={vehicleData.images[1]}
                  className="d-block w-100 h-full"
                  alt="Other services"
                />{" "}
               
              </div>
              <div className="carousel-item active">
                <img
                  src={vehicleData.images[2]}
                  className="d-block w-100 h-full"
                  alt="Hair styling"
                />
                
              </div>
              <div className="carousel-item">
                <img
                  src={vehicleData.images[0]}
                  className="d-block w-100"
                  alt="Makeup"
                />
              
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>

          <div className="md:w-1/3 w-full rounded-md mt-12 bg-black ml-2 p-4 text-white relative flex flex-col justify-between">
            <p className="text-lg md:text-2xl font-bold mb-4">
              {vehicleData.title}
            </p>
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
                  backgroundColor: add === "Added" ? "rgb(251 113 133)" : "",
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
          <div className="text-black bg-red-500">
            reviews
          </div>
        </>
      )}
    </div>
  );
};

export default View;
