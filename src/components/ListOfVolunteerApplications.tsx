import { List, ListItem, ListItemText,Box,Paper, IconButton, Typography, Chip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface Application {
  id: string;
  title: string;
  status: "Pending" | "Accepted" | "Rejected";
  applicationDate: string;
}

const applications: Application[] = [
  { id: "1", title: "Community Cleanup", status: "Pending", applicationDate: "2024-03-01" },
  { id: "2", title: "Teaching Assistant", status: "Accepted", applicationDate: "2024-02-15" },
  { id: "3", title: "Food Drive Coordinator", status: "Rejected", applicationDate: "2024-02-20" },
];

const statusColors = {
  Pending: "warning",
  Accepted: "success",
  Rejected: "error",
};

export default function ApplicationList() {
  return (

    <Box component={Paper}>
        <Typography variant="h6">Your Applications</Typography>
    <List sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper", mx: "auto", mt: 4 }}>
      {applications.map((app) => (
        <ListItem key={app.id}  secondaryAction={
            <IconButton edge="end" aria-label="options">
            <MoreVertIcon />
          </IconButton>
       } divider>
          <ListItemText
            primary={<Typography variant="h6">{app.title}</Typography>}
            secondary={
              <>
                <Chip label={app.status} color={statusColors[app.status] as any} size="small" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Applied on: {new Date(app.applicationDate).toLocaleDateString()}
                </Typography>
              </>
            }
          />
        
        </ListItem>
      ))}
    </List>
    </Box>
  );
}
