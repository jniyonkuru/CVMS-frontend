import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import CVMSLogo from './CVMSLogo';
import LoginForm from './loginForm';
import { useAuth } from '../AuthContext';

const Header: React.FC = () => {
    const [isOpen,setOpen]=useState(false);
    const {isAuthenticated,logout}=useAuth()

    useEffect(()=>{
      if(isAuthenticated){
        handleClose()
      }
    },[isAuthenticated])
    const handleClose=()=>{
        setOpen(false)
    }
  return (
    <AppBar position="static">
      <Toolbar>
        <LoginForm open={isOpen} handleClose={handleClose}/>
        <Box sx={{display:"flex", justifyContent:"space-between",alignItems:"center",width:"100%"}}>
       <CVMSLogo sx={{ fontSize: 50, mr: 2 }} />
       <Box sx={{flex:1,}}>
        <Button sx={{color:"#fafafa"}} component={Link} to="/">Home</Button>
        <Button sx={{color:"#fafafa"}} component={Link} to="/about">About</Button>
        <Button sx={{color:"#fafafa"}} component={Link} to="/opportunities">Opportunities</Button>
        {isAuthenticated&&<Button sx={{color:"#fafafa"}} component={Link} to="/dashboard">Dashboard</Button>}
        <Button sx={{color:"#fafafa"}} component={Link} to="/contact">Contact</Button>
       {isAuthenticated?<Button sx={{color:"#fafafa"}} onClick={logout}>Logout</Button> :<Button sx={{color:"#fafafa"}} onClick={()=>setOpen(true)}>Login</Button>}
        </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;