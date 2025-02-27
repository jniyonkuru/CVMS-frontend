import { Box } from "@mui/material";
import Calendar from "../components/Calendar";
import NavBar from "../components/NavBar";

import React from "react";

function VolunteerEventsPage() {
  return (
    <Box>
      <NavBar />
      <Box sx={{ mt: 6 }}>
        <Calendar />
      </Box>
    </Box>
  );
}

export default VolunteerEventsPage;
