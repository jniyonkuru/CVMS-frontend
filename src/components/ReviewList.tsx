import React from "react";
import { Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Box, Rating, Divider } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

interface Review {
  name: string;
  responsiveness: number;
  friendliness: number;
  delivery: number;
  reviewText: string;
  avatarUrl: string;
}

const reviews: Review[] = [
  {
    name: "World Vision",
    responsiveness: 3,
    friendliness: 3,
    delivery: 4.5,
    reviewText: "This is a fantastic product! Highly recommend it to everyone.",
    avatarUrl: "",
  },
  {
    name: "Partners in Health",
    responsiveness: 3,
    friendliness: 3,
    delivery: 3,
    reviewText: "It's good, but there are some areas for improvement.",
    avatarUrl: "",
  },
  {
    name: "Handicap Internationale",
    responsiveness: 3,
    friendliness: 3,
    delivery: 5,
    reviewText: "Absolutely loved it! Exceeded my expectations!",
    avatarUrl: "",
  },
];

const ReviewsList: React.FC = () => {
  return (
    <Paper sx={{ p: 2, width: '100%', maxWidth: 600, margin: 'auto', maxHeight: 400, overflow: "scroll", position: "relative", boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', position: "static", top: 0, height: 40, backgroundColor: "white", fontWeight: "bold", paddingLeft: 1 }}>
        Reviews
      </Typography>
      <List>
        {reviews.map((review, index) => (
          <Box key={index}>
            <ListItem sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <ListItemAvatar>
                <Avatar alt={review.name} src={review.avatarUrl} sx={{ width: 40, height: 40 }} />
              </ListItemAvatar>
              <Box sx={{ flexGrow: 1, paddingLeft: 2 }}>
                <ListItemText
                  primary={
                    <Typography variant="body1" fontWeight="bold" color="text.primary">
                      {review.name}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Box sx={{ display: "flex", justifyContent: 'flex-start', alignItems: "center", gap: 2 }}>
                        <Typography variant="body2" color="text.secondary">Delivery</Typography>
                        <Rating
                          value={review.delivery}
                          readOnly
                          precision={0.5}
                          icon={<StarIcon sx={{ fontSize: 18 }} />}
                        />
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: 'flex-start', alignItems: "center", gap: 2 }}>
                        <Typography variant="body2" color="text.secondary">Responsiveness</Typography>
                        <Rating
                          value={review.responsiveness}
                          readOnly
                          precision={0.5}
                          icon={<StarIcon sx={{ fontSize: 18 }} />}
                        />
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: 'flex-start', alignItems: "center", gap: 2 }}>
                        <Typography variant="body2" color="text.secondary">Friendliness</Typography>
                        <Rating
                          value={review.friendliness}
                          readOnly
                          precision={0.5}
                          icon={<StarIcon sx={{ fontSize: 18 }} />}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                        {review.reviewText}
                      </Typography>
                    </Box>
                  }
                />
              </Box>
            </ListItem>
            {index < reviews.length - 1 && <Divider sx={{ marginBottom: 1 }} />}
          </Box>
        ))}
      </List>
    </Paper>
  );
};

export default ReviewsList;
