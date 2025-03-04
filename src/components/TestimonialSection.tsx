import React from "react";
import { Box, Typography, Card, CardContent, Avatar, Rating } from "@mui/material";
import Grid from "@mui/material/Grid2"

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  feedback: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Volunteer1",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    feedback: "Volunteering here has been a life-changing experience! The community is amazing and welcoming.",
    rating: 5,
  },
  {
    id: 2,
    name: "Volunteer2",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    feedback: "I love how organized everything is. The opportunities to help people are incredible.",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Volunteer3",
    avatar: "https://randomuser.me/api/portraits/women/48.jpg",
    feedback: "A great place to meet like-minded people and make a real difference!",
    rating: 5,
  },
];

const TestimonialSection: React.FC = () => {
  return (
    <Box sx={{ my: 4, textAlign: "center", px: 2 }}>
      <Typography variant="h4" sx={{ color: "primary.main", mb: 3 }}>
        What Our Volunteers Say
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {testimonials.map((testimonial) => (
          <Grid size={4}>
            <Card sx={{ maxWidth: 345, p: 2, textAlign: "center", boxShadow: 3 }}>
              <Avatar src={testimonial.avatar} alt={testimonial.name} sx={{ width: 64, height: 64, mx: "auto", mb: 2 }} />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>{testimonial.name}</Typography>
                <Rating value={testimonial.rating} precision={0.5} readOnly />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  "{testimonial.feedback}"
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TestimonialSection;
