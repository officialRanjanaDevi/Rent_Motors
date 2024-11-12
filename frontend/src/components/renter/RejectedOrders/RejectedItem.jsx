import React from "react";

const RejectedItem = ({ data }) => {
 

  return (
    <>
      <div className="mb-4 bg-neutral-200 my-2 rounded-md p-2 flex justify-between items-center relative   mx-auto flex-col  shadow-md shadow-neutral-500 text-xs sm:text-sm xl:text-md">
        <div className="flex justify-between md:flex-row flex-col items-center w-full">
          <img
            src={data.vehicleData.images[0]}
            className="rounded-md h-48 shadow-md shadow-black w-full sm:w-[25%]"
            alt="Product"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
            <div className="mx-2 flex flex-col items-center sm:items-start h-fit sm:h-48 w-full rounded-md px-2 border-2 border-neutral-300 shadow-md shadow-neutral-400 font-semibold ">
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
            </div>

            <div className="ml-2 flex flex-col items-center sm:items-start h-fit sm:h-48 rounded-md px-2 border-2 border-neutral-300 shadow-md shadow-neutral-400 font-semibold">
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
            </div>

            <div className="ml-2 flex flex-col items-center sm:items-start h-fit sm:h-48 rounded-md px-2 border-2 border-neutral-300 shadow-md shadow-neutral-400 font-semibold ">
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
        
      </div>
    </>
  );
};

export default RejectedItem;
