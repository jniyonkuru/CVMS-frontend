import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  IconButton,
  CircularProgress,
  Box,
  Paper,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { useVolunteersQuery } from "../hooks/useVolunteer";
import { volunteer } from "../types/volunteer.schema";

const VolunteerList = () => {
  const { data: volunteers, isLoading } = useVolunteersQuery();

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 700,
        mx: "auto",
        mt: 3,
        p: 2,
        borderRadius: 3,
        backgroundColor: "#fff"
      }}
    >
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
      >
        Volunteers List
      </Typography>

      <List
        sx={{
          maxHeight: "400px",
          overflowY: "auto",
          p: 1,
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#bbb", borderRadius: 3 },
          "&::-webkit-scrollbar-track": { backgroundColor: "#f0f0f0" },
        }}
      >
        {volunteers.map((volunteer: volunteer) => (
          <ListItem
            key={volunteer._id}
            sx={{
              borderBottom: "1px solid #ddd",
              "&:hover": {
                backgroundColor: "#f9f9f9",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              },
              transition: "background 0.3s ease, box-shadow 0.3s ease",
              p: 2,
              borderRadius: 2,
            }}
          >
            <ListItemAvatar>
              <Avatar
                src={volunteer.profilePicture}
                alt={volunteer.firstName}
                sx={{ width: 50, height: 50, border: "2px solid #ddd" }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="h6">
                  {volunteer.firstName + " " + volunteer.lastName}
                </Typography>
              }
              secondary={
                <>
                  <Typography variant="body2" color="text.primary">
                    <strong>Skills:</strong> {volunteer.skills.join(", ")}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    <strong>Availability:</strong> {volunteer.availability}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Location:</strong>{" "}
                    {volunteer.location.city + ", " + volunteer.location.country}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    <strong>Joined:</strong>{" "}
                    {new Date(volunteer.dateJoined as unknown as Date).toLocaleDateString()}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        volunteer.status === "active"
                          ? "success.main"
                          : "error.main",
                    }}
                  >
                    <strong>Status:</strong> {volunteer.status}
                  </Typography>
                </>
              }
            />
            <IconButton edge="end" aria-label="email" href={`mailto:${volunteer.email}`}>
              <EmailIcon sx={{ color: "#1976d2" }} />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default VolunteerList;
