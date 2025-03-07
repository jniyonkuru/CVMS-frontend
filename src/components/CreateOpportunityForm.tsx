import React, { useEffect, useState } from "react";
import { Box, Modal, Backdrop, Fade, TextField, Button, Typography, IconButton,  Checkbox, FormControlLabel, CircularProgress } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { useForm,Controller } from "react-hook-form";
import { OpportunityValidationSchema ,Opportunity} from "../types/opportunity.schema";
import  DatePickerValue from "../components/DatePicker"
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateOpportunity } from "../hooks/useOpportunities";
import dayjs from "dayjs";


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

const CreateOpportunityForm = ({ open, handleClose }: Props) => {
  const {  handleSubmit, reset,control, formState: { errors ,dirtyFields}} = useForm<Opportunity>({
    resolver: zodResolver(OpportunityValidationSchema),defaultValues:{
    title:'',
    numberOfVolunteerNeeded:1,
    startDate:new Date(),
    endDate:new Date(),
      location:{
        city:'',
        country:''
      },
     skillsRequired:[],
     duration:""

    }
  });

  const{mutate,isPending,isSuccess}=useCreateOpportunity()

  

  const onSubmit = (data: any) => {
    if (!data.startDate || !data.endDate) {
      console.error("Start date and End date are required.");
      return;
    }
  
    const duration = dayjs(data.endDate).diff(dayjs(data.startDate), 'days');
    const opportunity = { ...data, duration: `${duration} days` };
  
    console.log("submitting", opportunity);
    mutate(opportunity);
  };

  useEffect(()=>{
 if(isSuccess){
 reset(); 
 handleClose();
 }
  },[isPending,isSuccess])

  return (
    <Modal
      open={open}
      sx={{overflowY:"auto"}}
      onClose={handleClose}
      closeAfterTransition
      aria-labelledby="opportunity-creation-modal"
      aria-describedby="opportunity-creation-description"
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
          <Typography variant="h6" sx={{fontWeight:'bold'}}>Create Event</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{display:"flex", gap:2}}>
            <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            size="small"
            label="Title"
            fullWidth
            margin="normal"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        )}
        rules={{required:true}} />
          <Controller
        control={control}
        name="numberOfVolunteerNeeded"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
           type="number"
            size="small"
            label="Number of Volunteer Needed"
            fullWidth
            margin="normal"
            value={value}
            onChange={(e)=>{
              onChange(Number(e.target.value))
            }}
            onBlur={onBlur}
            error={!!errors.numberOfVolunteerNeeded}
            helperText={errors.numberOfVolunteerNeeded?.message}
          />
        )}
        />

            </Box>
            <Box sx={{display:"flex", gap:2}}>
           
            <Controller
  control={control}
  name="startDate"
  render={({ field: { onChange, value } }) => (
    <DatePickerValue
      label="Start date"
      handleChange={(newValue) => onChange(newValue ? newValue.toDate() : null)}
      value={value ? dayjs(value) : null}
    />
  )}
/>
<Controller
  control={control}
  name="endDate"
  render={({ field: { onChange, value } }) => (
    <DatePickerValue
      label="End date"
      handleChange={(newValue) => onChange(newValue ? newValue.toDate() : null)}
      value={value ? dayjs(value) : null}
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
          
            <Typography variant="body2" sx={{ mt: 2 }}>Skills Required:</Typography>

{  
  ['communication','leadership','nurses','doctors'].map((skill)=>(
    <Controller  key={skill}
    control={control}
    name="skillsRequired"  render={({field:{onChange,value}})=>(
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
<Button  
  variant="outlined" 
  type="submit"
  sx={{ mt: 1, display: 'block' }} 
  disabled={isPending}
>
  {isPending ? <CircularProgress size={24} /> : "Create"}
</Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CreateOpportunityForm;
