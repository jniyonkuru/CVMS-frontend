import React from "react";
import { Card, CardContent, Paper, Typography } from "@mui/material";
import Grid  from "@mui/material/Grid2"
import { VolunteerActivism, Event, AssignmentTurnedIn, PendingActions } from "@mui/icons-material";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Scatter } from "recharts";

// Sample Contribution Data
const data = [
  { month: "Jan", hours: 10, icon: <VolunteerActivism sx={{ color: "#ff9800" }} /> },
  { month: "Feb", hours: 15, icon: <Event sx={{ color: "#4caf50" }} /> },
  { month: "Mar", hours: 7, icon: <AssignmentTurnedIn sx={{ color: "#3f51b5" }} /> },
  { month: "Apr", hours: 20, icon: <PendingActions sx={{ color: "#e91e63" }} /> },
  { month: "May", hours: 12, icon: <VolunteerActivism sx={{ color: "#ff5722" }} /> },
  { month: "Jun", hours: 25, icon: <Event sx={{ color: "#009688" }} /> },
];

const VolunteerCards= () => {
  return (
    <Grid container spacing={3} sx={{ padding: 3 ,width:"100%"} }>
      {/* Cards Section */}
      <Grid  size={{md:6}}>
        <Card component={Paper} sx={{ bgcolor: "#ff9800", color: "white", display: "flex", alignItems: "center", padding: 1 }}>
          <VolunteerActivism sx={{ fontSize: 30, marginRight: 2 }} />
          <CardContent>
            <Typography variant="body2">Total Hours</Typography>
            <Typography variant="h6">120 hrs</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{md:6}}>
        <Card component={Paper} sx={{ bgcolor: "#4caf50", color: "white", display: "flex", alignItems: "center", padding: 1 }}>
          <Event sx={{ fontSize: 30, marginRight: 2 }} />
          <CardContent>
            <Typography variant="body2">Events Attended</Typography>
            <Typography variant="h6">15</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid  size={{md:6}}>
        <Card component={Paper} sx={{ bgcolor: "#3f51b5", color: "white", display: "flex", alignItems: "center", padding: 1 }}>
          <AssignmentTurnedIn sx={{ fontSize: 30, marginRight: 2 }} />
          <CardContent>
            <Typography variant="body2">Projects Completed</Typography>
            <Typography variant="h6">8</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{md:6}}>
        <Card component={Paper} sx={{ bgcolor: "#e91e63", color: "white", display: "flex", alignItems: "center", padding: 1 }}>
          <PendingActions sx={{ fontSize: 30, marginRight: 2 }} />
          <CardContent>
            <Typography variant="body2">Active Tasks</Typography>
            <Typography variant="h6">3</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Contribution Chart Section */}
      <Grid size={{xs:12}}>
        <Card component={Paper}>
          <CardContent>
            <Typography variant="body2" gutterBottom>
              Monthly Volunteer Contributions
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div style={{ backgroundColor: "#fff", padding: "10px", borderRadius: "5px", boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }}>
                        <Typography variant="subtitle1">{payload[0].payload.month}</Typography>
                        <Typography variant="body2">Hours: {payload[0].value}</Typography>
                        <div>{payload[0].payload.icon}</div>
                      </div>
                    );
                  }
                  return null;
                }} />
                <Line type="monotone" dataKey="hours" stroke="#ff5722" strokeWidth={3} />
                <Scatter dataKey="hours" fill="#ff9800" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default VolunteerCards;
