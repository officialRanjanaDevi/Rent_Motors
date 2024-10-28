import React, { useState, useEffect } from "react";
import "./CartItem.css";
import { jwtDecode } from "jwt-decode";

const CartItem = (props) => {
  const data = props.data;

  // Find by product id
  const [productData, setProductData] = useState({});
  const [isdeleted, setIsdeleted] = useState(false);
  const [quantity, setQuantity] = useState(data.quantity || 1);
  
  const productId = data.product;
  const token = localStorage.getItem("authToken");
  const decoded = jwtDecode(token);
  const userId = decoded.user.id.toString();

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

  //quantity updation code
  const updateQuantity = async (newQuantity) => {
    try {
      await fetch(`http://localhost:3000/cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          productId: productId,
          quantity: newQuantity,  
        }),
      });
    } catch (error) {
      console.error("Error while updating quantity:", error);
    }
  };
  const increase = () => {
    if (quantity < 5) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      updateQuantity(newQuantity);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(newQuantity);
    }
  };


  //remove from cart
  const handleDelete=async()=>{
    try {
      await fetch(`http://localhost:3000/cart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          productId: productId,
          
        }),
      });
      setIsdeleted(true);
    } catch (error) {
      console.error("Error while deleting:", error);
    }
  }
  return (
    <div className="bg-neutral-200 my-2 rounded-md p-2 flex justify-between items-center relative w-full flex-col md:flex-row" style={{display:isdeleted?"none":""}} >
      <img
        src="https://tse1.mm.bing.net/th?id=OIP.aX118E5H8MxKx0iM7fDpEQHaE8&pid=Api&P=0&h=180"
        alt="Product Image"
        className="rounded-md"
      />

      <div className="flex justify-between flex-wrap w-full md:basis-4/6 px-2">
        <div className="flex flex-col justify-start">
          <h2 className="font-bold">{productData.name}</h2>
          <p>{productData.description }</p>
          <button onClick={handleDelete} className="bg-black text-white p-1 mt-2 rounded-md w-1/2 hover:bg-neutral-700">
            Remove
          </button>
        </div>

        <div>
          <p>Quantity</p>
          <div className="flex justify-center rounded-sm border-2 border-black">
            <div
              onClick={increase}
              className="h-full w-6 bg-black text-white text-center hover:bg-rose-300"
            >
              +
            </div>
            <input
              type="number"
              min={1}
              max={5}
              value={quantity} // Bound to quantity state
              onChange={(e) => {
                const newQuantity = Number(e.target.value);
                if (newQuantity >= 1 && newQuantity <= 5) {
                  setQuantity(newQuantity);
                  updateQuantity(newQuantity);
                }
              }}
              className="text-center w-8"
            />
            <div
              onClick={decrease}
              className="h-full w-6 bg-black text-white text-center hover:bg-rose-300"
            >
              -
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end me-2">
          <p className="text-md font-bold ">Total: {data.price}rs</p>
          <p className="flex font-semibold">
            Price:&nbsp; 
            <span className="line-through text-red-500">{data.price}</span>
          </p>
          <p className="text-green-700">saved: 200rs</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
