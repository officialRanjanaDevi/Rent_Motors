import { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./Navbar.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "75%", md: "50%" },
  height: "auto",
  bgcolor: "background.paper",
  border: "4px solid #000",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

function Navbar() {
  const [menu, setMenu] = useState("");
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <AppBar  sx={{ backgroundColor: "black", padding: "0rem 1rem" }}>
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Rent Motors
        </Typography>

        {/* For mobile menu */}
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuItem
              className="flex flex-col  w-40 "
              sx={{
                justifyContent: "start",
                alignItems: "start",
                padding: "0px 0px",
              }}
              onClick={handleCloseNavMenu}
            >
              <Link to="/Vehicle" className="mobile-app-bar-transition">
                <div>
                  <ArrowForwardIcon
                    sx={{ fontSize: "1.2rem", color: "#555" }}
                  ></ArrowForwardIcon>
                  Vehicle
                </div>
              </Link>
             
              <Link
                to="/wishlist"
                className="mobile-app-bar-transition"
                style={{
                  display: localStorage.getItem("usertype")==="Client" ? "block" : "none",
                }}
              >
                <div>
                  <ArrowForwardIcon
                    sx={{ fontSize: "1.2rem", color: "#555" }}
                  ></ArrowForwardIcon>
                  Wishlist
                </div>
              </Link>
              <Link
                to="/cart"
                className="mobile-app-bar-transition"
                style={{
                  display: localStorage.getItem("usertype")==="Client" ? "block" : "none",
                }}
              >
                <div>
                  <ArrowForwardIcon
                    sx={{ fontSize: "1.2rem", color: "#555" }}
                  ></ArrowForwardIcon>
                  &nbsp; Cart
                </div>
              </Link>
              <Link to="/about" className="mobile-app-bar-transition">
                <div>
                  <ArrowForwardIcon
                    sx={{ fontSize: "1.2rem", color: "#555" }}
                  ></ArrowForwardIcon>
                  &nbsp; About us
                </div>
              </Link>
              <Link to="/contact" className="mobile-app-bar-transition">
                <div>
                  <ArrowForwardIcon
                    sx={{ fontSize: "1.2rem", color: "#555" }}
                  ></ArrowForwardIcon>
                  &nbsp; Contact us
                </div>
              </Link>
            </MenuItem>
          </Menu>
        </Box>

        {/* Logo for mobile view */}
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "inherit",
            textDecoration: "none",
            hover: { color: "black" },
          }}
        >
          RentMotors
        </Typography>

        {/* For desktop menu */}
        <Box
          className="relative"
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex", justifyContent: "center" },
          }}
        >
          <Link
            to="/Vehicle"
            className=" desktop-app-bar "
            onClick={() => {
              setMenu("Vehicle");
            }}
            style={{
              opacity: menu === "Vehicle" ? 1 : 0.7,
              fontWeight: menu === "Vehicle" ? "bold" : "normal",
            }}
          >
            Vehicle
          </Link>
          <Link
            to="/About"
            className=" desktop-app-bar "
            onClick={() => {
              setMenu("About");
            }}
            style={{
              opacity: menu === "About" ? 1 : 0.7,
              fontWeight: menu === "About" ? "bold" : "normal",
            }}
          >
            About us
          </Link>
         
          <Link
            to="/contact"
            className="desktop-app-bar"
            onClick={() => {
              setMenu("contact");
            }}
            style={{
              opacity: menu === "contact" ? 1 : 0.7,
              fontWeight: menu === "contact" ? "bold" : "normal",
            }}
          >
            Contact
          </Link>
          <Link
            to="/wishlist"
            className="desktop-app-bar"
            onClick={() => {
              setMenu("wishlist");
            }}
            style={{
                opacity: menu === "wishlist" ? 1 : 0.7,
                fontWeight: menu === "wishlist" ? "bold" : "normal",
              display: localStorage.getItem("usertype")==="Client" ? "block" : "none",
            }}
          >
            Wishlist
          </Link>
          <Link
            to="/cart"
            className="desktop-app-bar"
            onClick={() => {
              setMenu("cart");
            }}
            style={{
                opacity: menu === "cart" ? 1 : 0.7,
                fontWeight: menu === "cart" ? "bold" : "normal",
              display: localStorage.getItem("usertype")==="Client" ? "block" : "none",
            }}
          >
            cart
          </Link>
        </Box>

        {/* User avatar menu */}
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="User Avatar"
                src="/static/images/avatar/2.jpg"
                sx={{ backgroundColor: " rgb(245 158 11)" }}
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
                display: localStorage.getItem("usertype")==="Client" ? "none" : "block",
              }}
            >
              <Link to="/login" className="hover:text-black">
                Login
              </Link>
            </MenuItem>
            <MenuItem
              onClick={handleCloseUserMenu}
              sx={{
                display: localStorage.getItem("usertype")==="Client" ? "none" : "block",
              }}
            >
              <Link to="/signup" className="hover:text-black">
                SignUp
              </Link>
            </MenuItem>
            <MenuItem
              onClick={handleCloseUserMenu}
              sx={{
                display: localStorage.getItem("usertype")==="Client" ? "block" : "none",
              }}
            >
              <Link to="/order" className="hover:text-black">
                Orders
              </Link>
            </MenuItem>
            <MenuItem
              onClick={handleCloseUserMenu}
              sx={{
                display: localStorage.getItem("usertype")==="Client" ? "block" : "none",
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
