import LoginForm from "../components/loginForm";
import { useNavigate } from "react-router-dom";

import React, { useState } from 'react';
 

function LoginPage() {
   const navigate= useNavigate()
    const [isOpen,setOpen]=useState(true);
    const handleClose=()=>{
    setOpen(false);
       navigate(-1);
    }
  return (
    <LoginForm open={isOpen} handleClose={handleClose}/>
  )
}

export default LoginPage