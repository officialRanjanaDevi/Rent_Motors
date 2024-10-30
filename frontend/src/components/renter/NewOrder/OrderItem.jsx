import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
const OrderItem = () => {
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
  });
  const { vertical, horizontal, open, message } = state;

  const handleClick = (newState, msg) => () => {
    setState({ ...newState, open: true, message: msg });
    setTimeout(() =>   setState({ ...state, open: false }), 1500); 
  };

 
  return (
    <div>
      <div className="bg-neutral-200 my-2 rounded-md p-2 flex justify-between items-center relative sm:w-full w-fit mx-auto sm:flex-row flex-col">
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
          <p className="text-md font-bold">Order placed on: 5 Sep</p>
        </div>
        <div className="flex flex-col items-start me-2">
          <p className="text-md font-bold">Total: 2000rs</p>
          <p className="flex font-semibold">Discount: 10%</p>
        </div>
        <div >
          <Box className="flex flex-col">
          <button  onClick={handleClick(
                { vertical: "top", horizontal: "center" },
                "Order accepted"
              )} className="bg-black text-white p-1 px-4 mt-2 rounded-md hover:bg-neutral-700">
            Accept
          </button>
            <button
              onClick={handleClick(
                { vertical: "top", horizontal: "center" },
                "Order has been cancelled"
              )}
              className="bg-black text-white p-1 px-4 mt-2 rounded-md hover:bg-neutral-700"
            >
              Cancel
            </button>
          </Box>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            
           
            key={vertical + horizontal}
          >
            <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
            {message}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
