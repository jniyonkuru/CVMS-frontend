import React from "react";
import { Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Box, Rating, Divider } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

interface Review {
  name: string;
  rating: number;
  reviewText: string;
  avatarUrl: string;
}

const reviews: Review[] = [
  {
    name: "John Doe",
    rating: 4.5,
    reviewText: "This is a fantastic product! Highly recommend it to everyone.",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Jane Smith",
    rating: 3,
    reviewText: "It's good, but there are some areas for improvement.",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Mary Johnson",
    rating: 5,
    reviewText: "Absolutely loved it! Exceeded my expectations!",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
  },
];

const ReviewsList: React.FC = () => {
  return (
    <Paper sx={{ p: 2, width: '100%', maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Reviews
      </Typography>
      <List>
        {reviews.map((review, index) => (
          <Box key={index}>
            <ListItem sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <ListItemAvatar>
                <Avatar alt={review.name} src={review.avatarUrl} />
              </ListItemAvatar>
              <Box sx={{ flexGrow: 1 }}>
                <ListItemText
                  primary={
                    <Typography variant="body1" fontWeight="bold">
                      {review.name}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Rating
                        value={review.rating}
                        readOnly
                        precision={0.5}
                        icon={<StarIcon sx={{ fontSize: 18 }} />}
                      />
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {review.reviewText}
                      </Typography>
                    </Box>
                  }
                />
              </Box>
            </ListItem>
            {index < reviews.length - 1 && <Divider />}
          </Box>
        ))}
      </List>
    </Paper>
  );
};

export default ReviewsList;
