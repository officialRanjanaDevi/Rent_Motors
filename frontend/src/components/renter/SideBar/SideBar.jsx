import React from "react";
import { Link,useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined';
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CancelScheduleSendOutlinedIcon from '@mui/icons-material/CancelScheduleSendOutlined';
import Avatar from '@mui/material/Avatar';
const SideBar = () => {
  
  const location = useLocation().pathname;
  const [newOrder, setNewOrder] = React.useState(0);
  const [cancelreq, setCancelreq] = React.useState(0);
  const loadData = async () => {
    try {
   
      let res1 = await fetch(`${import.meta.env.VITE_SERVER}/renter/order/Placed`, {
        method: "GET",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
      
      });
      let response1 = await res1.json();
      setNewOrder(response1.data.length);

      let res2 = await fetch(`${import.meta.env.VITE_SERVER}/renter/order/CancelReq`, {
        method: "GET",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
      
      });
      let response2 = await res2.json();
      setCancelreq(response2.data.length);
      } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  React.useEffect(() => {
    loadData();
   
  }, []);
   
  return (
    <div className="bg-lime-600 w-1/4 min-w-[250px] max-w-72 mx-2 mb-2 hidden lg:flex rounded-md">
      <List sx={{ width: "100%", maxWidth: 360 }} component="nav">

        <Link to="/renter" className="hover:no-underline">
        <ListItemButton className="hover:text-black m-1" sx={{borderRadius:"5px",backgroundColor:location==="/renter"?"black":"", color:location==="/renter"?"white":"black",}}>
          <ListItemIcon>
            <DashboardOutlinedIcon sx={{color:location==="/renter"?"white":"black",}}/>
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        </Link>
      
        <Link to="/addVehicle" className="hover:no-underline ">
            <ListItemButton className="text-sm hover:text-black m-1" sx={{borderRadius:"5px",backgroundColor:location==="/addVehicle"?"black":"", color:location==="/addVehicle"?"white":"black",}}>
              <ListItemIcon>
                <LibraryAddOutlinedIcon sx={{color:location==="/addVehicle"?"white":"black",}}/>
              </ListItemIcon>
              <ListItemText primary="Add New Vehicle" />
            </ListItemButton>
          </Link>
          <Link to="/updateVehicle" className="hover:no-underline">
            <ListItemButton className="text-sm hover:text-black m-1" sx={{ borderRadius:"5px",backgroundColor:location==="/updateVehicle"?"black":"", color:location==="/updateVehicle"?"white":"black",  }}>
              <ListItemIcon>
                <PermMediaOutlinedIcon sx={{color:location==="/updateVehicle"?"white":"black",}}/>
              </ListItemIcon>
              <ListItemText primary="Update Vehcile" />
            </ListItemButton>
          </Link>
        <Link to="/newOrder" className="hover:no-underline">
            <ListItemButton className="text-sm hover:text-black m-1"  sx={{borderRadius:"5px",backgroundColor:location==="/newOrder"?"black":"", color:location==="/newOrder"?"white":"black",}}>
              <ListItemIcon>
                <AddchartOutlinedIcon sx={{color:location==="/newOrder"?"white":"black",}}/>
              </ListItemIcon>
              <ListItemText primary="New Orders"  />{newOrder>0?<Avatar sx={{height:"1.5rem",width:"1.5rem",backgroundColor:"rgb(54 83 20)",fontSize:"1rem"}}>{newOrder}</Avatar>:""}
            </ListItemButton>
            </Link>
            <Link to="/acceptedOrder" className="hover:no-underline">
            <ListItemButton className="text-sm hover:text-black m-1"  sx={{borderRadius:"5px",backgroundColor:location==="/acceptedOrder"?"black":"", color:location==="/acceptedOrder"?"white":"black",}}>
              <ListItemIcon>
                <BeenhereOutlinedIcon sx={{color:location==="/acceptedOrder"?"white":"black",}}/>
              </ListItemIcon>
              <ListItemText primary="Accepted Orders" />
            </ListItemButton>
            </Link>
            <Link to="/rejectedOrder" className="hover:no-underline">
            <ListItemButton className="text-sm hover:text-black m-1"  sx={{borderRadius:"5px",backgroundColor:location==="/rejectedOrder"?"black":"", color:location==="/rejectedOrder"?"white":"black",}}>
              <ListItemIcon>
                < EventBusyOutlinedIcon  sx={{color:location==="/rejectedOrder"?"white":"black",}}/>
              </ListItemIcon>
              <ListItemText primary="Rejected Orders" />
            </ListItemButton>
            </Link>
            <Link to="/cancelledOrder" className="hover:no-underline">
            <ListItemButton className="text-sm hover:text-black m-1"  sx={{borderRadius:"5px",backgroundColor:location==="/cancelledOrder"?"black":"", color:location==="/cancelledOrder"?"white":"black",}}>
              <ListItemIcon>
                <DeleteForeverOutlinedIcon sx={{color:location==="/cancelledOrder"?"white":"black",}}/>
              </ListItemIcon>
              <ListItemText primary="Cancelled Orders" />
            </ListItemButton>
            </Link>
            <Link to="/cancelReq" className="hover:no-underline">
        <ListItemButton className="text-sm hover:text-black  m-1"  sx={{borderRadius:"5px",backgroundColor:location==="/cancelReq"?"black":"", color:location==="/cancelReq"?"white":"black",}}>
          <ListItemIcon>
            <CancelScheduleSendOutlinedIcon  sx={{color:location==="/cancelReq"?"white":"black"}}/>
          </ListItemIcon>
          <ListItemText primary="Cancel Requests" />{cancelreq>0?<Avatar sx={{height:"1.5rem",width:"1.5rem",backgroundColor:"rgb(54 83 20)",fontSize:"1rem"}}>{cancelreq}</Avatar>:""}
        </ListItemButton>
        </Link>

     
        
      </List>
    </div>
  );
};

export default SideBar;
