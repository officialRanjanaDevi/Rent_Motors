import * as React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import UpdateForm from "./UpdateForm";
import UpdateImages from "./UpdateImages";

export default function ListingCard({ data, hello }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    hello(); 
  };

  const [openImages,setOpenImages]=React.useState(false);
  const handleImages=()=>setOpenImages(true);
  const handleCloseImages=()=>{
    setOpenImages(false);
    hello();
  }
  return (
    <Card
    sx={{
      maxWidth: "400px",
      minHeight: "400px",
      margin: ".5rem",
      borderRadius: "15px",
      boxShadow: "inset 0px 1px 6px 1px rgb(220 220 220)",
    }}
    className="relative z-10 group bg-neutral-50 border-2 border-neutral-200"
  >
    <div className="overflow-hidden h-3/4 p-1 bg-neutral-50">
      <div
        id="carouselExampleIndicators"
        className="carousel cursor-pointer slide rounded-lg mx-auto h-full group-hover:scale-95 transition-transform duration-1000 ease-in-out "
        data-ride="carousel"
        
      >
       
        
      
        <div
          className="carousel-inner rounded-lg h-full hover:opacity-85"
          onClick={handleImages}
        >
          <div className="carousel-item rounded-lg">
            <img
              src={data.images[0]}
              className="d-block w-100 rounded-lg"
              alt="images1"
            />
          </div>
          <div className="carousel-item rounded-lg active">
            <img
              src={data.images[1]}
              className="d-block w-100 rounded-lg"
              alt="image2"
            />
          </div>
          <div className="carousel-item rounded-lg">
            <img
              src={data.images[2]}
              className="d-block w-100 rounded-lg"
              alt="image3"
            />
          </div>
       
        </div>
     
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
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
          href="#carouselExampleIndicators"
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
          open={open}
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
  );
}
