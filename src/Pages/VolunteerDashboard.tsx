import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Card, CardContent, Button } from "@mui/material";
import Grid from "@mui/material/Grid2"
import { Menu, Event, History, Message, Dashboard, Settings } from "@mui/icons-material";
import { useState } from "react";
import NavBar from "../components/NavBar";
import { GoBack } from "../components/NavBar";

const VolunteerDashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
         <NavBar/>
    <GoBack/>
      {/* ain Dashboard Content */}
      <Grid container spacing={3} sx={{ padding: 5 }}>
        {/* Volunteer Stats */}
        <Grid size={{xs:12,md:4}}>
          <Card>
            <CardContent>
              <Typography variant="h5">50 Hours Volunteered</Typography>
              <Typography variant="body2">This Month</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Events */}
        <Grid size={{xs:12,md:4}}>
          <Card>
            <CardContent>
              <Typography variant="h5">Next Event</Typography>
              <Typography variant="body2">Community Cleanup - Sat, 10 AM</Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                View Event
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Messages */}
        <Grid  size={{xs:12,md:4}}>
          <Card>
            <CardContent>
              <Typography variant="h5">New Messages</Typography>
              <Typography variant="body2">2 unread messages from coordinators</Typography>
              <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
                Open Inbox
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default VolunteerDashboard;
