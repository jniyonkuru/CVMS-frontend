import React ,{useState}from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import OrganizationRegistrationForm from './organizationRegistration';
import VolunteerRegistrationForm from './volunteerRegistrationForm';



const HeroSection: React.FC = () => {

    const [isVolunteerOpen,setVolunteerOpen]=useState(false);
    const [isRegisterOpen,setRegisterOpen]=useState(false);


    const closeVolunteerForm=()=>{
        setVolunteerOpen(false)
    }

    const closeOrganizationForm=()=>{
        setRegisterOpen(false);
    }
  return (
    <Box
      sx={{
        backgroundImage: 'url(/herosection2.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Container>

        <VolunteerRegistrationForm open={isVolunteerOpen} handleClose={closeVolunteerForm}/>
        <OrganizationRegistrationForm open={isRegisterOpen} handleClose={closeOrganizationForm}/>
        <Typography variant="h2" sx={{fontWeight:"bold"}} gutterBottom>
          Join Hands, Make a Difference!
        </Typography>
        <Typography sx={{mb:8}} variant="h5" gutterBottom>
          Find volunteer opportunities, connect with your community, and create impact.
        </Typography>
        <Button variant="contained"  sx={{ mr: 2 ,color:"#fafafa" }} onClick={()=>setRegisterOpen(true)}>
          Register as Organization
        </Button>
        <Button onClick={()=>setVolunteerOpen(true)} variant="outlined" sx={{color:"#fafafa", borderColor:"#fafafa"}}>
          Register as a Volunteer
        </Button>
      </Container>
    </Box>
  );
};

export default HeroSection;