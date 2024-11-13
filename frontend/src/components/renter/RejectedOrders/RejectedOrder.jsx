import React,{useEffect, useState} from 'react'
import RejectedItem from './RejectedItem'
import { Order } from '../../../../../backend/src/models/Order.model';
const RejectedOrder = () => {
  const [orderData, setOrderData] = useState([]);
  const loadData = async () => {
    try {
      const status="Rejected";
      let res = await fetch(`http://localhost:4000/api/renter/order/${status}`, {
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
  
  
  return (
    <div className='h-full'>
    <h2 className='text-xl font-bold text-center'>Rejected Orders</h2>
    <div className='sm:overflow-auto sm:h-[95%] px-3'>
       {orderData.length > 0 ? (
          orderData.map((data, index) => <RejectedItem key={index} data={data} />)
        ) : (
          <p className='text-center font-bold mt-4'>No orders available</p>
        )}
    
    </div>
    
  </div>
  )
}

export default RejectedOrder
