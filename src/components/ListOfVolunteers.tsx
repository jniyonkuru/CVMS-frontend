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
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { useVolunteersQuery } from "../hooks/useVolunteer";
import { volunteer } from "../types/volunteer.schema";



const VolunteerList = () => {
    const {data:volunteers,isLoading}=useVolunteersQuery();

    if(isLoading){
        return <CircularProgress/>
    }
  return (
    <List>
      {volunteers.map((volunteer:volunteer) => (
        <ListItem
          key={volunteer._id}
          sx={{
            borderBottom: "1px solid #ddd",
            "&:hover": { backgroundColor: "#f5f5f5" },
          }}
        >
          <ListItemAvatar>
            <Avatar src={volunteer.profilePicture} alt={volunteer.firstName} />
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant="h6">{volunteer.firstName +" "+volunteer.lastName}</Typography>}
            secondary={
              <>
                <Typography variant="body2" color="text.primary">
                  <strong>Skills:</strong> {volunteer.skills.join(", ")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Location:</strong> {volunteer.location.city +"," + volunteer.location.country }
                </Typography>
                <Typography variant="body2" color="text.primary">
                  <strong>Joined:</strong>{" "}
                  {new Date(volunteer.dateJoined as unknown as Date).toLocaleDateString()}
                </Typography>
              </>
            }
          />
          <IconButton
            edge="end"
            aria-label="email"
            href={`mailto:${volunteer.email}`}
          >
            <EmailIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default VolunteerList;
