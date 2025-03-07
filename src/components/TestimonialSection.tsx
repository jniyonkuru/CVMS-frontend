import React from "react";
import { Box, Typography, Card, CardContent, Avatar, Rating } from "@mui/material";
import Grid from "@mui/material/Grid2";

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
    avatar: "",
    feedback: "Volunteering here has been a life-changing experience! The community is amazing and welcoming.",
    rating: 5,
  },
  {
    id: 2,
    name: "Volunteer2",
    avatar: "",
    feedback: "I love how organized everything is. The opportunities to help people are incredible.",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Volunteer3",
    avatar: "",
    feedback: "A great place to meet like-minded people and make a real difference!",
    rating: 5,
  },
];

const TestimonialSection: React.FC = () => {
  return (
    <Box sx={{ my: 6, textAlign: "center", px: 2 }}>
      <Typography
        variant="h4"
        sx={{
          color: "primary.main",
          fontWeight: "bold",
          mb: 4,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        What Our Volunteers Say
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {testimonials.map((testimonial) => (
          <Grid sx={{size:{md:6}}} key={testimonial.id}>
            <Card
              sx={{
                maxWidth: 360,
                p: 3,
                textAlign: "center",
                boxShadow: 4,
                borderRadius: 3,
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
              }}
            >
              <Avatar
                src={testimonial.avatar}
                alt={testimonial.name}
                sx={{
                  width: 80,
                  height: 80,
                  mx: "auto",
                  mb: 2,
                  border: "1px solid #1e4854",
                }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "secondary.main" }}>
                  {testimonial.name}
                </Typography>
                <Rating value={testimonial.rating} precision={0.5} readOnly />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 1,
                    fontStyle: "italic",
                    fontSize: "0.95rem",
                  }}
                >
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
