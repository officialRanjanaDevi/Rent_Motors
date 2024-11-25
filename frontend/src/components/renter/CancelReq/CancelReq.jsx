import React,{useEffect, useState} from 'react'
import CancelItem from './CancelItem'

const CancelReq = () => {
  const [orderData, setOrderData] = useState([]);
  const userid=localStorage.getItem("userid");
  const loadData = async () => {
    try {
      const status="CancelReq";
      let res = await fetch(`${import.meta.env.VITE_SERVER}/renter/order/${status}/${userid}`, {
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
    <h2 className='text-xl font-bold text-center'>Cancel Requests</h2>
    <div className='sm:overflow-auto sm:h-[95%] px-3'>
       {orderData.length > 0 ? (
          orderData.map((data, index) => <CancelItem key={index} data={data} reload={reload}/>)
        ) : (
          <p className='text-center font-bold mt-4'>No new cancel request</p>
        )}
    
    </div>
    
  </div>
  )
}

export default CancelReq
