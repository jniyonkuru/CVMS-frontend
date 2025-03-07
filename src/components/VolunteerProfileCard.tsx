import React from "react";
import { Card, CardContent, Typography, Avatar, Box, Skeleton } from "@mui/material";
import { Phone, MailOutline, AccessTime } from "@mui/icons-material";
import Grid from "@mui/material/Grid2"
import { useAuth } from "../AuthContext";

const ProfileCard = () => {
  const {isAuthenticated,user,isLoading}=useAuth();
  return (
    <Grid container justifyContent="center" sx={{ padding: 3 }}>
      <Grid sx={{size:{md:8}}}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
            background: "linear-gradient(145deg, #1e4854, #c0d1d1)", // Gradient background
            borderRadius: 2,
            boxShadow: 4, // Add shadow to give depth
          }}
        >
         { isLoading?<Skeleton variant="circular" width={100} height={100}/>: <Avatar
            sx={{ width: 100, height: 100, marginBottom: 2, border: "3px solid #fff" }} // White border around avatar
            src="https://via.placeholder.com/100"
            alt="User Profile"
          />}
          <CardContent sx={{ color: "white" }}> {/* White text color */}
            <Typography variant="h5" component="div" sx={{ marginBottom: 1 }}>
            {isLoading ? <Skeleton /> : `${user.firstName} ,${user.lastName}`}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              Passionate saving lives leveraging latest technology. Currently working as a software engineer,with a background in healthcare.
            </Typography>

            {/* Contact Information */}
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
              <MailOutline sx={{ marginRight: 1, color: "#fff" }} />
              <Typography variant="body2" sx={{ color: "#fff" }}>{isLoading ? <Skeleton /> : user.email}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
              <Phone sx={{ marginRight: 1, color: "#fff" }} />
              <Typography variant="body2" sx={{ color: "#fff" }}>{isLoading ? <Skeleton /> : user.phoneNumber}</Typography>
            </Box>

            {/* Skills and Interests */}
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="h6">Skills</Typography>
              <Typography variant="body2" sx={{ color: "#fff" }}>{isLoading ? <Skeleton /> :user.skills.join(",")}</Typography>
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="h6">Interests</Typography>
              <Typography variant="body2" sx={{ color: "#fff" }}>{isLoading ? <Skeleton /> : user.interests.join(',')}</Typography>
            </Box>

            {/* Active Time */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccessTime sx={{ marginRight: 1, color: "#fff" }} />
              <Typography variant="body2" sx={{ color: "#fff" }}>Active for 15 hours</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfileCard;
