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
import LogoutIcon from "@mui/icons-material/Logout";
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
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar sx={{ backgroundColor: "black", padding: "0rem 1rem" }}>
      <Toolbar disableGutters sx={{display:"flex",justifyContent:"space-between"}}>
        <Typography
          variant="h6"
          noWrap
          component="a"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
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
              <Link to="/newOrder" className="mobile-app-bar-transition">
                <div>
                  <ArrowForwardIcon
                    sx={{ fontSize: "1.2rem", color: "#555" }}
                  ></ArrowForwardIcon>
                  New Orders
                </div>
              </Link>
              <Link to="/addProduct" className="mobile-app-bar-transition">
                <div>
                  <ArrowForwardIcon
                    sx={{ fontSize: "1.2rem", color: "#555" }}
                  ></ArrowForwardIcon>
                  Add Product
                </div>
              </Link>
              <Link to="/cancelReq" className="mobile-app-bar-transition">
                <div>
                  <ArrowForwardIcon
                    sx={{ fontSize: "1.2rem", color: "#555" }}
                  ></ArrowForwardIcon>
                  Cancel Requests
                </div>
              </Link>

              <Link to="/updateProduct" className="mobile-app-bar-transition">
                <div>
                  <ArrowForwardIcon
                    sx={{ fontSize: "1.2rem", color: "#555" }}
                  ></ArrowForwardIcon>
                  UpdateProduct
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
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
            hover: { color: "black" },
          }}
        >
          BeBold
        </Typography>

        {/* User avatar menu */}
        <Box className="flex items-center">
          <Link
            to="/logout"
            className="hover:text-white text-neutral-500 mr-2"
          >
            <LogoutIcon />
           
          </Link>

          <Avatar
            alt="User Avatar"
            src="/static/images/avatar/2.jpg"
            sx={{ backgroundColor: " rgb(245 158 11)" }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
