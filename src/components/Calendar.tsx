import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface Props {
  events:Record<string,string>[];
}

export default function Calendar({ events }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<Record<string,string>[]>([]);

  const handleDateClick = (arg: { dateStr: string }) => {
    const clickedDate = new Date(arg.dateStr).toISOString().split("T")[0]; // Normalize format
    const eventsOnDate = events.filter(
      (event) => new Date(event.start).toISOString().split("T")[0] === clickedDate
    );

    console.log(clickedDate)
    setSelectedDate(arg.dateStr);
    setSelectedEvents(eventsOnDate);
    setOpen(true);
  };

  return (
    <Box
      sx={{
        maxWidth: "600px",
        margin: "auto",
        mt: 4,
        boxShadow: 3,
        borderRadius: 2,
        padding: 2,
      }}
    >
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="450px"
        dateClick={handleDateClick}
        events={events}
      />

      {/* Event Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Events on {selectedDate}</DialogTitle>
        <DialogContent sx={{ padding: 2 }}>
          {selectedEvents.length > 0 ? (
            selectedEvents.map((event, index) => (
              <div key={index}>
                <Typography variant="h6">{event.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Location:</strong> {event.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Volunteers Needed:</strong> {event.numberOfVolunteerNeeded}
                </Typography>
                <hr />
              </div>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No events on this day.
            </Typography>
          )}
          <Button
            onClick={() => setOpen(false)}
            color="primary"
            variant="outlined"
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
