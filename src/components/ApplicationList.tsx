import React from "react";
import { Paper, List, ListItem, ListItemText, ListItemIcon, Typography, Divider, Box } from "@mui/material";
import EventIcon from '@mui/icons-material/Event';
import DateRangeIcon from '@mui/icons-material/DateRange';

interface Application {
  title: string;
  organizer: string;
  applicationDate: string;
  status: string;
}

const applications: Application[] = [
  {
    title: "Health Awareness Campaign",
    organizer: "Global Health Org",
    applicationDate: "2025-02-15",
    status: "Pending",
  },
  {
    title: "Environmental Awareness",
    organizer: "Green Earth Initiative",
    applicationDate: "2025-02-18",
    status: "Approved",
  },
  {
    title: "Technology for Good",
    organizer: "Tech4Good Foundation",
    applicationDate: "2025-02-20",
    status: "Rejected",
  },
];

const ApplicationList: React.FC = () => {
  return (
    <Paper sx={{ p: 2, width: '100%', maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h6" sx={{ mb: 2,fontSize:"20px",color:"primary.main" }}>
        Your Applications
      </Typography>
      <List>
        {applications.map((application, index) => (
          <Box key={index}>
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6" sx={{color:"primary.main"}}>{application.title}</Typography>}
                secondary={<Typography variant="body2">{application.organizer}</Typography>}
              />
            </ListItem>
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItemIcon>
                <DateRangeIcon />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">{application.applicationDate}</Typography>}
              />
            </ListItem>
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color={application.status === "Approved" ? "success.main" : application.status === "Rejected" ? "error.main" : "text.primary"}>
                {application.status}
              </Typography>
            </ListItem>
            {index < applications.length - 1 && <Divider />}
          </Box>
        ))}
      </List>
    </Paper>
  );
};

export default ApplicationList;
