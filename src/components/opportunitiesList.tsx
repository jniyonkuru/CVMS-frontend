import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button } from "@mui/material";
import { useOpportunities } from "../hooks/useOpportunities";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { useCreateApplication } from "../hooks/useApplication";
import ConfirmationDialog from "./ConfirmationDialog";
import { toast } from "react-toastify";

const OpportunitiesList = () => {
  const { data: opportunities, isLoading, error } = useOpportunities();
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const { mutate, isPending } = useCreateApplication();
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  const handleCloseModal = () => setConfirmModalOpen(false);

  const handleApplication = () => {
    if (!selectedOpportunityId) return;
    if (!isAuthenticated) {
      toast.warning("Please login first or register");
      return;
    }
    if (isAuthenticated && user.role !== "volunteer") {
      toast.warning("Only Volunteer users can apply!");
      return;
    }
    mutate(selectedOpportunityId);
  };

  useEffect(() => {
    console.log(selectedOpportunityId);
  }, [selectedOpportunityId]);

  if (isLoading) return <CircularProgress />;
  if (error) return <p>Error loading opportunities.</p>;

  return (
    <>
      <ConfirmationDialog 
        message="" 
        title="Are you sure you want to apply?" 
        onConfirm={handleApplication} 
        onClose={handleCloseModal} 
        open={isConfirmModalOpen} 
      />

      <TableContainer component={Paper} sx={{ minHeight: "300px", boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main", color: "#fafafa" }}>
              {['Title', 'Location', 'Start Date', 'Duration', 'Skills Required', 'Status', 'Action'].map((header) => (
                <TableCell key={header} sx={{ color: "#fafafa", fontWeight: "bold" }}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {opportunities?.map((opportunity) => (
              <TableRow key={opportunity._id?.toString()} hover>
                <TableCell>{opportunity.title}</TableCell>
                <TableCell>{`${opportunity.location.city}, ${opportunity.location.country}`}</TableCell>
                <TableCell>{new Date(opportunity.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{opportunity.duration}</TableCell>
                <TableCell>{opportunity.skillsRequired.join(", ")}</TableCell>
                <TableCell sx={{ color: opportunity.status === "open" ? "primary.light" : "inherit" }}>
                  {opportunity.status}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSelectedOpportunityId(opportunity._id.toString());
                      setConfirmModalOpen(true);
                    }}
                    sx={{ textTransform: "none", borderRadius: 1 }}
                  >
                    Apply
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OpportunitiesList;
