import { List, ListItem, ListItemText,Box,Paper, IconButton, Typography, Chip, CircularProgress } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useApplications from "../hooks/useApplication";
import { useEffect, useState } from "react";

interface Application {
  id: string;
  title: string;
  status: "Pending" | "Accepted" | "Rejected";
  applicationDate: string;
}

// const applications: Application[] = [
//   { id: "1", title: "Community Cleanup", status: "Pending", applicationDate: "2024-03-01" },
//   { id: "2", title: "Teaching Assistant", status: "Accepted", applicationDate: "2024-02-15" },
//   { id: "3", title: "Food Drive Coordinator", status: "Rejected", applicationDate: "2024-02-20" },
// ];

const statusColors = {
  pending: "warning",
  approved: "success",
  rejected: "error",
};

export default function ApplicationList() {
const {data:applications,isLoading,isError,isSuccess}=useApplications();
const [mappedData,setMappedData]=useState<any[]|null>([]);
useEffect(()=>{
  if(isSuccess){
    const newMapped= applications.map((application:any)=>{
      return{
      id:application._id,
      title:application.opportunityId.title,
      status:application.status,
      applicationDate:application.applicationDate,
      }
    })
    setMappedData(newMapped)
  }
},[isSuccess])
if(isLoading){
  return(
    <CircularProgress/>
  )
}
if(isError){
  return(
    <h1>error</h1>
  )
}
  return (

    <Box component={Paper}>
        <Typography variant="h6">Your Applications</Typography>

   { mappedData?.length&&<List sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper", mx: "auto", mt: 4 }}>
      {mappedData.map((app:any) => (
        <ListItem key={app.id}  secondaryAction={
            <IconButton edge="end" aria-label="options">
            <MoreVertIcon />
          </IconButton>
       } divider>
          <ListItemText
            primary={<Typography variant="h6">{app.title}</Typography>}
            secondary={
              <>
                <Chip label={app.status} size="small" sx={{ mr: 1,color:'error' }} />
                <Typography variant="body2" color="text.secondary">
                  Applied on: {new Date(app.applicationDate).toLocaleDateString()}
                </Typography>
              </>
            }
          />
        
        </ListItem>
      ))}
    </List>
}
    </Box>
  );
}
