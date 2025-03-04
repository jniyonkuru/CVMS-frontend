import { Box } from "@mui/material";
import Calendar from "../components/Calendar";
import NavBar from "../components/NavBar";
import PagerWrapper from "../components/PagerWrapper";

import React from "react";

function VolunteerEventsPage() {
  return (
    <>
  <NavBar/>
    <PagerWrapper>
        <Calendar />/
    </PagerWrapper>
    </>
  );
}

export default VolunteerEventsPage;
