import React from "react";
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import { blue } from "@mui/material/colors";

const ProfileCard: React.FC = () => {
  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2 }}>
      <CardContent sx={{ textAlign: "center" }}>
        {/* Avatar */}
        <Avatar
          alt="User Avatar"
          sx={{
            width: 100,
            height: 100,
            margin: "auto",
            border: "1px solid",
            borderColor: "primary.main",
          }}
        />
        
        {/* Name */}
        <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" ,color:'primary.main' }}>
          John Doe
        </Typography>
        
        {/* Bio / Description */}
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Passionate about volunteering and making a difference in the community. Let's create impact together!
        </Typography>
        
        {/* Additional Info */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Typography variant="body2" color="textSecondary" sx={{ mr: 2 }}>
            120 Volunteers
          </Typography>
          <Typography variant="body2" color="textSecondary">
            35 Events
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
