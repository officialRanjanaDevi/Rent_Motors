import React from 'react'

const Order = ({data}) => {
  console.log(data);
  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <h1 className='font-bold '>Your order : {data._id}</h1>
      <div className='h-full w-full flex flex-col md:flex-row  my-3 justify-evenly overflow-y-scroll'>
      <img src={data.vehicleData.images[0]} className='h-1/2 md:h-full w-full rounded-md md:mr-2 md:w-1/2'></img>
      <div className="w-full md:w-1/2   h-full  rounded-md px-4 border-2 border-neutral-300 shadow-md shadow-neutral-400 font-semibold">
             <h1 className="font-bold text-center w-full my-2">
                Vehicle Details
              </h1>
              <p>
                Title:{" "}
                <span className="text-gray-600">{data.vehicleData.title}</span>
              </p>
              <p>
                Brand:{" "}
                <span className="text-gray-600">{data.vehicleData.brand}</span>
              </p>
              <p>
                Rent:{" "}
                <span className="text-gray-600">
                  {data.vehicleData.price} Rs
                </span>
              </p>
              <p>
                Mileage:{" "}
                <span className="text-gray-600">
                  {data.vehicleData.mileage} Kmph
                </span>
              </p>
              <p>
                Description:{" "}
                <span className="text-gray-600">
                  {data.vehicleData.description} 
                </span>
              </p>
              <h1 className="font-bold text-center w-full my-2">
                Client Details
              </h1>
              <p>
                Name:{" "}
                <span className="text-gray-600">
                  {data.clientData.username}
                </span>{" "}
              </p>
              <p>
                Email:{" "}
                <span className="text-gray-600">{data.clientData.email}</span>
              </p>
              <p>
                Contact:{" "}
                <span className="text-gray-600">{data.clientData.contact}</span>
              </p>
              <p>
                Address:{" "}
                <span className="text-gray-600">
                  {data.clientData.address} {data.clientData.city}{" "}
                  {data.clientData.pincode}
                </span>
              </p>
             
              <h1 className="font-bold text-center w-full my-2">
                Order Details
              </h1>
              <p>
                {" "}
                Order placed on:{" "}
                <span className="text-gray-600">
                  {data.createdAt.substring(0, 10)}
                </span>
              </p>
              <p>
                Rent for:{" "}
                <span className="text-gray-600">{data.days} days</span>
              </p>
              <p>
                Quantity: <span className="text-gray-600">{data.quantity}</span>
              </p>
              <p>
                Total amount:{" "}
                <span className="text-gray-600">{data.price} Rs</span>
              </p>
              <p>
                Order status:{" "}
                <span className="text-gray-600">{data.status}</span>
              </p>
            </div>

      </div>
     
  

           
           
        
    </div>
  )
}

export default Order
