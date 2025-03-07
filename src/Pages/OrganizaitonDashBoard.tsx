import NavBar from "../components/NavBar";
import ProfileCard from "../components/VolunteerProfileCard";
import DashboardCards from "../components/DashboardCard";
import ReviewsList from "../components/ReviewList";
import { Box, Button, Paper, Toolbar ,Tooltip} from "@mui/material";
import Grid from "@mui/material/Grid2";
import PagerWrapper from "../components/PagerWrapper";
import ApplicationList from "../components/ListOfVolunteerApplications";
import { ErrorBoundary } from "react-error-boundary";
import CreateOpportunityForm from "../components/CreateOpportunityForm";
import { useEffect, useState } from "react";
import OrganizationProfileCard from "../components/OrganizationProfileCard";
import { useAuth } from "../AuthContext";
import EventList from "../components/ListofOrganizationEvent";
import { EventItem } from "../components/ListofOrganizationEvent";
import VolunteerApplicationsList from "../components/ListofApplicationOnOrganizationpage";
import { VolunteerApplication } from "../components/ListofApplicationOnOrganizationpage";
import WorkingVolunteerList from "../components/ListOfWorkingVolunteerFoOrganization";
import { useApplicationsByOrg} from "../hooks/useApplication";

const events:EventItem[] = [
  {
    title: "Tech Conference 2023",
    startDate: "2023-11-15T09:00:00Z",
    endDate: "2023-11-17T18:00:00Z",
    status: "Upcoming"
  },
  {
    title: "Product Launch",
    startDate: "2023-10-01T10:00:00Z",
    endDate: "2023-10-01T12:00:00Z",
    status: "Completed"
  },
  {
    title: "Team Building Workshop",
    startDate: "2023-10-20T08:00:00Z",
    endDate: "2023-10-20T16:00:00Z",
    status: "Ongoing"
  },
  {
    title: "Annual General Meeting",
    startDate: "2023-12-05T14:00:00Z",
    endDate: "2023-12-05T17:00:00Z",
    status: "Upcoming"
  },
  {
    title: "Hackathon",
    startDate: "2023-09-25T09:00:00Z",
    endDate: "2023-09-27T21:00:00Z",
    status: "Completed"
  }
];


export const Fallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: any;
}) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};
function OrganizationDashBoard() {
  const [isOpen, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const {user,isAuthenticated,isLoading}=useAuth();
  const {data:applicationList,isLoading:applicationListLoading,error}=useApplicationsByOrg();
  const [apps,setApps]=useState<any[]>([]);

  useEffect(()=>{
  if(!applicationListLoading &&!error){
    const mapped= applicationList?.map((app:any)=>{
      return{
        eventTitle:app.opportunityId.title,
        userName:app.volunteerId.firstName,
        applicationDate:app.applicationDate,
        status:app.status

      }
    })
if(mapped?.length){
 setApps(mapped)
}
   
  }

  },[applicationList])

if(error){
  return <h1>{JSON.stringify(error.message)}</h1>
}

  return (
    <>
      <ErrorBoundary FallbackComponent={Fallback}>
        <CreateOpportunityForm open={isOpen} handleClose={handleClose} />
      </ErrorBoundary>

      <NavBar />
      <PagerWrapper>
      
        <Box sx={{ mt: 6, position: "relative" }}>
        <Tooltip title="Create new Event"placement="left">
          <Button 
            sx={{ position: "absolute", bottom:16, right:16,zIndex:2 ,borderRadius:"50%", boxShadow:3, backgroundColor:"primary.main", width:80, height:80, color:"#fafafa",fontSize:40,"&:hover":{transform:"scale(1.1)",boxShadow:6},transition:"transform 0.3s ease-in-out box-shadow 0.3s "}}
            variant="outlined"
            onClick={() => setOpen(true)}
          >
            + 
          </Button>
          </Tooltip>
          <Grid container>
            <Grid size={4}>
              <ErrorBoundary FallbackComponent={Fallback}>
            
              <OrganizationProfileCard  name={user.name} email={user.email} phoneNumber={user.phoneNumber} city={user.location.city} country={user.location.country} mission={user.missionStatement}  interestAreas={user.focusArea} joinDate={user.dateRegistered}/>
              </ErrorBoundary>
            </Grid>
            <Grid size={8}>
              <DashboardCards />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid size={3}>
              <EventList events={events}/>
            </Grid>
            <Grid size={4}>
              <VolunteerApplicationsList applications={apps}/>
            </Grid>
            <Grid size={5}>
              <WorkingVolunteerList/>
            </Grid>
          </Grid>
        </Box>
      </PagerWrapper>
    </>
  );
}

export default OrganizationDashBoard;
