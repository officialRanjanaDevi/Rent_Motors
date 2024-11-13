import React, { useState, useEffect } from "react";
import CartItem from "../../components/user/CartItem/CartItem";
import { images } from "../../assets/images";
const Cart = () => {
  const [productData, setProductData] = useState([]);
  const [user, setUser] = useState({ address: "", contact: "" });
  const [bikes, setBikes] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [status,setStatus]=useState("");

  const loadUserData = async () => {
    try {
      const user=await fetch ("http://localhost:4000/api/auth/getCurrentUser",{
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (user.ok) {
        const response = await user.json();
        const userData=response.data;
        setUser({address:userData.address,contact:userData.contact});       
      }
       } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  const loadData = async () => {
    try {
           const res = await fetch(`http://localhost:4000/api/client/cart`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const response = await res.json();
        setProductData(response.data || []);
      } else {
        setTotalPrice(0);
        setProductData([]);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

 
  useEffect(() => {
    loadUserData();
    loadData();
  }, []);

 
  useEffect(() => {
    updateBikesAndPrice();
  }, [productData]);

  const updateBikesAndPrice = () => {
    loadData();
    const totalBikes = productData.reduce((acc, item) => acc + (item.quantity || 1), 0);
   
    const totalAmount = productData.reduce((acc, item) => {
      return acc + (item.price);
    }, 0);
    
    setBikes(totalBikes);
    setTotalPrice(totalAmount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/auth/updateProfile", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
      const response = await fetch("http://localhost:4000/api/client/order", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      if (response.ok) {
         setStatus("success");
         setTimeout(() => {
          setStatus("");
         }, 2000);

      } else {
        console.error("Failed to place order:", json);
        setStatus("failure");
        setTimeout(() => {
          setStatus("");
         }, 2000);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setStatus("failure");
      setTimeout(() => {
        setStatus("");
       }, 2000);
    }
  };

  return (
    <>
      {/* Success Alert */}
      <div
        className="text-center mt-16 alert bg-lime-600 w-1/2 mx-auto text-white rounded-md"
        role="alert"
        style={{ display: status=="success" ? "" : "none" }}
      >
        <h1 className="font-bold">Order placed suucessfully</h1>
      </div>

      {/* Failed Alert */}
      <div
        className="text-center mt-16 alert bg-neutral-200 w-1/2 mx-auto text-black rounded-md"
        role="alert"
        style={{ display: status=="failure"? "" : "none" }}
      >
        <h1 className="font-bold">Oops,failed to place order ,please try again</h1>
      
      </div>
  
    <div className="mt-16 p-4 flex justify-between xl:justify-around flex-wrap">
    
      <div className="w-full lg:w-[73%]">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">My Cart</h1>
          <b>Total Amount: {totalPrice} rs</b>
        </div>
        <div>
        
          {productData.length > 0 ? (
            productData.map((data, index) => (
              <CartItem key={index} data={data} updateBikesAndPrice={updateBikesAndPrice} />
            ))
          ) : (
            <div className='font-semibold text-sm text-neutral-400 mt-4 flex flex-col items-center w-full'>
              
            <img src={images.emptycart} className='h-[20vh]'></img>
            <p>
            Your cart is empty
            </p>
          
            </div>)}
        </div>
      </div>

      <div className="w-full lg:w-1/4">
        <h1 className="font-bold text-center text-xl mb-2">Delivery Details</h1>
        <div className="w-full bg-neutral-200 shadow-md shadow-neutral-400 px-2 py-2 rounded-md mb-3">
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
                placeholder={user.address}
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
                placeholder={user.contact}
              />
              <button type="submit" className="w-full bg-lime-600 shadow-md shadow-black font-bold text-white px-3 py-1 rounded-md mt-2">
                Update
              </button>
            </form>
          </div>
        </div>

        <div className="w-full bg-neutral-200 shadow-md shadow-neutral-400 p-4 rounded-md">
          <h1 className="text-lg font-bold">Payment Summary</h1>
          <ul className="my-4">
            <li className="flex justify-between my-2">
              <p>Bikes</p>
              <p>{bikes}</p>
            </li>
            <li className="flex justify-between my-2">
              <p>Total Price</p>
              <p>{totalPrice}</p>
            </li>
            <hr />
            <li className="flex justify-between my-2">
              <p>Delivery Charge</p>
              <p>free</p>
            </li>
            <hr />
            <li className="flex justify-between my-2">
              <p className="font-bold">Total</p>
              <p>{totalPrice}*{}</p>
            </li>
          </ul>

          <button onClick={placeOrder} className="w-full shadow-md font-bold shadow-black bg-lime-600 text-white py-2 rounded-md">
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Cart;
