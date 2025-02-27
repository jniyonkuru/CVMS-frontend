import NavBar from "../components/NavBar";
import ProfileCard from "../components/DashboardProfileCard";
import DashboardCards from "../components/DashboardCard";
import ReviewsList from "../components/ReviewList";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ApplicationList from "../components/ApplicationList";

function VolunteerDashBoard() {
  return (
    <Box sx={{ mt: 6 }}>
      <NavBar />
      <Grid container>
        <Grid size={6}>
          <ProfileCard />
        </Grid>
        <Grid size={6}>
          <DashboardCards />
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
  );
}

export default VolunteerDashBoard;
