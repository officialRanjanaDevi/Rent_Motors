import React,{useEffect,useState} from "react";
import { red } from "@mui/material/colors";
import { useLocation } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
const view = () => {
  const location = useLocation()
  const { data } = location.state
  const [add, setAdd] = React.useState("Add to cart");
  const [liked, setLiked] = React.useState(false);
  const handleLikeClick = () => {
    setLiked(!liked);
  };
  const handleAddBtn = () => {
    setAdd("Added");
    setTimeout(() => setAdd("Add to cart"), 2000);
  };

  return (
    <div className="mt-16  h-fit p-3 flex md:flex-row flex-col-reverse ">
      <div className="w-full md:w-1/3 flex flex-col ">
      <img
              src="https://tse3.mm.bing.net/th?id=OIP.YJsJxpXBT0JxF4Y1SO2rqgHaD7&pid=Api&P=0&h=180"
              alt=""
              className=" w-full rounded-md  "
            />
            <img
              src="https://tse4.mm.bing.net/th?id=OIP.zapgajR6OL8TvcPhktWeAQHaEK&pid=Api&P=0&h=180"
              alt=""
              className=" w-full rounded-md mt-2"
            />
              <img
            src="https://tse4.mm.bing.net/th?id=OIP.PYG-v0wHCTHkZ7eNS4kIPQHaEK&pid=Api&P=0&h=180"
            alt=""
            className=" w-full rounded-md mt-2"
          />
      </div>
      <div
        className="h-fit bg-black mx-auto rounded-md text-xs sm:text-sm md:w-3/5 w-full mb-2"
        style={{ boxShadow: "inset -1px -1px 8px 2px rgb(100 100 100)" }}
      >
        <div className=" rounded-md overflow-hidden relative">
          <div className="absolute flex justify-center z-30 top-2 right-4">
            <div onClick={handleLikeClick}>
              <FavoriteIcon
                sx={{ fontSize: "2rem", color: liked ? red[600] : "white" }}
              />
            </div>
          </div>
          <img
            src="https://tse4.mm.bing.net/th?id=OIP.PYG-v0wHCTHkZ7eNS4kIPQHaEK&pid=Api&P=0&h=180"
            alt=""
            className=" w-full"
          />
          
        </div>
        <div className=" w-full  ml-2  p-4 text-white ">
          
            
              <p className="text-lg md:text-2xl font-bold mb-4">{data.name}</p>
            

            
      
          <div className="text-justify text-md">
          <p>< ArrowRightAltIcon/>
             { data.description}</p>
           <p>< ArrowRightAltIcon/> Product category: {data.category}</p>
            <p>< ArrowRightAltIcon/> <b>Price </b>Rs {data.price}</p>
            <p>< ArrowRightAltIcon/> <b>Discount: </b>{data.discount}%</p>
            <p>< ArrowRightAltIcon/> <b>Best for skintype:</b>{data.skintype}</p>
          </div>
         
          <div>
            <button
              className="w-full rounded-full bg-rose-300 py-2 mt-4 hover:font-bold hover:bg-rose-400 font-semibold"
              onClick={handleAddBtn}
              style={{
                backgroundColor: add === "Added" ? "rgb(251 113 133)" : "",
              }}
            >
              <AddShoppingCartIcon></AddShoppingCartIcon> {add}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default view;
