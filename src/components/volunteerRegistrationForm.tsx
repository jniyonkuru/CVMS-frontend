import React, { useEffect, useState } from "react";
import { Box, Modal, Backdrop, Fade, TextField, Button, Typography, InputAdornment, IconButton, MenuItem, Select, InputLabel, FormControl, Checkbox, FormControlLabel, CircularProgress } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm,Controller } from "react-hook-form";
import volunteerValidationSchema, { volunteer } from "../types/volunteer.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import useRegisterVolunteer from "../hooks/useVolunteer";
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

const VolunteerRegistrationForm = ({ open, handleClose }: Props) => {
  const {  handleSubmit, reset,control, formState: { errors }} = useForm<volunteer>({
    resolver: zodResolver(volunteerValidationSchema),defaultValues:{
      firstName:'',
      lastName:"",
      email:'',
      password:'',
      phoneNumber:'',
      location:{
        city:'',
        country:''
      },
      interests:[],
      skills:[],
      availability:'flexible',
    }
  });

  const{mutate,isPending,isSuccess}=useRegisterVolunteer()

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (data: any) => {
     mutate(data)
   
  };
  useEffect(()=>{
 if(isSuccess){
 reset(); 
 handleClose();
 }
  },[isPending,isSuccess,mutate])

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
          <Typography variant="h6">Volunteer Registration</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{display:"flex", gap:2}}>
            <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            size="small"
            label="First name"
            fullWidth
            margin="normal"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
        )}
        rules={{required:true}} />
          <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            size="small"
            label="Last name"
            fullWidth
            margin="normal"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
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
           
         
 <Controller name="availability" control={control} render={({field:{onChange,onBlur,value}})=>(
     <FormControl fullWidth margin="dense" size="small">
     <InputLabel>Availability</InputLabel>
     <Select
       value={value}
       label="Availability"
       onChange={onChange}
       onBlur={onBlur}
       error={!!errors.availability}
     >
       <MenuItem value="weekdays">Weekdays</MenuItem>
       <MenuItem value="weekends">Weekends</MenuItem>
       <MenuItem value="flexible">Flexible</MenuItem>
     </Select>
   </FormControl>

 )} rules={{required:true}} />

            </Box>

            <Typography variant="body2" sx={{ mt: 2 }}>Skills:</Typography>

{  
  ['communication','leadership'].map((skill)=>(
    <Controller  key={skill}
    control={control}
    name="skills"  render={({field:{onChange,value}})=>(
      <FormControlLabel
      control={
        <Checkbox size="small"
          checked={value.includes(skill)}
          onChange={(e) => {
            const newInterests = e.target.checked
              ? [...value, skill]
              : value.filter((i: string) => i !== skill);
            onChange(newInterests);
          }}
        />
      }
      label={skill}
    />
    )} />
  ))
}

<Typography variant="body2" sx={{ mt: 2 }}>Interests:</Typography>

{  
  ['environment','healthcare','education'].map((interest)=>(
    <Controller  key={interest}
    control={control}
    name="interests"  render={({field:{onChange,value}})=>(
      <FormControlLabel
      control={
        <Checkbox size="small"
          checked={value.includes(interest)}
          onChange={(e) => {
            const newInterests = e.target.checked
              ? [...value, interest]
              : value.filter((i: string) => i !== interest);
            onChange(newInterests);
          }}
        />
      }
      label={interest}
    />
    )} />
  ))
}
           
            
            <Button  variant="outlined" type="submit" sx={{ mt: 1,display:'block' }} disabled={isPending}>
              {isPending?<CircularProgress  size={10} sx={{color:"primary.main"}}/>:"Register"}
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default VolunteerRegistrationForm;
