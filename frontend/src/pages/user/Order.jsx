import React, { useState, useEffect } from 'react';
import OrderItem from '../../components/user/OrderItem/OrderItem';

const Order = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const loadData = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/client/order", {
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
    <div className="p-4 mt-16">
    
      <h2 className="text-xl font-bold text-center">My Orders</h2>
      {orderData.length > 0 ? (
        orderData.map((data, index) => (
          <OrderItem
            key={index}
            data={data}
           
          />
        ))
      ) : (
        <h1 className="font-bold text-xl text-center">No orders placed</h1>
      )}
    </div>
  );
};

export default Order;
