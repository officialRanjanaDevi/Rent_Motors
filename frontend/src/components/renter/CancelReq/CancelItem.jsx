import React from 'react'

const CancelItem = () => {
  return (
    <div>
       <div className="bg-neutral-200 my-2 rounded-md p-2 flex justify-between items-center relative sm:w-full w-fit mx-auto sm:flex-row flex-col">
       <div className="flex  justify-start sm:flex-row flex-col ">
      <img
        src="https://tse1.mm.bing.net/th?id=OIP.aX118E5H8MxKx0iM7fDpEQHaE8&pid=Api&P=0&h=180"
        className=" rounded-md sm:w-2/3 w-full h-full"
      ></img>
   

   <div className='ml-2 flex flex-col justify-center items-center sm:items-start'>
   <h2 className="font-bold">User name</h2>
        <h2 className="font-bold">Product name</h2>
        <h2 className="">Product type</h2>
       
   </div>
      
      
      </div>
      <div className="flex flex-col items-start me-2 ">
        <p className="text-md font-bold ">Order date: 5 sep </p>
        <p className="flex font-semibold">
          Order Stauts:&nbsp; On Way
        </p>
      
      </div>
      <div className="flex flex-col items-start me-2 ">
        <p className="text-md font-bold ">Total: 2000rs </p>
        <p className="flex font-semibold">
          Discount:&nbsp; 10%
        </p>
      
      </div>
      <div className='flex flex-col'>
      <button className="bg-black text-white p-1 px-4 mt-2 rounded-md  hover:bg-neutral-700 ">
          Accept
        </button>
        <button className="bg-black text-white p-1  px-4 mt-2 rounded-md  hover:bg-neutral-700 ">
          Reject
        </button>
      </div>
     
   
    
   
    </div>
    </div>
  )
}

export default CancelItem
