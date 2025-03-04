import React from "react";
import { List, ListItem, ListItemText, Typography, Box } from "@mui/material";

// Sample data for volunteering opportunities
const opportunities = [
  {
    title: "Community Cleanup",
    organization: "Green Earth Initiative",
    location: "Kigali, Rwanda",
    skills: ["Teamwork", "Waste Management"],
    volunteersNeeded: 10,
  },
  {
    title: "Teaching Assistance",
    organization: "Education for All",
    location: "Musanze, Rwanda",
    skills: ["Teaching", "Patience"],
    volunteersNeeded: 5,
  },
  {
    title: "Health Awareness Campaign",
    organization: "Healthy Lives NGO",
    location: "Huye, Rwanda",
    skills: ["Public Speaking", "Medical Knowledge"],
    volunteersNeeded: 8,
  },
];

const VolunteerOpportunitiesList = () => {
  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
        Volunteer Opportunities
      </Typography>
      <List>
        {opportunities.map((opportunity, index) => (
          <ListItem key={index} sx={{ borderBottom: "1px solid #ddd", pb: 2 }}>
            <ListItemText
              primary={<Typography variant="h6">{opportunity.title}</Typography>}
              secondary={
                <>
                  <Typography variant="body2" color="text.primary">
                    <strong>Organization:</strong> {opportunity.organization}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    <strong>Location:</strong> {opportunity.location}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    <strong>Skills Required:</strong> {opportunity.skills.join(", ")}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    <strong>Volunteers Needed:</strong> {opportunity.volunteersNeeded}
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

export default VolunteerOpportunitiesList;
