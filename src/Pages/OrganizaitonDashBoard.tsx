import NavBar from "../components/NavBar";
import ProfileCard from "../components/DashboardProfileCard";
import DashboardCards from "../components/DashboardCard";
import ReviewsList from "../components/ReviewList";
import { AppBar, Box, Toolbar } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PagerWrapper from "../components/PagerWrapper";
import ApplicationList from "../components/ListOfVolunteerApplications";
import { ErrorBoundary } from "react-error-boundary";

const Fallback=({error,resetErrorBoundary}:{error:Error,resetErrorBoundary:any})=>{
  return(
    <div role="alert">
    <p>Something went wrong:</p>
    <pre style={{ color: "red" }}>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
  )
}
function OrganizationDashBoard
() {
  return (
  <>
  <AppBar position="static">
<Toolbar>
  <NavBar/>
  </Toolbar>
  </AppBar>
    <PagerWrapper>
    <Box sx={{ mt: 6 }}>
      <Grid container>
        <Grid size={6}>
          <ErrorBoundary FallbackComponent={Fallback}>
          <ProfileCard />
          </ErrorBoundary>
       
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
        <ApplicationList/>
        </Grid>
      </Grid>
      
    </Box>
    </PagerWrapper>
    </>
  );
}

export default OrganizationDashBoard
;
