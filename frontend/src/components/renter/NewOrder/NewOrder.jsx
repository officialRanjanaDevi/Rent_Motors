import React,{useEffect, useState} from 'react'
import OrderItem from './OrderItem'

const NewOrder = () => {
  const [orderData, setOrderData] = useState([]);
  const loadData = async () => {
    try {
      const status="Placed";
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
  const reload=async()=>{
    loadData();
 }
  
  return (
    <div className='h-full'>
    <h2 className='text-xl font-bold text-center'>New Orders</h2>
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

export default NewOrder
