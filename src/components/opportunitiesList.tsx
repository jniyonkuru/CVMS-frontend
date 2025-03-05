import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button } from "@mui/material";
import { useOpportunities } from "../hooks/useOpportunities";
import { Opportunity } from "../types/opportunity.schema";
import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useCreateApplication } from "../hooks/useApplication";
import ConfirmationDialog from './ConfirmationDialog';
import { toast } from "react-toastify";
import { ConstructionOutlined } from "@mui/icons-material";


const OpportunitiesList = () => {
  const { data: opportunities, isLoading, error } = useOpportunities();
  const [isConfirmModalOpen,setConfirmModalOpen]=useState(false);
  const{mutate,isPending} =useCreateApplication();
  const [selectedOpportunityId,setSelectedOpportunityId]=useState<string|null>(null)
  const {user,isAuthenticated}=useAuth()
  const handleCloseModal=()=>{
    setConfirmModalOpen(false);
  }
  const handleApplication=()=>{
    if (!selectedOpportunityId) return;
    if(!isAuthenticated){
      toast.warning("Please login first or register ");
      return;
    }
    if(isAuthenticated&&user.role!=="volunteer"){
      toast.warning("Only Volunteer user can apply!");
      return;
    }
    
    mutate(selectedOpportunityId)

  }

  if (isLoading) return <CircularProgress />;
  if (error) return <p>Error loading opportunities.</p>;

  return (
    <>
     <ConfirmationDialog message="" title='Are you sure .you want to apply ?' onConfirm={handleApplication} onClose={handleCloseModal} open={isConfirmModalOpen}/>

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
              <TableCell sx={{color:opportunity.status=="open"?"primary.light":"inherit"}}><Button   variant="outlined" onClick={()=>{
                setSelectedOpportunityId(opportunity._id)
                setConfirmModalOpen(true)}} sx={{textTransform:"none"}}>Apply</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default OpportunitiesList;
