import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useOrganizationsQuery } from "../hooks/useOrganization";
import { organization } from "../types/organization.schema";
import LanguageIcon from '@mui/icons-material/Language';

// Sample data for organizations
const organizations = [
  {
    id: 1,
    name: "Green Earth Initiative",
    mission: "Promoting sustainable living through community projects.",
    logo: "/logos/green-earth.png", // Change to actual logo paths
    joinedDate: "2022-05-14",
  },
  {
    id: 2,
    name: "Education for All",
    mission: "Ensuring quality education for underprivileged children.",
    logo: "/logos/education-for-all.png",
    joinedDate: "2023-01-10",
  },
  {
    id: 3,
    name: "Healthy Lives NGO",
    mission: "Advancing healthcare access in rural areas.",
    logo: "/logos/healthy-lives.png",
    joinedDate: "2021-11-20",
  },
];

const OrganizationList = () => {
  const navigate = useNavigate();
  const {data,isLoading}=useOrganizationsQuery();
  if(isLoading) return(
    <CircularProgress/>
  )
 

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2 }}>
      <List>
        {data.map((org:organization) => (
          <ListItem
            key={org._id}
            secondaryAction={
                <IconButton href={org.websiteUrl} target="_blank"  edge="end" aria-label="website">
                  <LanguageIcon/>
                </IconButton>
              }
            sx={{
              borderBottom: "1px solid #ddd",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <ListItemAvatar>
              <Avatar src={org.logo} alt={org.name} />
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="h6">{org.name}</Typography>}
              secondary={
                <>
                  <Typography variant="body2" color="text.secondary">
                    {org.missionStatement}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    <strong>Joined:</strong> {new Date(org.dateRegistered as unknown as string).toLocaleDateString()}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default OrganizationList;
