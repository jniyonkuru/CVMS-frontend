import React, { useEffect, useState } from "react";
import { Paper, List, ListItem, ListItemText, Box, Typography, Rating, Divider, CircularProgress } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useRatingsQuery } from "../hooks/useFeebacks";
import dayjs from "dayjs";

interface Review {
  id: string;
  name: string;
  responsiveness: number;
  friendliness: number;
  delivery: number;
  reviewText: string;
  dateSubmitted: string;
}

const ReviewsList: React.FC = () => {
  const { data, isLoading, isError } = useRatingsQuery();
  const [mapped, setMapped] = useState<Review[]>([]);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const mappedData: Review[] = data.map((review: any) => ({
        id: review._id,
        name: review.organizationId.name,
        responsiveness: review.responsiveness,
        friendliness: review.friendliness,
        delivery: review.delivery,
        reviewText: review.comments,
        dateSubmitted: dayjs(review.dateSubmitted).format("MMM DD, YYYY"),
      }));
      setMapped(mappedData);
    }
  }, [data, isLoading, isError]);

  if (isLoading) {
    return <CircularProgress sx={{ display: "block", margin: "auto", mt: 2 }} />;
  }

  if (isError) {
    return (
      <Typography variant="h6" sx={{ color: "error.main", textAlign: "center", mt: 2 }}>
        Something went wrong
      </Typography>
    );
  }

  return (
    <Paper
      sx={{
        p: 2,
        width: "100%",
        maxWidth: 600,
        margin: "auto",
        maxHeight: 400,
        overflowY: "auto",
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          color: "primary.main",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Reviews from Organizations
      </Typography>
      <List>
        {mapped.map((review, index) => (
          <Box key={review.id} sx={{ mb: 2 }}>
            <ListItem sx={{ alignItems: "flex-start" }}>
              <Box sx={{ flexGrow: 1 }}>
                <ListItemText
                  primary={
                    <Typography variant="h6" fontWeight="bold" color="text.primary">
                      {review.name}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      {["Delivery", "Responsiveness", "Friendliness"].map((label, i) => (
                        <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                          <Typography variant="body2" fontWeight={500} color="text.secondary">
                            {label}:
                          </Typography>
                          <Rating
                            value={
                              label === "Delivery"
                                ? review.delivery
                                : label === "Responsiveness"
                                ? review.responsiveness
                                : review.friendliness
                            }
                            readOnly
                            precision={0.5}
                            icon={<StarIcon sx={{ fontSize: 18 }} />}
                          />
                        </Box>
                      ))}
                      <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic", color: "text.secondary" }}>
                        "{review.reviewText}"
                      </Typography>
                      <Typography variant="caption" sx={{ display: "block", textAlign: "right", mt: 1, color: "text.disabled" }}>
                        {review.dateSubmitted}
                      </Typography>
                    </Box>
                  }
                />
              </Box>
            </ListItem>
            {index < mapped.length - 1 && <Divider sx={{ my: 1 }} />}
          </Box>
        ))}
      </List>
    </Paper>
  );
};

export default ReviewsList;
