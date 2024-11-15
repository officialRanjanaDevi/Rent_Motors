import React, { useState, useEffect } from 'react';
import OrderItem from '../../components/user/OrderItem/OrderItem';
import { images } from '../../assets/images';
const Order = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const loadData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER}/client/order`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const response = await res.json();
      
      if (response.data.length > 0) {
        const order = response.data; 
        setOrderData(order)
        
      } 
    } catch (error) {
      setError("Error loading data: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; }

  return (
    <div className="p-4 mt-16 ">
    
      <h2 className="text-xl font-bold text-center">My Orders</h2>
      {orderData.length > 0 ? (
        orderData.map((data, index) => (
          <OrderItem
            key={index}
            data={data}
           
          />
        ))
      ) : (
        <div className='font-semibold text-sm text-neutral-400 mt-4 h-[40vh] flex flex-col items-center w-full'>
          
        <img src={images.ordernow} className='h-[20vh]'></img>
        <p>
         Order Now
        </p>
      
        </div>)}
    </div>
  );
};

export default Order;
