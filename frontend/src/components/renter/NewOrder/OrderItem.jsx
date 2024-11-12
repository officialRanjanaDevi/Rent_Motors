import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
const OrderItem = ({props,reload}) => {
  
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
  });
  const { vertical, horizontal, open, message, severity } = state;

  const handleClick = (newState, msg, sev) => {
    setState({ ...newState, open: true, message: msg, severity: sev });
    setTimeout(() => setState({ ...state, open: false }), 1500);
    setTimeout(()=>reload(),1000)
  };

  const handleAccept = async() => { 
    try {
      const response = await fetch("http://localhost:4000/api/renter/order", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data._id,
          status: "Accepted",
        }),
      });
      const res = response.json();
      if (res.success) {
        handleClick(
          { vertical: "top", horizontal: "center" },
          "Order Accepted",
          "success"
        );
        reload();
      } else {
        handleClick(
          { vertical: "top", horizontal: "center" },
          "Faild to accept Order ",
          "error"
        );
      }
    } catch (error) {
      console.error(error);
      handleClick(
        { vertical: "top", horizontal: "center" },
        "Faild to accept Order ",
        "error"
      );
    }
  };

  const handleCancel = async() => { 
    try {
      const response = await fetch("http://localhost:4000/api/renter/order", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data._id,
          status: "Rejected",
        }),
      });
      const res = response.json();
      if (res.success) {
        handleClick(
          { vertical: "top", horizontal: "center" },
          "Order Canceled successfully",
          "success"
        );
        reload();
      } else {
        handleClick(
          { vertical: "top", horizontal: "center" },
          "Faild to cancel Order ",
          "error"
        );
      }
    } catch (error) {
      console.error(error);
      handleClick(
        { vertical: "top", horizontal: "center" },
        "Faild to cancel Order ",
        "error"
      );
    }
  };
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

            <div className="ml-2 flex flex-col items-center sm:items-start h-fit sm:h-48 rounded-md px-4 border-2 border-neutral-300 shadow-md shadow-neutral-400 font-semibold">
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

            <div className="ml-2 flex flex-col items-center sm:items-start h-fit sm:h-48 rounded-md px-4 border-2 border-neutral-300 shadow-md shadow-neutral-400 font-semibold ">
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
        <div>
          <Box className="flex ">
            <button
              onClick={handleAccept}
              className="bg-lime-600 text-white py-1 px-12 mt-2 mx-3 rounded-md hover:bg-lime-700"
            >
              Accept
            </button>
            <button
              onClick={handleCancel}
              className="bg-black text-white py-1 px-12 mt-2 mx-3 rounded-md hover:bg-neutral-700"
            >
              Cancel
            </button>
          </Box>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            key={vertical + horizontal}
          >
            <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
              {message}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </>
  );
};

export default OrderItem;
