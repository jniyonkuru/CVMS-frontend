import { Box, Typography } from "@mui/material";
import ProfileUpdateForm from "../components/VolunteerProfileUpdateFrom";
import NavBar from "../components/NavBar";

import React from "react";

function VolunteerProfilePage() {
  return (
    <Box>
      <NavBar />
      <Box sx={{ mt: 6 }}>
        <ProfileUpdateForm />
      </Box>
    </Box>
  );
}

export default VolunteerProfilePage;
