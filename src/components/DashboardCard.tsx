import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import WorkIcon from "@mui/icons-material/Work";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import Grid from '@mui/material/Grid2';

const stats = [
  { label: "Total Volunteers", value: 120, icon: <PeopleIcon fontSize="large" color="primary" /> },
  { label: "Events Hosted", value: 35, icon: <EventIcon fontSize="large" color="secondary" /> },
  { label: "Hours Contributed", value: 540, icon: <WorkIcon fontSize="large" color="success" /> },
  { label: "Active Projects", value: 10, icon: <VolunteerActivismIcon fontSize="large" color="error" /> },
];

const DashboardCards: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, p:2 ,mr:-1}}>
  <Grid container spacing={1} width="100%" sx={{mr:8}}>
        {stats.map((stat, index) => (
          <Grid  key={index} size={{md:6}}>
            <Card sx={{ textAlign: "center", p: 2, boxShadow:3 , }} >
              <CardContent>
                {stat.icon}
                <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold" }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardCards;
