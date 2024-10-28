import React,{useState} from 'react'
import OrderItem from './OrderItem'
const NewOrder = () => {
  const [orderData, setOrderData] = useState([]);
  const loadData = async () => {
    try {
      const status="P";
      let res = await fetch(`http://localhost:3000/product/${category}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let response = await res.json();
      setProductData(response);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  return (
    <div className='h-full'>
    <h2 className='text-xl font-bold text-center'>New Orders</h2>
    <div className='sm:overflow-auto sm:h-[95%]'>
    {Array.from({ length: 8 }).map((_, index) => <OrderItem key={index} />)}
    </div>
    
  </div>
  )
}

export default NewOrder
