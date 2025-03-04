import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button } from "@mui/material";
import { useOpportunities } from "../hooks/useOpportunities";
import { Opportunity } from "../types/opportunity.schema";

const OpportunitiesList = () => {
  const { data: opportunities, isLoading, error } = useOpportunities();

  if (isLoading) return <CircularProgress />;
  if (error) return <p>Error loading opportunities.</p>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead >
          <TableRow sx={{backgroundColor:"primary.main",color:"#fafafa"}}>
            <TableCell sx={{color:"#fafafa"}}>Title</TableCell>
            <TableCell sx={{color:"#fafafa"}}>Location</TableCell>
            <TableCell sx={{color:"#fafafa"}}>Start Date</TableCell>
            <TableCell sx={{color:"#fafafa"}}>Duration</TableCell>
            <TableCell sx={{color:"#fafafa"}}>skills Required</TableCell>
            <TableCell sx={{color:"#fafafa"}}>Status</TableCell>
            <TableCell sx={{color:"#fafafa"}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {opportunities?.map((opportunity: Opportunity) => (
            <TableRow key={opportunity._id.toString()}>
              <TableCell>{opportunity.title}</TableCell>
              <TableCell>{opportunity.location.city}, {opportunity.location.country}</TableCell>
              <TableCell>{new Date(opportunity.startDate).toLocaleDateString()}</TableCell>
              <TableCell>{opportunity.duration}</TableCell>
              <TableCell>{opportunity.skillsRequired.join(",")}</TableCell>
              <TableCell sx={{color:opportunity.status=="open"?"primary.light":"inherit"}}>{opportunity.status}</TableCell>
              <TableCell sx={{color:opportunity.status=="open"?"primary.light":"inherit"}}><Button variant="outlined" sx={{textTransform:"none"}}>Apply</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OpportunitiesList;
