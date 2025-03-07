import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import CVMSLogo from './CVMSLogo';
import LoginForm from './loginForm';
import { useAuth } from '../AuthContext';

const Header: React.FC = () => {

  
    const [isOpen,setOpen]=useState(false);
    const {isAuthenticated,logout,isLoading}=useAuth()

    useEffect(()=>{
      if(isAuthenticated){
        handleClose()
      }
    },[isAuthenticated])
    const handleClose=()=>{
        setOpen(false)
    }
  return (
    <AppBar position="static" sx={{background:"linear-gradient(145deg, #1e4854, #c0d1d1)",borderRadius:"5px"}}>
      <Toolbar>
        <LoginForm open={isOpen} handleClose={handleClose}/>
        <Box sx={{display:"flex", justifyContent:"space-between",alignItems:"center",width:"100%"}}>
       <CVMSLogo sx={{ fontSize: 50, mr: 2 }} />
    {!isLoading&&<Box sx={{flex:1,}}>
        <Button sx={{color:"#fafafa"}} component={Link} to="#">Home</Button>
        <Button sx={{color:"#fafafa"}} component={Link} to="#keyFeatures">Opportunities</Button>
        {isAuthenticated&&<Button sx={{color:"#fafafa"}} component={Link} to="/dashboard">Dashboard</Button>}
        <Button sx={{color:"#fafafa"}} component={Link} to="#testimonialSection">Contact</Button>
       {isAuthenticated?<Button sx={{color:"#fafafa"}} onClick={logout}>Logout</Button> :<Button sx={{color:"#fafafa"}} onClick={()=>setOpen(true)}>Login</Button>}
        </Box>}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;