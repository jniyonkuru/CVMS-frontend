import React, { useState } from "react";
import { Box, Modal, Backdrop, Fade, TextField, Button, Typography, InputAdornment, IconButton, CircularProgress } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm,Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from "../hooks/useLogin";


const loginSchema = z.object({
    email: z.string().email("Please enter a valid email").min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 6 characters")
  });

interface Props{
  open:boolean,
  handleClose:(e:React.SyntheticEvent)=>void,
  user:"volunteer"|"organization"
}

const style={
  width:{xs:300,md:400},
  position:'absolute',
  top:'50%',
  left:'50%',
   transform:'translate(-50%,-50%)',
   bgcolor:'background.paper',
   padding:4,
   outline:0,
   borderRadius:"5px"


}

const LoginForm = ({open,handleClose,user}:Props) => {

  const{mutate,isPending}=useLogin(user);
    const { handleSubmit,reset, formState: { errors },control } = useForm({
        resolver: zodResolver(loginSchema),defaultValues:{
          email:"",
          password:''
        }
      });

  const [showPassword,setShowPassword]=useState(false);

 const  handleShowPassword=()=>{
       setShowPassword((prev)=>!prev)
  }

  const onSubmit =(data: { email: string; password: string }) => {
     mutate(data);
     reset();
  };

   return (
   
    <Modal
     open={open}
     onClose={handleClose}
     closeAfterTransition
     aria-labelledby="login-modal"
     aria-describedby="login-modal-description"
     slots={
       {backdrop:Backdrop}
     }
     slotProps={{
      backdrop:{
        timeout:1000
      }
     }}
    >
    <Fade in={open}>
    <Box sx={{...style}}>
      <IconButton sx={{position:'absolute', top:2, right:2}} onClick={handleClose}>
        <ClearIcon></ClearIcon>
      </IconButton>
    <Typography>Login</Typography>
    <form onSubmit={handleSubmit(onSubmit)}>

    <Controller name="email" control={control} render={({field:{onBlur,onChange,value}})=>(
       <TextField  margin="dense" fullWidth label="email" size='small' onChange={onChange} onBlur={onBlur} value={value}
       error={!!errors.email}
       helperText={errors.email ? errors.email.message : ""}/>
    )} rules={{required:true}} />

    <Controller name="password" control={control} render={({field:{onChange,onBlur,value}})=>(
        <TextField  margin="dense" fullWidth type={showPassword?'text':'password'} label="password" size='small'
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        error={!!errors.password}
        helperText={errors.password ? errors.password.message : ""}
       slotProps={{
        input:{
          endAdornment:(
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword}>
                {showPassword?<VisibilityOff/>:<Visibility/>}
              </IconButton>
            </InputAdornment>
          )
      }
       }}/>
     
    )}  rules={{required:true}}/>
    
   
     <Button type="submit" sx={{ mt:1 }} variant="outlined" disabled={isPending} >{isPending ? <CircularProgress size={20} sx={{color:"primary.main"}} /> : "Login"}</Button>
     </form>
    </Box>
    </Fade>
    </Modal>

);
};

export default LoginForm;
