import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Fix import
import OrderItem from '../../components/user/OrderItem/OrderItem';

const Order = () => {
  const [productData, setProductData] = useState([]);
  const [orderStatus, setOrderStatus] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [expectedDelivery, setExpectedDelivery] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("User is not authenticated.");
      setLoading(false);
      return;
    }

    const decoded = jwtDecode(token);
    const userId = decoded.user.id.toString();

    const loadData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/order/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch order data.");
        }

        const response = await res.json();
        if (response.length > 0) {
          const order = response[0]; // Assuming you're using the first order for simplicity
          setOrderStatus(order.orderStatus);
          setOrderDate(order.orderDate);
          setExpectedDelivery(order.deliveryDate);
          setProductData(order.items);
        } else {
          setProductData([]); // No orders found
        }
      } catch (error) {
        setError("Error loading data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  return (
    <div className="p-4 mt-16">
      <h2 className="text-xl font-bold text-center">My Orders</h2>
      {productData.length > 0 ? (
        productData.map((data, index) => (
          <OrderItem
            key={index}
            data={data}
            status={orderStatus}
            orderDate={orderDate}
            expectedDelivery={expectedDelivery}
          />
        ))
      ) : (
        <h1 className="font-bold text-xl text-center">No orders placed</h1>
      )}
    </div>
  );
};

export default Order;
