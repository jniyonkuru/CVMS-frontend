import { List, ListItem, ListItemText, Box, Paper, IconButton, Typography, Chip, CircularProgress, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useApplications from "../hooks/useApplication";
import { useEffect, useState } from "react";

interface Application {
  id: string;
  title: string;
  status: "Pending" | "Accepted" | "Rejected";
  applicationDate: string;
}

const statusColors: Record<string, "warning" | "success" | "error"> = {
  pending: "warning",
  accepted: "success",
  rejected: "error",
};

export default function ApplicationList() {
  const { data: applications, isLoading, isError, isSuccess } = useApplications();
  const [mappedData, setMappedData] = useState<any[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  useEffect(() => {
    if (isSuccess) {
      const newMapped = applications.map((application: any) => {
        return {
          id: application._id,
          title: application.opportunityId.title,
          status: application.status,
          applicationDate: application.applicationDate,
        };
      });
      setMappedData(newMapped);
    }
  }, [isSuccess]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  const handleStatusChange = () => {
    handleMenuClose();
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, app: Application) => {
    setAnchorEl(event.currentTarget);
    setSelectedApp(app);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedApp(null);
  };

  return (
    <Box component={Paper} sx={{ padding: 3, maxWidth: 600, mx: "auto", mt: 4, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h6" color="primary.main" sx={{ marginBottom: 2,fontWeight:"bold" }}>
        Your Applications
      </Typography>
      {mappedData.length === 0 && (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center" }}>
          No applications yet!
        </Typography>
      )}
      <List sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper", mx: "auto" }}>
        {mappedData.map((app: any) => (
          <ListItem key={app.id} divider sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.08)' }, padding: '12px 16px' }}>
            <ListItemText
              primary={
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "text.primary" }}>
                  {app.title}
                </Typography>
              }
              secondary={
                <>
                  <Chip
                    label={app.status}
                    size="small"
                    color={statusColors[app.status]}
                    sx={{ mr: 1, fontWeight: "bold", textTransform: "capitalize" }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Applied on: {new Date(app.applicationDate).toLocaleDateString()}
                  </Typography>
                </>
              }
            />
            <IconButton
              size="small"
              sx={{ ml: 2 }}
              onClick={(event) => handleMenuOpen(event, app)}
            >
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleStatusChange}>Change Status</MenuItem>
      </Menu>
    </Box>
  );
}
