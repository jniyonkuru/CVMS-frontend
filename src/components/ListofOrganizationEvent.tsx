import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  Stack,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { MoreVert, Schedule } from "@mui/icons-material";
import dayjs from "dayjs";
import { useAuth } from "../AuthContext";
import { useOpportunities,useUpdateOpportunity } from "../hooks/useOpportunities";


export interface EventItem {
  id:string,
  title: string;
  startDate: string; // ISO date format
  endDate: string;
  status: "open" | "closed";
}


const EventList: React.FC= () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(
    null
  );
  const {user}=useAuth();
  const {data,isLoading,isError}=useOpportunities(user._id);
  const [eventsData,setEventsData]=useState<EventItem[]>([]);
  const {mutate,isPending}=useUpdateOpportunity()

  useEffect(()=>{
  if(!isError&&!isLoading){
    const mapped= data?.map(event=>{
      return{
        id:event._id.toString(),
        title:event.title,
        startDate:event.startDate,
        endDate:event.endDate,
        status:event.status
      }
    })
    if(mapped){
      setEventsData(mapped)
    }
    
  }

  },[data])

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedEventId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedEventId(null);
  };

  const handleChangeStatus = (newStatus: "open" | "closed") => {
    if (selectedEventId !== null) {
      const update = {status:newStatus};
      mutate({opportunityId:selectedEventId,update})
      

    }
    handleCloseMenu();
  };

  return (
    <Card sx={{ maxWidth: 500, p: 2, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Organization Events
        </Typography>
        <Divider sx={{ mb: 2 }} />
  {eventsData.length===0&&<Typography>No events on this list yet</Typography>}
        <Stack spacing={2}>
          {eventsData.map((event, index) => (
            <Box
              key={index}
              sx={{
                p: 2,
                borderRadius: 2,
                boxShadow: 1,
                bgcolor: "#f9f9f9",
                position: "relative",
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1" fontWeight="bold">
                  {event.title}
                </Typography>

                {/* More Options Button */}
                <IconButton
                  size="small"
                  onClick={(e) => handleOpenMenu(e, event.id)}
                >
                  <MoreVert />
                </IconButton>
              </Box>

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
                  bgcolor: event.status === "open" ? "#4CAF50" : "#FF5722",
                  color: "#fff",
                }}
                size="small"
              />
            </Box>
          ))}
        </Stack>
      </CardContent>

      {/* Status Change Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={() => handleChangeStatus("open")}>Mark as Open</MenuItem>
        <MenuItem onClick={() => handleChangeStatus("closed")}>Mark as Closed</MenuItem>
      </Menu>
    </Card>
  );
};

export default EventList;
