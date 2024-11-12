import * as React from "react";
import Card from "@mui/material/Card";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import UpdateForm from "./UpdateForm";
import UpdateImages from "./UpdateImages";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ListingCard({ data, hello }) {
  const navigate=useNavigate();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
  };

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
  });
  const { vertical, horizontal, open, message ,severity} = state;

  const handleClick = (newState, msg,sev) => {
    setState({ ...newState, open: true, message: msg ,severity:sev});
    setTimeout(() => setState({ ...newState, open: false }), 2000);
    setTimeout(() => navigate("/updateVehicle"), 1600);
  };


  const [openForm, setOpenForm] = React.useState(false);
  const handleOpen = () => setOpenForm(true);
  const handleClose = () => {
    setOpenForm(false);
    hello(); 
  };

  const [openImages,setOpenImages]=React.useState(false);
  const handleImages=()=>setOpenImages(true);
  const handleCloseImages=()=>{
    setOpenImages(false);
    hello();
  }

  const [openDeleteModal,setOpenDeleteModal]=React.useState(false);
  const handleCloseDeleteModal=()=>{
    setOpenDeleteModal(false);
  }
  const handleDelete=async()=>{
    try{
     const response=await fetch("http://localhost:4000/api/renter/vehicle",{
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: data._id,
      })
     })
     const res=await response.json();
     if(res.success){
      handleClick(
        { vertical: "top", horizontal: "center"},
        "Vehicle deleted successfully!",
        "success"
        
      );
      setTimeout(() => {
        setOpenDeleteModal(false);
        hello();
      }, 1000);
    
     }
    }catch(error){
    console.error(error);
    handleClick(
      { vertical: "top", horizontal: "center" },
      "Failed to delete the vehicle!","error"
      
    );
    setOpenDeleteModal(false);
    }
  
    
   
  }
  return (
    <>
    <Card
    sx={{
      maxWidth: "370px",
      minHeight: "400px",
      margin: ".5rem",
      borderRadius: "15px",
      boxShadow: "inset 0px 1px 6px 1px rgb(220 220 220)",
    }}
    className="relative z-10 group bg-neutral-50 border-2 border-neutral-200"
  >
    <div className="overflow-hidden  p-1 bg-neutral-50">
  

      <div
        id={`carousel-${data.title}`}
        className="relative carousel cursor-pointer slide rounded-lg mx-auto h-full group-hover:scale-95 transition-transform duration-1000 ease-in-out "
        data-ride="carousel"
        data-interval="false" 
      >
      <div className="absolute top-0 right-0  z-10 " onClick={()=>{setOpenDeleteModal(true)}}>
        <Tooltip title="Delete"  placement="top-start" sx={{color:"green"}}>
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
        </div>
      
        <Modal
          keepMounted
          open={openDeleteModal}
          onClose={handleCloseDeleteModal}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
           <div className="p-4">
             <h3 className="font-semibold text-red-600">Are you sure you want to delete <span className="font-bold underline">{data.title}</span> vehicle ?</h3>
             <div className="flex w-full justify-evenly mt-4">
              
              <button className="btn btn-danger w-20" onClick={handleDelete}>
              YES
             </button>
             <button className="btn bg-lime-600 text-white hover:bg-lime-700 w-20"  onClick={()=>{setOpenDeleteModal(false)}}>
              NO
             </button>
           
            
             </div>
            
           </div>
          </Box>
        </Modal>
        
        <div
          className=" carousel-inner rounded-lg h-[50vh] hover:opacity-85"
          onClick={handleImages}
        >
           
          <div className="carousel-item rounded-lg w-full h-full">
            <img
              src={data.images[0]}
              className="d-block w-full h-full rounded-lg"
              alt="images1"
            />
          </div>
          <div className="carousel-item rounded-lg active w-full h-full">
            <img
              src={data.images[1]}
              className="d-block w-full h-full rounded-lg"
              alt="image2"
            />
          </div>
          <div className="carousel-item rounded-lg w-full h-full">
            <img
              src={data.images[2]}
              className="d-block w-full h-full rounded-lg"
              alt="image3"
            />
          </div>
       
        </div>
     
        <a
          className="carousel-control-prev"
          href={`#carousel-${data.title}`}      role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href={`#carousel-${data.title}`}        
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
      
      <Modal
          keepMounted
          open={openImages}
          onClose={handleCloseImages}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <UpdateImages data={data} />
          </Box>
        </Modal>
        
    </div>

    <CardContent sx={{ borderRadius: "15px" }} className="bg-neutral-50 ">
      <div className="flex justify-between ">
        <h1 className="font-bold text-md">{data.title}</h1>
        <h1 className="font-bold text-md">{data.brand}</h1>
      </div>
     
      <p>{data.description}</p>
      <div className="flex justify-between">
        <p>
          <b>price </b>
          {data.price} Rs
        </p>
        <p>
          <b>mileage</b> {data.mileage}{" "}
        </p>
      </div>
      <div className="flex justify-between">
        <p>
          <b>speed </b>
          {data.speed}Kph
        </p>
        <p>
          <b>type</b> {data.type}{" "}
        </p>
      </div>

      <div className=" border-0 absolute w-full left-0 -bottom-12 duration-500 group-hover:-translate-y-12 text-center ">
        <div className="border-0 boder-black absolute -z-10  w-full h-full opacity-0 duration-500 group-hover:opacity-100 group-hover:bg-black"></div>

        <p
          onClick={handleOpen}
          className=" w-full hover:scale-105 hover:bg-lime-600 duration-300 ease-in-out text-white font-bold py-3 cursor-pointer"
        >
          update
        </p>
        <Modal
          keepMounted
          open={openForm}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <UpdateForm data={data} />
          </Box>
        </Modal>
      </div>
    </CardContent>
  </Card>
   <Snackbar
   anchorOrigin={{ vertical, horizontal }}
   open={open}
   sx={{ width: "20rem" }}
   key={vertical + horizontal}
   className="mt-12"
 >
   <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
     {message}
   </Alert>
 </Snackbar>
 </>
  );
}
