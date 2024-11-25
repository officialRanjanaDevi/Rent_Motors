import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

import StarRoundedIcon from "@mui/icons-material/StarRounded";
const ReviewBox = ({ review }) => {
 
    const [state, setState] = useState({
        open: false,
        vertical: "top",
        horizontal: "center",
        message: "",
      });
      const { vertical, horizontal, open, message ,severity} = state;
    
      const handleClick = (newState, msg,sev) => {
        setState({ ...newState, open: true, message: msg , severity:sev});
        setTimeout(() => setState({ ...newState, open: false }), 1500);
        };

  const userid = localStorage.getItem("userid");
  const deleteReview=async()=>{
    try{
     const res=await fetch(`${import.meta.env.VITE_SERVER}/client/review/${userid}`,{
        method:"DELETE",
        credentials:"include",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({id:review._id}),
         
     })
     const response=await res.json();
     if(response.success){
        handleClick(
            { vertical: "top", horizontal: "center" },
            "Review deleted successfully!","success"
            
          );
     }else{
        handleClick(
            { vertical: "top", horizontal: "center" },
            "Failed to delete review!","error"
            
          );
     }

    }catch(error){
        console.log(error)
        handleClick(
            { vertical: "top", horizontal: "center" },
            "Failed to delete review!","error"
            
          );
    }
  }
  return (
    <div className="flex   items-center justify-between border-2 rounded-md p-2 px-3 shadow-md shadow-neutral-400">
      <div className="flex items-center ">
        <div className="border-2 border-neutral-500 rounded-full shadow-sm  shadow-black">
          <img
            src={review.client[0].profile}
            className="h-16 w-16 rounded-full "
          ></img>
        </div>
        <div className="ml-3">
          <p className="font-bold capitalize">{review.client[0].username}</p>
          <div className="flex">
            {Array.from({ length: review.rating }).map((_, starIndex) => (
              <StarRoundedIcon
                key={starIndex}
                sx={{ color: "rgb(251 191 36)" }}
              />
            ))}
              {Array.from({ length: 5-review.rating }).map((_, starIndex) => (
              <StarRoundedIcon
                key={starIndex}
                sx={{ color: "rgb(200 200 200)" }}
              />
            ))}
          </div>
          <p className="text-neutral-600 text-sm">{review.comment}</p>
        </div>
     
      </div>
      {userid !== review.client[0]._id ? (
        <button className="px-2 py-1 text-neutral-100 bg-lime-600 rounded-md hover:scale-105 hover:bg-lime-700 duration-700 shadow-md shadow-black" onClick={deleteReview}>delete</button>
      ) : (
        ""
      )}
      <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          sx={{ width: "20rem" }}
          key={vertical + horizontal}
        >
          <Alert  severity={severity}  variant="filled" sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
    </div>
  );
};

export default ReviewBox;
