import React from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

const SideBar = () => {
  const [openProducts, setOpenProducts] = React.useState(true);
  const [openOrders, setOpenOrders] = React.useState(true);
  const [active,setActive]=React.useState("Dashboard");
  const handleProductsClick = () => {
    setOpenProducts(!openProducts);
  };
  const handleOrdersClick = () => {
    setOpenOrders(!openOrders);
  };
  

  
  return (
    <div className="bg-neutral-200 w-1/4 max-w-72 mx-2 mb-2 hidden md:flex rounded-md">
      <List sx={{ width: "100%", maxWidth: 360 }} component="nav">
        <Link to="/admin" className="hover:no-underline">
    
        <ListItemButton className="hover:text-black" onClick={()=>{setActive("Dashboard"); }} sx={{backgroundColor:active==="Dashboard"?"black":"", color:active==="Dashboard"?"white":"black",}}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        </Link>
        {/* Products Section */}
      
        <ListItemButton onClick={handleProductsClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
          {openProducts ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openProducts} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          <Link to="/addProduct" className="hover:no-underline">
            <ListItemButton className="hover:text-black" onClick={()=>{setActive("Add"); }} sx={{pl: 4,backgroundColor:active==="Add"?"black":"", color:active==="Add"?"white":"black",}}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Add New Product" />
            </ListItemButton>
          </Link>
          <Link to="/updateProduct" className="hover:no-underline">
            <ListItemButton className="hover:text-black" onClick={()=>{setActive("Update"); }} sx={{pl: 4,backgroundColor:active==="Update"?"black":"", color:active==="Update"?"white":"black",  }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Update Product" />
            </ListItemButton>
          </Link>
          </List>
        </Collapse>

        {/* Orders Section */}
        <ListItemButton onClick={handleOrdersClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
          {openOrders ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openOrders} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          <Link to="/newOrder" className="hover:no-underline">
            <ListItemButton className="hover:text-black" onClick={()=>{setActive("NewOrder"); }} sx={{pl: 4,backgroundColor:active==="NewOrder"?"black":"", color:active==="NewOrder"?"white":"black",}}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="New Orders"  />
            </ListItemButton>
            </Link>
            <Link to="/acceptedOrder" className="hover:no-underline">
            <ListItemButton className="hover:text-black" onClick={()=>{setActive("Accepted"); }} sx={{pl: 4,backgroundColor:active==="Accepted"?"black":"", color:active==="Accepted"?"white":"black",}}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Accepted Orders" />
            </ListItemButton>
            </Link>
          </List>
        </Collapse>
        <Link to="/cancelReq" className="hover:no-underline">
        <ListItemButton className="hover:text-black" onClick={()=>{setActive("Cancelreq"); }} sx={{backgroundColor:active==="Cancelreq"?"black":"", color:active==="Cancelreq"?"white":"black",}}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Cancel Requests" />
        </ListItemButton>
        </Link>
      </List>
    </div>
  );
};

export default SideBar;
