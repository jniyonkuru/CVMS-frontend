import { Box, Typography } from "@mui/material";
import ProfileUpdateForm from "../components/VolunteerProfileUpdateFrom";
import NavBar from "../components/NavBar";
import PagerWrapper from "../components/PagerWrapper";

import React from "react";

function VolunteerProfilePage() {
  return (
  <>
    <NavBar />
    <PagerWrapper>
        <ProfileUpdateForm />
    </PagerWrapper>
    </>
  );
}

export default VolunteerProfilePage;
