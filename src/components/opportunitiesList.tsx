import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from "@mui/material";
import { useOpportunities } from "../hooks/useOpportunities";
import { Opportunity } from "../types/opportunity.schema";

const OpportunitiesList = () => {
  const { data: opportunities, isLoading, error } = useOpportunities();

  if (isLoading) return <CircularProgress />;
  if (error) return <p>Error loading opportunities.</p>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {opportunities?.map((opportunity: Opportunity) => (
            <TableRow key={opportunity._id.toString()}>
              <TableCell>{opportunity.title}</TableCell>
              <TableCell>{opportunity.location.city}, {opportunity.location.country}</TableCell>
              <TableCell>{new Date(opportunity.startDate).toLocaleDateString()}</TableCell>
              <TableCell>{opportunity.duration}</TableCell>
              <TableCell>{opportunity.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OpportunitiesList;
