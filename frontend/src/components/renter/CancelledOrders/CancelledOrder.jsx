import React,{useEffect, useState} from 'react'
import OrderItem from './OrderItem'
import { Order } from '../../../../../backend/src/models/Order.model';
const CancelledOrder = () => {
  const [orderData, setOrderData] = useState([]);
  const loadData = async () => {
    try {
      const status="Accepted";
      let res = await fetch(`${import.meta.env.VITE_SERVER}/renter/order/${status}`, {
        method: "GET",
        credentials:"include",
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
  }, []);
  const reload=async()=>{
    loadData();
 }
  
  return (
    <div className='h-full'>
    <h2 className='text-xl font-bold text-center'>Cancelled Orders</h2>
    <div className='sm:overflow-auto sm:h-[95%] px-3'>
       {orderData.length > 0 ? (
          orderData.map((data, index) => <OrderItem key={index} data={data} reload={reload}/>)
        ) : (
          <p className='text-center font-bold mt-4'>No orders available</p>
        )}
    
    </div>
    
  </div>
  )
}

export default CancelledOrder