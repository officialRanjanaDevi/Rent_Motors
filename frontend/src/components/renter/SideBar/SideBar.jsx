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
  const [openVehicles, setOpenVehicles] = React.useState(true);
  const [openOrders, setOpenOrders] = React.useState(true);
  const [active,setActive]=React.useState("Dashboard");
  const handleProductsClick = () => {
    setOpenVehicles(!openVehicles);
  };
  const handleOrdersClick = () => {
    setOpenOrders(!openOrders);
  };
  

  
  return (
    <div className="bg-lime-600 w-1/4 max-w-72 mx-2 mb-2 hidden md:flex rounded-md">
      <List sx={{ width: "100%", maxWidth: 360 }} component="nav">
        <Link to="/admin" className="hover:no-underline">
    
        <ListItemButton className="hover:text-black " onClick={()=>{setActive("Dashboard"); }} sx={{backgroundColor:active==="Dashboard"?"black":"", color:active==="Dashboard"?"white":"black",}}>
          <ListItemIcon>
            <InboxIcon sx={{color:active==="Dashboard"?"white":"black",}}/>
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        </Link>
        {/* Products Section */}
      
        <ListItemButton onClick={handleProductsClick}>
          <ListItemIcon>
            <InboxIcon  sx={{color:"black"}}/>
          </ListItemIcon>
          <ListItemText primary="Vehicle" />
          {openVehicles ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openVehicles} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          <Link to="/addVehicle" className="hover:no-underline ">
            <ListItemButton className="hover:text-black m-1" onClick={()=>{setActive("Add"); }} sx={{borderRadius:"5px",pl: 4,backgroundColor:active==="Add"?"black":"", color:active==="Add"?"white":"black",}}>
              <ListItemIcon>
                <StarBorder sx={{color:active==="Add"?"white":"black",}}/>
              </ListItemIcon>
              <ListItemText primary="Add New Vehicle" />
            </ListItemButton>
          </Link>
          <Link to="/updateVehicle" className="hover:no-underline">
            <ListItemButton className="hover:text-black m-1" onClick={()=>{setActive("Update"); }} sx={{ borderRadius:"5px",pl: 4,backgroundColor:active==="Update"?"black":"", color:active==="Update"?"white":"black",  }}>
              <ListItemIcon>
                <StarBorder sx={{color:active==="Update"?"white":"black",}}/>
              </ListItemIcon>
              <ListItemText primary="Update Vehcile" />
            </ListItemButton>
          </Link>
          </List>
        </Collapse>

        {/* Orders Section */}
        <ListItemButton onClick={handleOrdersClick}>
          <ListItemIcon>
            <InboxIcon sx={{color:"black"}}/>
          </ListItemIcon>
          <ListItemText primary="Orders" />
          {openOrders ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openOrders} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          <Link to="/newOrder" className="hover:no-underline">
            <ListItemButton className="hover:text-black m-1" onClick={()=>{setActive("NewOrder"); }} sx={{borderRadius:"5px",pl: 4,backgroundColor:active==="NewOrder"?"black":"", color:active==="NewOrder"?"white":"black",}}>
              <ListItemIcon>
                <StarBorder sx={{color:active==="NewOrder"?"white":"black",}}/>
              </ListItemIcon>
              <ListItemText primary="New Orders"  />
            </ListItemButton>
            </Link>
            <Link to="/acceptedOrder" className="hover:no-underline">
            <ListItemButton className="hover:text-black m-1" onClick={()=>{setActive("Accepted"); }} sx={{borderRadius:"5px",pl: 4,backgroundColor:active==="Accepted"?"black":"", color:active==="Accepted"?"white":"black",}}>
              <ListItemIcon>
                <StarBorder sx={{color:active==="Accepted"?"white":"black",}}/>
              </ListItemIcon>
              <ListItemText primary="Accepted Orders" />
            </ListItemButton>
            </Link>
          </List>
        </Collapse>
        <Link to="/cancelReq" className="hover:no-underline">
        <ListItemButton className="hover:text-black m-1" onClick={()=>{setActive("Cancelreq"); }} sx={{borderRadius:"5px",backgroundColor:active==="Cancelreq"?"black":"", color:active==="Cancelreq"?"white":"black",}}>
          <ListItemIcon>
            <InboxIcon sx={{color:active==="Cancelreq"?"white":"black",}}/>
          </ListItemIcon>
          <ListItemText primary="Cancel Requests" />
        </ListItemButton>
        </Link>
      </List>
    </div>
  );
};

export default SideBar;
