import React from "react";
import { Card, CardContent, Typography, Avatar, Box, CircularProgress } from "@mui/material";
import { useAuth } from "../AuthContext";
import { volunteer } from "../types/volunteer.schema";
import { organization } from "../types/organization.schema";


const ProfileCard: React.FC = () => {
  const {user,isLoading}=useAuth();
  if(isLoading){
    return(
      <CircularProgress/>
    )
  }
  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2 }}>
      <CardContent sx={{ textAlign: "center" }}>
    
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
        
        {user&&
        <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" ,color:'primary.main' }}>
          {user.role=="organization"? user.name:`${user.firstName},${user.lastName}`}
        </Typography>}
        
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Typography variant="body2" color="textSecondary" sx={{ mr: 2 }}>
            {user.email}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {user.phoneNumber}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
