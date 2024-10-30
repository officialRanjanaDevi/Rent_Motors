import * as React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import UpdateForm from "./UpdateForm";
export default function Product(props) {
  const data=props.data;
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    
        bgcolor: 'background.paper',
        borderRadius:"10px",
        boxShadow: 24,
        
      };
      const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
    
  
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
           <Link to="/view"  className="hover:text-black">
        <div className="overflow-hidden h-3/4 p-1 bg-neutral-50">
          <CardMedia
            component="img"
         
            image={"https://tse2.mm.bing.net/th?id=OIP.gliyjHYjQD6TFPEaSmZ0rQHaEo&pid=Api&P=0&h=180"}
            alt={ "Bike"}
            sx={{ maxHeight: "600px", borderRadius: "15px" }}
            className="h-full group-hover:scale-95 transition-transform duration-1000 ease-in-out "
          />
        </div>
      </Link>
      <CardContent  sx={{ borderRadius: "15px" }} className="bg-neutral-50 ">
        <div className="flex justify-between ">
          <h1 className="font-bold text-md">{data.name}</h1>
         </div>

        
        <p>{ data.description}</p>
        <div className="flex justify-between">
        <p><b>price </b>{data.price} Rs</p>
        <p><b>discount</b> {data.discount} %</p>
        </div>
        

        <div className=" border-0 absolute w-full left-0 -bottom-8 duration-500 group-hover:-translate-y-12 text-center ">
          <div className="border-0 boder-black absolute -z-10  w-full h-16 opacity-0 duration-500 group-hover:opacity-100 group-hover:bg-black" >
            
          </div>

          
          <p onClick={handleOpen}  className=" w-full hover:scale-105 duration-300 ease-in-out text-white font-bold pt-2">update</p>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
         <UpdateForm data={data}/>
        </Box>
      </Modal>
        </div>

        

      </CardContent>
     

    </Card>
  );
}
