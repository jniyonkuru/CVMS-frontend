import React, { useState } from "react";
import { Link, Navigate, useLocation,useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItemText,
  Box,
  ListItemButton,
  ListItemIcon,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import BallotIcon from "@mui/icons-material/Ballot";

import EventNoteIcon from "@mui/icons-material/EventNote";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../AuthContext";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { transform } from "framer-motion";

 export const GoBack=()=>{
 const navigate=useNavigate()

  return (
    <Box sx={{position:"sticky", width:"fit-content",bottom:2}}>
    <IconButton  onClick={()=>navigate(-1)}>
      <KeyboardBackspaceIcon sx={{color:"primary.main" ,fontSize:"30px","&:hover":{transform:"scale(1.1)"},transition:"transform 0.2s ease-in-out"}}/>
    </IconButton>
    </Box>
  )
}


const NavBar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

 const navigate=useNavigate()

  const handleLogOut=()=>{
    logout();
   handleMenuClose();
   navigate("/", { replace: true });
  }

  const { palette } = useTheme();

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const drawerItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon sx={{ fontSize: 20 }} />,
      to: "/dashboard",
    },
    { text: "Profile", icon: <AccountCircleIcon />, to: "/profile" },
    { text: "Tasks", icon: <BallotIcon />, to: "/" },
    { text: "Events", icon: <EventNoteIcon />, to: "/events" },
    { text: "Messages", icon: <MailOutlineIcon />, to: "#" },
    

  ];

  const drawerContent = (
    <Box
      sx={{ width: 200}}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >

      <List component="nav">
        {drawerItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <ListItemButton
              divider
              key={item.text}
              component={Link}
              to={item.to}
              sx={{
                background: isActive
                  ? "linear-gradient(145deg, #1e4854, #c0d1d1)"
                  : "transparent",
                color: isActive ? "#fafafa" : palette.primary.light,
                "&:hover": {
                  background:"linear-gradient(145deg, #1e4854, #c0d1d1)",
                  color: "#fafafa",
                },
              }}
            >
              <ListItemIcon sx={{ color: isActive ? "#fafafa" : "primary.main" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography
                    variant="body2"
                    style={{ color: "primary.light" }}
                  >
                    {item.text}
                  </Typography>
                }
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{borderRadius:3}}>
        <Toolbar>
          <IconButton
            aria-label="menu"
            onClick={toggleDrawer(true)}
            edge="start"
            sx={{ mr: "auto" }}
          >
            <MenuIcon sx={{ fontSize: "35px", color: "#fafafa" }} />
          </IconButton>
        
          {user && (
            <Typography variant="h6" sx={{ flexGrow: 1, color: "#fafafa" }}>
             {` Welcome ,${user.role=="volunteer"?user.firstName:user.name}`}
            </Typography>
          )}
          <Typography sx={{ color: "#fafafa" }}>{user?`${user.email}`:'Account'}</Typography>
          <IconButton
            edge="end"
            sx={{ mr: 3, ml: 1, color: "#fafafa" }}
            size="large"
            onClick={handleMenuOpen}
          >
            <ArrowDropDownIcon sx={{ fontSize: "30px" }} />
          </IconButton>

          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
            sx={{ mt: 1 }}
          >
            {!isAuthenticated && (
              <MenuItem key='login' >
                <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link>
              </MenuItem>
            )}
            {isAuthenticated && (
              <MenuItem key='logout' onClick={handleLogOut}>Logout</MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{ sx: {} }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default NavBar;
