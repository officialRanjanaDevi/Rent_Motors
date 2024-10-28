import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { jwtDecode } from "jwt-decode";

export default function Wishlist(props) {
  const data = props.data;
  const [liked, setLiked] = React.useState(true);
  const [add, setAdd] = React.useState("Add to cart");

//find by product id 
const [productData, setProductData] = useState({});
const productId=props.data.product;
const loadData = async () => {
  try {
    const res = await fetch(`http://localhost:3000/product/show/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const response = await res.json();
  
    setProductData(response);
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

useEffect(() => {
  loadData();
}, []);

  //adding to wishlist using heart switch
  const handleLikeClick = async() => {
    setLiked(!liked);
    try {
      const token = localStorage.getItem("authToken");
      const decoded = jwtDecode(token);
      const userId = decoded.user.id;
      
      const response = await fetch("http://localhost:3000/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          productId: productData._id,
        }),
      });

      const json = await response.json();
       
      if (json.message) {
        console.log(json.message);
      }else{
        setLiked(!liked);
        console.log(json.message);
      }
    } catch (error) {
      console.error("Error in updating it to wishlist", error);
    }
 
  };

  //adding to cart using add btn
  const handleAddBtn = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const decoded = jwtDecode(token);
      const userId = decoded.user.id;
      
      const response = await fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          productId: productData._id,
          quantity: 2
        }),
      });

      const json = await response.json();
       
      if (json.message) {
        setAdd("Added");
       
        setTimeout(() => setAdd("Add to cart"), 800);
        setTimeout(() =>  handleLikeClick(), 800);
      }else{
        console.log(json.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <Card
      sx={{
        display:liked?"":"none",
        maxWidth: "400px",
        minHeight: "400px",
        margin: ".5rem",
        borderRadius: "15px",
        boxShadow: "inset 0px 1px 6px 1px rgb(220 220 220)",
      }}
      className="relative z-10 group bg-neutral-200 border-2 border-neutral-300"
     
    >
      <div className="absolute flex justify-center z-30 top-2 right-0 ">
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
            image={
              "https://tse2.mm.bing.net/th?id=OIP.gliyjHYjQD6TFPEaSmZ0rQHaEo&pid=Api&P=0&h=180"
            }
            alt={"Bike"}
            sx={{ maxHeight: "600px", borderRadius: "15px" }}
            className="h-full group-hover:scale-95 transition-transform duration-1000 ease-in-out "
          />
        </div>
      </Link>
      <CardContent className="pt-1" sx={{ borderRadius: "15px" }}>
        <div className="">
          <h1 className="font-bold text-md">{productData.name}</h1>

          <p>{productData.description}</p>
        </div>
        <div className="flex justify-between">
          <p>
            <b>price:</b> {productData.price} Rs
          </p>
          <p>
            <b>discount:</b> {productData.discount} Rs
          </p>
        </div>

        <div className=" border-0 absolute w-full left-0 -bottom-8 duration-500 group-hover:-translate-y-12 text-center ">
          <div
            className="border-0 boder-black absolute -z-10  w-full h-16 opacity-0 duration-500 group-hover:opacity-100 group-hover:bg-black"
            style={{
              backgroundColor: add === "Added" ? "rgb(253 164 175)" : "black",
            }}
          ></div>

          <p
            onClick={handleAddBtn}
            className=" w-full hover:scale-105 duration-300 ease-in-out text-white font-bold pt-2"
          >
            {add}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
