import React, { useState } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
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

import BallotIcon from "@mui/icons-material/Ballot";

import EventNoteIcon from "@mui/icons-material/EventNote";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginForm from "./loginForm";
import { useAuth } from "../AuthContext";
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
  ];

  const drawerContent = (
    <Box
      sx={{ width: 200, pt: 8 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          color: "primary.light",
          fontSize: "12px",
          mb: 3,
        }}
      >
        Community volunteering Management System
      </Typography>

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
                backgroundColor: isActive
                  ? palette.primary.main
                  : "transparent",
                color: isActive ? "#fff" : palette.primary.light,
                "&:hover": {
                  backgroundColor: palette.primary.dark,
                  color: "#fff",
                },
              }}
            >
              <ListItemIcon sx={{ color: isActive ? "#fff" : "primary.main" }}>
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
      <AppBar>
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
