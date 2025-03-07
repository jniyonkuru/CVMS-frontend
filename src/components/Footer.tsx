import React from 'react';
import { Box, Typography, Link ,Paper} from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box component={Paper} sx={{ background:"linear-gradient(120deg,#c0d1d1,#1e4854)", color: 'white', p: 4, mt: 4,borderRadius:3 }}>
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