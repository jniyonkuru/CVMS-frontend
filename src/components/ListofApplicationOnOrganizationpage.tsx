import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  Stack,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Event, Schedule, MoreVert } from "@mui/icons-material";
import dayjs from "dayjs";

// Interface for Volunteer Application
export interface VolunteerApplication {
  eventTitle: string;
  userName: string;
  applicationDate: string; // ISO date format
  status: "Approved" | "Rejected" | "Pending";
}

// Interface for Props
interface VolunteerApplicationsListProps {
  applications: VolunteerApplication[];
}

const VolunteerApplicationsList: React.FC<VolunteerApplicationsListProps> = ({
  applications,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedApplicationId, setSelectedApplicationId] = React.useState<number | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedApplicationId(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedApplicationId(null);
  };

  const handleApprove = () => {
    if (selectedApplicationId !== null) {
      console.log("Approved application:", applications[selectedApplicationId]);
      handleMenuClose();
    }
  };

  const handleReject = () => {
    if (selectedApplicationId !== null) {
      console.log("Rejected application:", applications[selectedApplicationId]);
      handleMenuClose();
    }
  };

  return (
    <Card sx={{ maxWidth: 500, p: 2, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Volunteer Applications
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <List>
          {applications.map((application, index) => (
            <ListItem
              key={index}
              sx={{
                p: 2,
                borderRadius: 2,
                boxShadow: 1,
                bgcolor: "#f9f9f9",
                mb: 2,
              }}
            >
              <ListItemText
                primary={application.eventTitle}
                secondary={
                  <>
                    <Typography variant="body2" component="span" display="block">
                      {application.userName}
                    </Typography>
                    <Typography variant="body2" component="span" display="block">
                      Applied on: {dayjs(application.applicationDate).format("MMM DD, YYYY")}
                    </Typography>
                  </>
                }
              />
              <Chip
                label={application.status}
                sx={{
                  bgcolor:
                    application.status === "Approved"
                      ? "#4CAF50"
                      : application.status === "Rejected"
                      ? "#FF5722"
                      : "#2196F3",
                  color: "#fff",
                }}
                size="small"
              />
              <IconButton onClick={(e) => handleMenuOpen(e, index)}>
                <MoreVert />
              </IconButton>
            </ListItem>
          ))}
        </List>

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleApprove}>Approve</MenuItem>
          <MenuItem onClick={handleReject}>Reject</MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default VolunteerApplicationsList;