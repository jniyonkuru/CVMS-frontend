import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 4, mt: 4 }}>
      <Typography align="center" gutterBottom>
        © 2025 Community Volunteering Management System. All rights reserved.
      </Typography>
      <Typography align="center">
        <Link href="#" color="inherit" sx={{ mx: 1 }}>Privacy Policy</Link>
        <Link href="#" color="inherit" sx={{ mx: 1 }}>Terms of Service</Link>
      </Typography>
    </Box>
  );
};

export default Footer;