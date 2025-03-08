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

import { useUpdateApplicationStatus } from "../hooks/useApplication";
export interface VolunteerApplication {
  id:string
  eventTitle: string;
  userName: string;
  applicationDate: string; // ISO date format
  status: "approved" | "rejected" | "pending";
}

// Interface for Props
interface VolunteerApplicationsListProps {
  applications: VolunteerApplication[];
}

const VolunteerApplicationsList: React.FC<VolunteerApplicationsListProps> = ({
  applications,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedApplicationId, setSelectedApplicationId] = React.useState<string | null>(null);
  const{mutate,isPending}=useUpdateApplicationStatus()

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedApplicationId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedApplicationId(null);
  };

  const handleApprove = () => {
    if (selectedApplicationId !== null) {
       mutate({applicationId:selectedApplicationId,updates:{status:"approved"}})
      handleMenuClose();
    }
  };

  const handleReject = () => {
    if (selectedApplicationId !== null) {
      mutate({applicationId:selectedApplicationId,updates:{status:"rejected"}})
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
  {applications.length===0&&<Typography>No applications yet On this list</Typography>}
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
                    application.status === "approved"
                      ? "#4CAF50"
                      : application.status === "rejected"
                      ? "#FF5722"
                      : "#2196F3",
                  color: "#fff",
                }}
                size="small"
              />
              <IconButton onClick={(e) => handleMenuOpen(e, application.id)}>
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