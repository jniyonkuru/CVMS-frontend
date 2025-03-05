import React, { useEffect, useState } from "react";
import { Box, Modal, Backdrop, Fade, TextField, Button, Typography, InputAdornment, IconButton, Checkbox, FormControlLabel, CircularProgress } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm,Controller } from "react-hook-form";
import OrganizationValidationSchema,{organization} from "../types/organization.schema";
import useRegisterOrganization from "../hooks/useOrganization";

import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const style = {
height:'fit-content',
overflowY: 'auto',
marginY:1,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  padding: 4,
  outline: 0,
  borderRadius: "5px"
}

const OrganizationRegistrationForm = ({ open, handleClose }: Props) => {
  const {  handleSubmit, reset,control, formState: { errors }} = useForm<organization>({
    resolver: zodResolver(OrganizationValidationSchema),defaultValues:{
      name:'',
      email:'',
      password:'',
      phoneNumber:'',
      location:{
        city:'',
        country:''
      },
      focusArea:[],
    websiteUrl:'',
    missionStatement:'',
     
    }
  });

  const{mutate,isPending,isSuccess}=useRegisterOrganization();


  useEffect(()=>{
    if(isSuccess){
      handleClose()
    }
  },[isSuccess])

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (data: any) => {
     mutate(data)
    reset(); 
  };
 useEffect(()=>{
  if(isSuccess){
    reset();
    handleClose();
  }
 },[isSuccess,isPending,mutate])
  return (
    <Modal
      open={open}
      sx={{overflowY:"auto"}}
      onClose={handleClose}
      closeAfterTransition
      aria-labelledby="volunteer-registration-modal"
      aria-describedby="volunteer-registration-description"
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 1000
        }
      }}
    >
      <Fade in={open}>
        <Box sx={{ ...style }}>
          <IconButton sx={{ position: 'absolute', top: 2, right: 2 }} onClick={handleClose}>
            <ClearIcon />
          </IconButton>
          <Typography variant="h6">Organization Registration</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{display:"flex", gap:2}}>
            <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            size="small"
            label="Name"
            fullWidth
            margin="normal"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
        rules={{required:true}} />
          <Controller
        control={control}
        name="websiteUrl"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            size="small"
            label="WebsiteUrl"
            fullWidth
            margin="normal"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={!!errors.websiteUrl}
            helperText={errors.websiteUrl?.message}
          />
        )}
        rules={{required:true}}/>

            </Box>
            <Box sx={{display:"flex", gap:2}}>
           
            <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            size="small"
            label="email"
            fullWidth
            margin="normal"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )} rules={{required:true}}
      />
        
        <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            size="small"
            label="Password"
            fullWidth
            type={showPassword?"text":"password"}
            margin="normal"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={!!errors.password}
            helperText={errors.password?.message}
            slotProps={{
                input:{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
       ) }
              }}
          />
        )}
      />
          </Box>


          <Box sx={{display:"flex", gap:2}}>
           <Controller name="location.city" control={control} render={({field:{onChange,onBlur,value}})=>(
             <TextField
             margin="dense"
             fullWidth
             onChange={onChange}
             onBlur={onBlur}
             value={value}
             label="City"
             size="small"
             error={!!errors.location?.city}
             helperText={errors.location?.city?.message}
           />
           )}/>
            <Controller name="location.country" control={control} render={({field:{onChange,onBlur,value}})=>(
             <TextField
             margin="dense"
             fullWidth
             onChange={onChange}
             onBlur={onBlur}
             value={value}
             label="Country"
             size="small"
             error={!!errors.location?.country}
             helperText={errors.location?.country?.message}
           />
           )}/>

        
          </Box>
          <Box sx={{display:'flex',gap:2}}>
          <Controller name="phoneNumber" control={control} render={({field:{onChange,onBlur,value}})=>(
             <TextField
             margin="dense"
             fullWidth
             onChange={onChange}
             onBlur={onBlur}
             value={value}
             label="Phone Number"
             size="small"
             error={!!errors.phoneNumber}
             helperText={errors.phoneNumber?.message}
           />
          )} rules={{required:true}}/>
           
         

 </Box>
 <Controller
        control={control}
        name="missionStatement"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
          minRows={3}
          multiline
          maxRows={10}
            size="small"
            label="Mission Statement"
            fullWidth
            margin="normal"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={!!errors.missionStatement}
            helperText={errors.missionStatement?.message}
          />
        )} rules={{required:true}}
      />

<Typography variant="body2" sx={{ mt: 2 }}>FocusArea:</Typography>

{  
  ['environment','healthcare','education'].map((FocusArea)=>(
    <Controller  key={FocusArea}
    control={control}
    name="focusArea"  render={({field:{onChange,value}})=>(
      <FormControlLabel
      control={
        <Checkbox size="small"
          checked={value.includes(FocusArea)}
          onChange={(e) => {
            const newInterests = e.target.checked
              ? [...value, FocusArea]
              : value.filter((i: string) => i !== FocusArea);
            onChange(newInterests);
          }}
        />
      }
      label={FocusArea}
    />
    )} />
  ))
}
            
            <Button variant="outlined"  type="submit" sx={{ mt: 1, display:"block" }} disabled={isPending}>
              {isPending?<CircularProgress size={10} sx={{color:"primary.main",}}/>:"Register"}
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default OrganizationRegistrationForm;
