import React, { useState, useEffect } from "react";
import CartItem from "../../components/user/CartItem/CartItem";
import { jwtDecode } from "jwt-decode";

const Cart = () => {
  console.log("cart")


  const [productData, setProductData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState({ address: "", contact: "" });
  
  const loadData = async () => {
    try {
      const res = await fetch(`http://localhost:3000/cart/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(!res){
        setTotalPrice(0);
        setProductData([]);
      }
      const response = await res.json();
      setTotalPrice(response[0].totalPrice);
      setProductData(response[0].items);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/updateUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          address: user.address,
          contact: user.contact,
        }),
      });

      const json = await response.json();
      if (response.ok) {
        console.log("User updated successfully:", json);
      } else {
        console.error("Failed to update user:", json);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
   
    try {
      const response = await fetch("http://localhost:3000/order", {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userId,
          items: productData,  
        })
      });

      const json = await response.json();
      if (response.ok) {
        console.log("Order placed successfully:", json);
      
      } else {
        console.error("Failed to place order:", json);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  
  return (
    <div className="mt-16 p-4 flex justify-between xl:justify-around flex-wrap">
      <div className="w-full lg:w-[73%]">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">My Cart</h1>
          <b>total amount : {totalPrice} rs</b>
        </div>
        <div>
          {productData.length > 0 ? (
            productData.map((data, index) => (
              <CartItem key={index} data={data} />
            ))
          ) : (
            <h1 className="font-bold text-xl text-center">
              Your cart is Empty
            </h1>
          )}
        </div>
      </div>

      <div className="w-full lg:w-1/4">
        <h1 className="font-bold text-center text-xl mb-2">Delivery Details</h1>
        <div className="w-full bg-neutral-200 px-2 py-2 rounded-md mb-3">
          <div className="bg-neutral-100 p-4 rounded-md">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label htmlFor="address" className="text-black font-bold">
                Enter delivery address
              </label>
              <input
                type="text"
                name="address" 
                className="py-2 px-2 rounded-md border-2 border-neutral-200"
                required
                onChange={onChange}
                value={user.address}  
                placeholder="h-20 sector-10 delhi"
              />
              <label htmlFor="contact" className="text-black font-bold">
                Enter contact
              </label>
              <input
                type="number"
                name="contact"  
                className="py-2 px-2 rounded-md border-2 border-neutral-200"
                required
                onChange={onChange}
                value={user.contact} 
                placeholder="9800000001"
              />
              <button
                type="submit"  
                className="w-full bg-black text-white px-3 py-1 rounded-md mt-2"
              >
                Update
              </button>
            </form>
          </div>
        </div>

        <div className="w-full bg-neutral-200 p-4 rounded-md">
          <h1 className="text-lg font-bold">Payment Summary</h1>
          <ul className="my-4">
            <li className="flex justify-between my-2">
              <p>Total</p>
              <p>{totalPrice}</p>
            </li>
            <hr />
            <li className="flex justify-between my-2">
              <p>Discount</p>
              <p>10%</p>
            </li>
            <hr />
            <li className="flex justify-between my-2">
              <p>Delivery Charge</p>
              <p>free</p>
            </li>
            <hr />
            <li className="flex justify-between my-2">
              <p className="font-bold">Total</p>
              <p>{totalPrice - totalPrice / 10}</p>
            </li>
          </ul>

          <button onClick={placeOrder} className="w-full bg-black text-white py-2 rounded-md">
            Proceed to pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
