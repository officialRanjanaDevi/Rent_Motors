import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Cookies from "js-cookie";
import { red } from "@mui/material/colors";

export default function Wishlist(props) {
  const data = props.data;
  const [liked, setLiked] = useState(true);
  const [add, setAdd] = useState("Add to cart");
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(false);
  const accessToken = Cookies.get("accessToken");
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/client/viewVehicle/${data.vehicle}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      setProductData(response.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const removeFromWishlist = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/client/wishlist`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: data._id }),
      });
      await res.json();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const handleLikeClick = async () => {
    try {
      await removeFromWishlist();
      setLiked(!liked);
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  const handleAddBtn = async () => {
    setLoading(true);
    if (!accessToken) {
      navigate("/login");
      return;
    }
    try {
      const res = await fetch(`http://localhost:4000/api/client/cart`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: productData._id, quantity: 1 }),
      });
      await res.json();
      setAdd("Added");
      setTimeout(() => setAdd("Add to cart"), 3000);
      await removeFromWishlist();
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <Card
      sx={{
        display: liked ? "" : "none",
        maxWidth: "400px",
        minHeight: "400px",
        margin: ".5rem",
        borderRadius: "15px",
        boxShadow: "inset 0px 1px 6px 1px rgb(220 220 220)",
      }}
      className="relative z-10 group bg-neutral-200 border-2 border-neutral-300"
    >
      <div className="absolute flex justify-center z-30 top-2 right-0">
        <div
          onClick={handleLikeClick}
          className="p-2"
          aria-label="add to favorites"
        >
          <FavoriteIcon sx={{ color: liked ? red[600] : "white" }} />
        </div>
      </div>
      <Link to="/view" className="hover:text-black">
        <div className="overflow-hidden h-3/4 p-1">
          <CardMedia
            component="img"
            image={productData.images?.[0]}
            alt="Bike"
            sx={{ maxHeight: "600px", borderRadius: "15px" }}
            className="h-full group-hover:scale-95 transition-transform duration-1000 ease-in-out"
          />
        </div>
      </Link>
      <CardContent className="pt-1" sx={{ borderRadius: "15px" }}>
        <h1 className="font-bold text-md">{productData.title}</h1>
        <p>{productData.brand}</p>
        <p>{productData.description}</p>
        <div className="flex justify-between">
          <p><b>Price:</b> {productData.price} Rs</p>
          <p><b>Mileage:</b> {productData.mileage} Km/ltr</p>
        </div>
        <div className="border-0 absolute w-full left-0 -bottom-8 duration-500 group-hover:-translate-y-12 text-center">
          <div
            className="border-0 boder-black absolute -z-10  w-full h-12 opacity-0 duration-500 group-hover:opacity-100"
            style={{
              backgroundColor: add === "Added" ? "rgb(101 163 13)" : "black",
            }}
          ></div>
          <p
            onClick={loading ? null : handleAddBtn}
            className="w-full hover:scale-105 duration-300 ease-in-out text-white font-bold pt-2"
          >
            {loading ? "Loading..." : add}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
