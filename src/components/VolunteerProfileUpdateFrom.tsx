import React, { useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControlLabel,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

// Define the shape of your form data
interface FormValues {
  city: string;
  country: string;
  phone: string;
  availability: string;
  interests: string[]; // Interests should always be an array of strings
  skills: string[]; // Skills should always be an array of strings
}

const ProfileUpdateForm: React.FC = () => {
  // Initialize state with the correct type
  const [formValues, setFormValues] = useState<FormValues>({
    city: "",
    country: "",
    phone: "",
    availability: "",
    interests: [], // Always an array of strings
    skills: [], // Always an array of strings
  });

  // Handle change in input fields
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, checked, type } = e.target;
//     if (type === "checkbox") {
//       // Handle checkbox logic
//       setFormValues((prev) => {
//         const updatedArray = checked
//           ? [...prev[name as keyof FormValues], value] // Add value if checked
//           : prev[name as keyof FormValues].filter((item) => item !== value); // Remove value if unchecked
//         return { ...prev, [name]: updatedArray };
//       });
//     } else {
//       setFormValues({ ...formValues, [name]: value });
//     }
//   };

  // Handle form submission (optional)
  const handleSubmit = () => {
    console.log("Updated Profile:", formValues);
  };

  return (
    <Box  component={Paper}sx={{ p: 3, width: "100%", maxWidth: 600, margin: "auto" }}>
      <Typography variant="h6" sx={{ mb: 2 ,color:"primary.main"}}>
        Update Your Profile
      </Typography>
      
      <form onSubmit={(e) => e.preventDefault()}>
        {/* City and Country */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={6} >
            <TextField
            size='small'
              fullWidth
              label="First Name"
              name="firstName"
              value={formValues.city}
            //   onChange={handleChange}
              required
            />
          </Grid>
          <Grid  size={6}>
            <TextField
            size="small"
              fullWidth
              label="Last Name"
              name="lastName"
              value={formValues.city}
            //   onChange={handleChange}
              required
            />
          </Grid>
          <Grid size={6}>
            <TextField
            size='small'
              fullWidth
              label="Country"
              name="country"
              value={formValues.country}
            //   onChange={handleChange}
              required
            />
          </Grid>
        

        {/* Phone Number */}
        <Grid size={6}>
            <TextField
            size='small'
              fullWidth
              label="Phone Number"
              name="phone"
              value={formValues.phone}
            //   onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />
        </Grid>
        </Grid>

        {/* Availability */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Availability</InputLabel>
          <Select
          size='small'
            label="Availability"
            name="availability"
            value={formValues.availability}
            // onChange={handleChange}
            required
          >
            <MenuItem value="weekdays">Weekdays</MenuItem>
            <MenuItem value="weekends">Weekends</MenuItem>
            <MenuItem value="available">Available</MenuItem>
          </Select>
        </FormControl>

        {/* Interests */}
        <Typography variant="body2" sx={{ mb: 1 ,textAlign:'start',color:"primary.main" }}>
          Interests:
        </Typography>
        {["Health", "Education", "Environment", "Technology"].map((interest) => (
          <FormControlLabel
            key={interest}
            control={
              <Checkbox
                name="interests"
                value={interest}
                checked={formValues.interests.includes(interest)}
                // onChange={handleChange}
              />
            }
            label={interest}
          />
        ))}
        
        {/* Skills */}
        <Typography variant="body2" sx={{ mb: 1 ,textAlign:'start' ,color:"primary.main"}}>
          Skills:
        </Typography>
        {["Leadership", "Communication", "Problem-Solving", "Teamwork"].map((skill) => (
          <FormControlLabel
            key={skill}
            control={
              <Checkbox
                name="skills"
                value={skill}
                checked={formValues.skills.includes(skill)}
                // onChange={handleChange}
              />
            }
            label={skill}
          />
        ))}

        {/* Deactivate Account Button */}
        <Button
          variant="outlined"
          color="error"
          sx={{ mt: 2 }}
          onClick={() => alert("Account Deactivated!")}
        >
          Deactivate Account
        </Button>

        {/* Submit Button */}
        <Button
          variant="outlined"
          sx={{ mt: 2, ml: 2 }}
          onClick={handleSubmit}
        >
          Update Profile
        </Button>
      </form>
    </Box>
  );
};

export default ProfileUpdateForm;
