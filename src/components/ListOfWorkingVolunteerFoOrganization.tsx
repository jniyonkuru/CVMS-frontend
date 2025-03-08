import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Modal, Box, Typography, Rating, TextField,
  CircularProgress
} from '@mui/material';
import { useApplicationsByOrg } from '../hooks/useApplication';
import dayjs from 'dayjs';
import { useCreateRatings } from '../hooks/useFeebacks';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const volunteers = [
  { id: 1, name: 'John Doe', startDate: '2021-01-01', event: 'Charity Run' },
  { id: 2, name: 'Jane Smith', startDate: '2021-02-15', event: 'Food Drive' },
  { id: 3, name: 'Alice Johnson', startDate: '2021-03-10', event: 'Book Donation' },
];

export default function WorkingVolunteerList() {
  const [open, setOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState<string|null>(null);
  const[activeVolunteers,setActiveVolunteers]=useState<any[]>([])
  const [rating, setRating] = useState({
    delivery: 1,
    friendliness: 1,
    responsiveness: 1,
    comments: ""
  });
 const {data:applications,isError,isLoading}=useApplicationsByOrg();
 const{mutate,isPending}=useCreateRatings();



  const handleOpen = (volunteer:string) => {
    setSelectedVolunteer(volunteer);
    setOpen(true);
  };


  const handleSubmit=()=>{
    if(!rating.comments||!selectedVolunteer){
      toast.warning("Comments can not be empty");
      return;
    }
    mutate({volunteerId:selectedVolunteer,rating})
    handleClose();
  }
  const handleClose = () => {
    setRating({
      delivery: 1,
      friendliness: 1,
      responsiveness: 1,
      comments: ""
    })
    setOpen(false);
    setSelectedVolunteer(null);
    
  };
  useEffect(()=>{
if(applications){
  const volunteers=applications.filter(app=>app.status==='approved').map(app=>{
    return{
      id:app.volunteerId._id.toString(),
      name:`${app.volunteerId.firstName} ${app.volunteerId.lastName}`,
      startDate:app.applicationDate ,
      event:app.opportunityId.title,

    }
  });
  setActiveVolunteers(volunteers)
}
  },[applications])
  

  return (

<Paper  elevation={3} sx={{
    p:2,
        mx: "auto",
        borderRadius: 3,
        backgroundColor: "#fff"
      }}>
        <Typography variant='h6' sx={{fontWeight:"bold",borderBottom:"1px solid #ddd",p:1}} gutterBottom>List Of Current Volunteers</Typography>
        {isLoading&&<CircularProgress/>}
   {activeVolunteers.length>0? <TableContainer     >
      <Table aria-label="simple table">
        <TableHead sx={{backgroundColor:"primary.main"}}>
          <TableRow sx={{color:"#fafafa" ,borderRadius:3}}>
            <TableCell sx={{color:"inherit"}}>Name</TableCell>
            <TableCell sx={{color:"inherit"}}align="right">Start Date</TableCell>
            <TableCell sx={{color:"inherit"}} align="right">Event</TableCell>
            <TableCell sx={{color:"inherit"}} align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activeVolunteers.map((volunteer) => (
        <TableRow key={volunteer.id} sx={{borderBottom: "1px solid #ddd"}}>
              <TableCell component="th" scope="row">
                {volunteer.name}
              </TableCell>
              <TableCell align="right">{dayjs(volunteer.applicationDate).format("MMM DD, YYYY")}</TableCell>
              <TableCell align="right">{volunteer.event}</TableCell>
              <TableCell align="right">
                <Button variant="outlined" onClick={() => handleOpen(volunteer.id)}>
                  Rate
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6">Delivery</Typography>
          <Rating
            name="delivery"
            value={rating.delivery}
            onChange={(event, newValue) => {
              setRating((prev) => ({ ...prev, delivery: newValue?? prev.delivery }));
            }}
          />

          <Typography variant="h6" sx={{ mt: 2 }}>Friendliness</Typography>
          <Rating
            name="friendliness"
            value={rating.friendliness}
            onChange={(event, newValue) => {
              setRating((prev) => ({ ...prev, friendliness: newValue ?? prev.friendliness }));
            }}
          />

          <Typography variant="h6" sx={{ mt: 2 }}>Responsiveness</Typography>
          <Rating
            name="responsiveness"
            value={rating.responsiveness}
            onChange={(event, newValue) => {
              setRating((prev) => ({ ...prev, responsiveness: newValue ?? prev.responsiveness }));
            }}
          />

          <TextField
            value={rating.comments}
            multiline
            minRows={2}
            placeholder='Leave your comment here...'
            fullWidth
            sx={{ mt: 2 }}
            onChange={(event) => setRating((prev) => ({ ...prev, comments: event.target.value }))}
          />

          <Button variant='outlined' onClick={handleSubmit} sx={{ mt: 2 }}>
            Submit Rating
          </Button>
        </Box>
      </Modal>
    </TableContainer>:<Typography>No Active Volunteers on the List</Typography>}
    </Paper>
  );
}
