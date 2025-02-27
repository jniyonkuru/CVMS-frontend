import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction" 
import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material'
import { useState } from 'react'


// function renderEventContent(eventInfo:any) {
//     return(
//       <>
//         <b>{eventInfo.timeText}</b>
//         <i>{eventInfo.event.title}</i>
//       </>
//     )
//   }

export default function Calendar() {

    const [open, setOpen] = useState(false); // Controls dialog visibility
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedEvents, setSelectedEvents] = useState<Record<string,string>[]>([]);
    const handleDateClick = (arg: { dateStr: string }) => {
        const eventsOnDate = events.filter((event) => event.date === arg.dateStr);
        setSelectedDate(arg.dateStr);
        setSelectedEvents(eventsOnDate);
        setOpen(true);
      };

      const events = [
        { title: 'Meeting', date: '2025-03-01' },
        { title: 'Conference', date: '2025-03-05' },
        { title: 'Workshop', date: '2025-03-06' },
      ];
  return (
    <Box sx={{ maxWidth: '500px',maxHeight:"400px", margin: 'auto', mt: 4, boxShadow: 3, borderRadius: 2 }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height="400px"
          dateClick={handleDateClick}
          events={events}
        />
         <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Events on {selectedDate}</DialogTitle>
        <DialogContent>
          {selectedEvents.length > 0 ? (
            selectedEvents.map((event, index) => (
              <p key={index}><strong>{event.title}</strong></p>
            ))
          ) : (
            <p>No events on this day.</p>
          )}
          <Button onClick={() => setOpen(false)} color="primary" variant='outlined'>Close</Button>
        </DialogContent>
      </Dialog>
      </Box>
  )
}