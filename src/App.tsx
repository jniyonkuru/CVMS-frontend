
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginForm from './components/loginForm'
import './App.css'
import { useState } from 'react';

function App() {
   const [open,setOpen]=useState(true);
   const handleClose = () => setOpen(false);
  return (<>
    <ToastContainer position="top-right" autoClose={3000} />
  <LoginForm open={open} handleClose={handleClose} />
  </>
  )
}

export default App
