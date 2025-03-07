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
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useOrganizationsQuery } from "../hooks/useOrganization";
import { organization } from "../types/organization.schema";
import LanguageIcon from "@mui/icons-material/Language";

const OrganizationList = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useOrganizationsQuery();

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
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
        Registered Organizations
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
        {data.map((org: organization) => (
          <ListItem
            key={org._id}
            secondaryAction={
              <IconButton href={org.websiteUrl} target="_blank" edge="end" aria-label="website">
                <LanguageIcon sx={{ color: "#1976d2" }} />
              </IconButton>
            }
            sx={{
              borderBottom: "1px solid #ddd",
              "&:hover": { backgroundColor: "#f9f9f9", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" },
              transition: "background 0.3s ease, box-shadow 0.3s ease",
              p: 2,
              borderRadius: 2,
            }}
          >
            <ListItemAvatar>
              <Avatar
                src={org.logo}
                alt={org.name}
                sx={{ width: 50, height: 50, border: "2px solid #ddd" }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="h6">{org.name}</Typography>}
              secondary={
                <>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    {org.missionStatement}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    <strong>Joined:</strong>{" "}
                    {new Date(org.dateRegistered as unknown as string).toLocaleDateString()}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default OrganizationList;
