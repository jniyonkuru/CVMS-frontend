import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Chip,
  IconButton,
} from "@mui/material";
import {
  LocationOn,
  Email,
  Phone,
  Business,
  CalendarToday,
} from "@mui/icons-material";
import dayjs from "dayjs";

interface OrganizationProfileProps {
  name: string;
  mission: string;
  city: string;
  country: string;
  email: string;
  phoneNumber: string;
  interestAreas: string[];
  joinDate: string; 
}

const OrganizationProfileCard: React.FC<OrganizationProfileProps> = ({
  name,
  mission,
  city,
  country,
  email,
  phoneNumber,
  interestAreas,
  joinDate,
}) => {
  return (
    <Card sx={{ maxWidth: 400, p: 2, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        {/* Organization Name */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {name}
        </Typography>

        {/* Mission Statement */}
        <Typography variant="body2" color="text.secondary">
          "{mission}"
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Address */}
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Business fontSize="small" color="primary" />
          <Typography variant="body2"> {city}, {country}</Typography>
        </Box>

        {/* Email */}
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Email fontSize="small" color="primary" />
          <Typography variant="body2">{email}</Typography>
        </Box>

        {/* Phone Number */}
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Phone fontSize="small" color="primary" />
          <Typography variant="body2">{phoneNumber}</Typography>
        </Box>

        {/* Interest Areas */}
        <Typography variant="body2" fontWeight="bold" mt={2}>
          Interest Areas:
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
          {interestAreas.map((area) => (
            <Chip key={area} label={area} variant="outlined" size="small" />
          ))}
        </Box>

        {/* Join Date */}
        <Box display="flex" alignItems="center" gap={1} mt={2}>
          <CalendarToday fontSize="small" color="primary" />
          <Typography variant="body2">
            Joined: {dayjs(joinDate).format("MMMM DD, YYYY")}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrganizationProfileCard;
