import React from "react";

const OrderItem = () => {
  

 
  return (
    <div>
      <div className="bg-rose-50 my-2 rounded-md p-2 flex justify-between items-center relative sm:w-full w-fit mx-auto sm:flex-row flex-col">
        <div className="flex justify-start sm:flex-row flex-col">
          <img
            src="https://tse1.mm.bing.net/th?id=OIP.aX118E5H8MxKx0iM7fDpEQHaE8&pid=Api&P=0&h=180"
            className="rounded-md sm:w-2/3 w-full h-full"
        
            alt="Product"
          />
          <div className="ml-2 flex flex-col justify-center items-center sm:items-start">
            <h2 className="font-bold">User name</h2>
            <h2 className="font-bold">Product name</h2>
            <h2>Product type</h2>
          </div>
        </div>
        <div className="flex flex-col items-start me-2">
          <p className="text-md"><b>Order placed on:</b> 5 Sep</p>
          <p className="text-md"><b>Order accepted on:</b> 5 Sep</p>
          <p className="text-md"><b>Expected delivery on:</b> 5 Sep</p>
        </div>
        <div className="flex flex-col items-start me-2">
        <p className="text-md font-bold">Order Status</p>
        <p className="flex font-semibold">On way</p>
        </div>
        <div className="flex flex-col items-start me-2">
          <p className="text-md font-bold">Total: 2000rs</p>
          <p className="flex font-semibold">Discount: 10%</p>
        </div>
        
      </div>
    </div>
  );
};

export default OrderItem;
