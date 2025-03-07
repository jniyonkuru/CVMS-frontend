import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  Stack,
} from "@mui/material";
import { Event, Schedule } from "@mui/icons-material";
import dayjs from "dayjs";

 export interface EventItem {
  title: string;
  startDate: string; // ISO date format
  endDate: string;
  status: "Upcoming" | "Ongoing" | "Completed";
}

interface EventListProps {
  events: EventItem[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <Card sx={{ maxWidth: 500, p: 2, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Organization Events
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Stack spacing={2}>
          {events.map((event, index) => (
            <Box
              key={index}
              sx={{
                p: 2,
                borderRadius: 2,
                boxShadow: 1,
                bgcolor: "#f9f9f9",
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {event.title}
              </Typography>

              {/* Event Dates */}
              <Box display="flex" alignItems="center" gap={1}>
                <Schedule fontSize="small" color="primary" />
                <Typography variant="body2">
                  {dayjs(event.startDate).format("MMM DD, YYYY")} -{" "}
                  {dayjs(event.endDate).format("MMM DD, YYYY")}
                </Typography>
              </Box>

              {/* Event Status */}
              <Chip
                label={event.status}
                sx={{
                  mt: 1,
                  bgcolor:
                    event.status === "Upcoming"
                      ? "#2196F3"
                      : event.status === "Ongoing"
                      ? "#4CAF50"
                      : "#FF5722",
                  color: "#fff",
                }}
                size="small"
              />
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default EventList;
