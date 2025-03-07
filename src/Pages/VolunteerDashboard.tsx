import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  Menu,
  Event,
  History,
  Message,
  Dashboard,
  Settings,
} from "@mui/icons-material";
import { useState } from "react";
import NavBar from "../components/NavBar";
import { GoBack } from "../components/NavBar";
import { ErrorBoundary } from "react-error-boundary";
import DashboardCards from "../components/DashboardCard";
import ProfileCard from "../components/VolunteerProfileCard";
import ApplicationList from "../components/ListOfVolunteerApplications";
import ReviewsList from "../components/ReviewList";
import { Fallback } from "./OrganizaitonDashBoard";
import PagerWrapper from "../components/PagerWrapper";
import VolunteerCards from "../components/VolunteerDashboardCards";
const VolunteerDashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ position: "relative" }}>
      <NavBar />
      <PagerWrapper>
        <Box sx={{ mt: 3 }}>
          <Grid container>
            <Grid size={6}>
              <ErrorBoundary FallbackComponent={Fallback}>
                <ProfileCard />
              </ErrorBoundary>
            </Grid>
            <Grid size={6}>
              <VolunteerCards />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid size={6}>
              <ReviewsList />
            </Grid>
            <Grid size={6}>
              <ApplicationList />
            </Grid>
          </Grid>
        </Box>
      </PagerWrapper>
      <GoBack />
    </Box>
  );
};

export default VolunteerDashboard;
