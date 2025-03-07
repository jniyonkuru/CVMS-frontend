import React, { useState } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import OrganizationRegistrationForm from './organizationRegistration';
import VolunteerRegistrationForm from './volunteerRegistrationForm';

const HeroSection: React.FC = () => {
  const [isVolunteerOpen, setVolunteerOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  const closeVolunteerForm = () => {
    setVolunteerOpen(false);
  };

  const closeOrganizationForm = () => {
    setRegisterOpen(false);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundImage: 'url(/herosection2.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
      }}
    >
      {/* Dark overlay for better readability */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Subtle dark overlay
          zIndex: 1,
        }}
      />
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <VolunteerRegistrationForm open={isVolunteerOpen} handleClose={closeVolunteerForm} />
        <OrganizationRegistrationForm open={isRegisterOpen} handleClose={closeOrganizationForm} />

        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2, letterSpacing: '1px' }} gutterBottom>
          Join Hands, Make a Difference!
        </Typography>
        <Typography variant="h5" sx={{ mb: 5, maxWidth: '700px', mx: 'auto', fontWeight: 300 }}>
          Find volunteer opportunities, connect with your community, and create impact.
        </Typography>

        <Button
          variant="contained"
          sx={{
            mr: 2,
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            color: '#fff',
            backgroundColor: '#122F18',
            '&:hover': { backgroundColor: '#1E4854' },
          }}
          onClick={() => setRegisterOpen(true)}
        >
          Register as Organization
        </Button>
        <Button
          variant="outlined"
          sx={{
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            color: '#fff',
            borderColor: '#fff',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
          }}
          onClick={() => setVolunteerOpen(true)}
        >
          Register as a Volunteer
        </Button>
      </Container>
    </Box>
  );
};

export default HeroSection;
