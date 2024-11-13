import React, { useEffect, useState } from 'react';
import OrderItem from './OrderItem';

const AcceptedOrder = () => {
  const [orderData, setOrderData] = useState([]);
  const [status, setStatus] = useState("Accepted");

  const loadData = async () => {
    try {
      console.log(status);
      let res = await fetch(`http://localhost:4000/api/renter/order/${status}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let response = await res.json();
      setOrderData(response.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, [status]);

  const reload = async () => {
    loadData();
  };

  const handleClick = (action) => {
    setStatus(action);
  };

  return (
    <div className='h-full'>
      <div className='flex justify-center'>
        <button
          onClick={() => handleClick("Accepted")}
          className={`text-lg font-bold text-center border-2 border-lime-600 p-2 rounded-md mx-2 
            ${status === "Accepted" ? "bg-lime-600 text-white" : "hover:bg-lime-600 hover:text-white"}`}
        >
          Accepted Orders
        </button>

        <button
          onClick={() => handleClick("Delivered")}
          className={`text-lg font-bold text-center border-2 border-lime-600 p-2 rounded-md mx-2 
            ${status === "Delivered" ? "bg-lime-600 text-white" : "hover:bg-lime-600 hover:text-white"}`}
        >
          Delivered Orders
        </button>
      </div>

      <div className='sm:overflow-auto sm:h-[95%] px-3'>
        {orderData.length > 0 ? (
          orderData.map((data, index) => <OrderItem key={index} data={data} reload={reload} />)
        ) : (
          <p className='text-center font-bold mt-4'>No orders available</p>
        )}
      </div>
    </div>
  );
};

export default AcceptedOrder;
