import React, { useRef, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UpdateImages = ({ data }) => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
  });
  const { vertical, horizontal, open, message } = state;

  const handleClick = (newState, msg) => {
    setState({ ...newState, open: true, message: msg });
    setTimeout(() => setState({ ...newState, open: false }), 1500);
    setTimeout(() => navigate("/updateProduct"), 1600);
  };

  const form = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length !== 3) {
      handleClick(
        { vertical: "top", horizontal: "center" },
        "Please upload exactly 3 images",
        
      );
      return;
    }
    try {
     
      const formData = new FormData();
      formData.append("id", data._id);

      images.forEach((image, index) => {
        formData.append("images", image); 
      });
    
      const response = await fetch(`http://localhost:4000/api/renter/updateImages`, {
        method: "PATCH",
        credentials: "include",
        body: formData, 
      });

      const res = await response.json();

      if (res.success) {
        handleClick(
          { vertical: "top", horizontal: "center" },
          "Product updated"
        );
      }
    } catch (error) {
      console.error("Error during product update:", error);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  return (
    <>
      <form
        ref={form}
        onSubmit={handleSubmit}
        className="bg-neutral-100 mx-auto  p-6 rounded-lg flex flex-col items-center"
      >
        <h1 className="font-bold text-lg">Update Images</h1>
          
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            required
            className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
          />
   <p className="text-xs text-red-600" >*Please upload exactly 3 files</p>

        <button
          type="submit"
          className="bg-black text-white text-sm hover:bg-lime-600 font-bold py-2 mt-4 px-12 rounded focus:outline-none focus:shadow-outline"
        >
          Upload
        </button>

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          sx={{ width: "20rem" }}
          key={vertical + horizontal}
        >
          <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
        </form>
    </>
  );
};

export default UpdateImages;
