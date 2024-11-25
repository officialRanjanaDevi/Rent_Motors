import React, { useState,useEffect } from "react";
import { Link,useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import "./Navbar.css";
import Order from "./Order";
import Drawer from "@mui/material/Drawer";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  height: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: 2,
};

function Navbar() {
  const userType=localStorage.getItem("usertype")
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [menu, setMenu] = useState("");
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [orderid, setOrderid] = useState("");
  const [orderData, setOrderData] = useState({});
  const location = useLocation().pathname;
  const [newOrder, setNewOrder] = useState(0);
  const [cancelreq, setCancelreq] = useState(0);
  const userid=localStorage.getItem("userid");
  const findOrder = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER}/renter/viewOrder/${orderid}/${userid}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      const response = await res.json();
      if (response.success) {
        setOrderData(response.data);
        if (response.data) {
          setOpen(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      findOrder();
    }
  };

 
  const newCancelReq = async () => {
    try {
      let res1 = await fetch(`${import.meta.env.VITE_SERVER}/renter/order/Placed/${userid}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let response1 = await res1.json();
      setNewOrder(response1.data.length);

      let res2 = await fetch(
        `${import.meta.env.VITE_SERVER}/renter/order/CancelReq/${userid}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let response2 = await res2.json();
      setCancelreq(response2.data.length);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    findOrder();
    newCancelReq();
  }, []);


  const [state, setState] = useState({ left: false });
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if(screenSize<1025){
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift") 
      ) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    }
   
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className="bg-lime-600 h-full"
    >
      <List sx={{ width: "100%", maxWidth: 360 }} component="nav">
       
        <Link to="/renter" className="hover:no-underline">
          <ListItemButton
            className="hover:text-black m-1"
            sx={{
              borderRadius: "5px",
              backgroundColor: location === "/renter" ? "black" : "",
              color: location === "/renter" ? "white" : "black",
            }}
          >
            <ListItemIcon>
              <DashboardOutlinedIcon
                sx={{ color: location === "/renter" ? "white" : "black" }}
              />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </Link>

        <Link to="/addVehicle" className="hover:no-underline ">
          <ListItemButton
            className="text-sm hover:text-black m-1"
            sx={{
              borderRadius: "5px",
              backgroundColor: location === "/addVehicle" ? "black" : "",
              color: location === "/addVehicle" ? "white" : "black",
            }}
          >
            <ListItemIcon>
              <LibraryAddOutlinedIcon
                sx={{ color: location === "/addVehicle" ? "white" : "black" }}
              />
            </ListItemIcon>
            <ListItemText primary="Add New Vehicle" />
          </ListItemButton>
        </Link>
        <Link to="/updateVehicle" className="hover:no-underline">
          <ListItemButton
            className="text-sm hover:text-black m-1"
            sx={{
              borderRadius: "5px",
              backgroundColor: location === "/updateVehicle" ? "black" : "",
              color: location === "/updateVehicle" ? "white" : "black",
            }}
          >
            <ListItemIcon>
              <PermMediaOutlinedIcon
                sx={{
                  color: location === "/updateVehicle" ? "white" : "black",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Update Vehcile" />
          </ListItemButton>
        </Link>
        <Link to="/newOrder" className="hover:no-underline">
          <ListItemButton
            className="text-sm hover:text-black m-1"
            sx={{
              borderRadius: "5px",
              backgroundColor: location === "/newOrder" ? "black" : "",
              color: location === "/newOrder" ? "white" : "black",
            }}
          >
            <ListItemIcon>
              <AddchartOutlinedIcon
                sx={{ color: location === "/newOrder" ? "white" : "black" }}
              />
            </ListItemIcon>
            <ListItemText primary="New Orders" />
            {newOrder > 0 ? (
              <Avatar
                sx={{
                  height: "1.5rem",
                  width: "1.5rem",
                  backgroundColor: "rgb(54 83 20)",
                  fontSize: "1rem",
                }}
              >
                {newOrder}
              </Avatar>
            ) : (
              ""
            )}
          </ListItemButton>
        </Link>
        <Link to="/acceptedOrder" className="hover:no-underline">
          <ListItemButton
            className="text-sm hover:text-black m-1"
            sx={{
              borderRadius: "5px",
              backgroundColor: location === "/acceptedOrder" ? "black" : "",
              color: location === "/acceptedOrder" ? "white" : "black",
            }}
          >
            <ListItemIcon>
              <BeenhereOutlinedIcon
                sx={{
                  color: location === "/acceptedOrder" ? "white" : "black",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Accepted Orders" />
          </ListItemButton>
        </Link>
        <Link to="/rejectedOrder" className="hover:no-underline">
          <ListItemButton
            className="text-sm hover:text-black m-1"
            sx={{
              borderRadius: "5px",
              backgroundColor: location === "/rejectedOrder" ? "black" : "",
              color: location === "/rejectedOrder" ? "white" : "black",
            }}
          >
            <ListItemIcon>
              <EventBusyOutlinedIcon
                sx={{
                  color: location === "/rejectedOrder" ? "white" : "black",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Rejected Orders" />
          </ListItemButton>
        </Link>
        <Link to="/cancelledOrder" className="hover:no-underline">
          <ListItemButton
            className="text-sm hover:text-black m-1"
            sx={{
              borderRadius: "5px",
              backgroundColor: location === "/cancelledOrder" ? "black" : "",
              color: location === "/cancelledOrder" ? "white" : "black",
            }}
          >
            <ListItemIcon>
              <DeleteForeverOutlinedIcon
                sx={{
                  color: location === "/cancelledOrder" ? "white" : "black",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Cancelled Orders" />
          </ListItemButton>
        </Link>
        <Link to="/cancelReq" className="hover:no-underline">
          <ListItemButton
            className="text-sm hover:text-black  m-1"
            sx={{
              borderRadius: "5px",
              backgroundColor: location === "/cancelReq" ? "black" : "",
              color: location === "/cancelReq" ? "white" : "black",
            }}
          >
            <ListItemIcon>
              <CancelScheduleSendOutlinedIcon
                sx={{ color: location === "/cancelReq" ? "white" : "black" }}
              />
            </ListItemIcon>
            <ListItemText primary="Cancel Requests" />
            {cancelreq > 0 ? (
              <Avatar
                sx={{
                  height: "1.5rem",
                  width: "1.5rem",
                  backgroundColor: "rgb(54 83 20)",
                  fontSize: "1rem",
                }}
              >
                {cancelreq}
              </Avatar>
            ) : (
              ""
            )}
          </ListItemButton>
        </Link>
      </List>
    </Box>
  );

  return (
    <AppBar
      sx={{ backgroundColor: "black", padding: "0rem 1rem" }}
      className="relative -z-50"
    >
      <Toolbar
        disableGutters
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography
          variant="h6"
          noWrap
          component="a"
          sx={{
            mr: 2,
            fontFamily: "monospace",
            fontWeight: 900,
            color: "inherit",
            textDecoration: "none",
          }}
          onClick={toggleDrawer("left", true)}
        >
          Rent Motors
        </Typography>
        <Drawer
          anchor="left"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
        <div className="relative">
          <input
            className="w-[30vw] rounded-md py-0.5 px-8 shadow-md shadow-neutral-500 text-black"
            placeholder="Enter order ID"
            value={orderid}
            onChange={(e) => setOrderid(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <SearchRoundedIcon
            sx={{ color: "rgb(150 150 150)" }}
            className="absolute left-1 mt-1 cursor-pointer"
            onClick={findOrder}
          />

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} className="rounded-md ">
              <Order data={orderData} />
            </Box>
          </Modal>
        </div>

        {/* User avatar menu */}
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip >
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="User Avatar"
                src={localStorage.getItem("userimage") || "/static/images/avatar/2.jpg"} 
                sx={{ backgroundColor: " rgb(101 163 13)" }}
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem
              onClick={handleCloseUserMenu}
              sx={{
                display: userType ? "none" : "block",
              }}
            >
              <Link to="/login" className="hover:text-black">
                Login
              </Link>
            </MenuItem>
            <MenuItem
              onClick={handleCloseUserMenu}
              sx={{
                display: userType ? "none" : "block",
              }}
            >
              <Link to="/signup" className="hover:text-black">
                SignUp
              </Link>
            </MenuItem>
            <MenuItem
              onClick={handleCloseUserMenu}
              sx={{
                display: userType? "block" : "none",
              }}
            >
              <Link to="/profile" className="hover:text-black">
                Profile
              </Link>
            </MenuItem>
             <MenuItem
              onClick={handleCloseUserMenu}
              sx={{
                display: userType==="Renter" ? "block" : "none",
              }}
            >
              <Link to="/renter" className="hover:text-black">
                Dashboard
              </Link>
            </MenuItem>
          
            <MenuItem
              onClick={handleCloseUserMenu}
              sx={{
                display: userType? "block" : "none",
              }}
            >
              <Link to="/logout" className="hover:text-black">
                Logout
              </Link>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
