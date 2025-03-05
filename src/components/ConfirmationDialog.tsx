import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";


interface Props{
    open:boolean,
    onClose:()=>void,
    onConfirm:()=>void,
    title:string,
    message:string
}

const ConfirmationDialog = ({ open, onClose, onConfirm, title, message }:Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title || "Are you sure?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message || "This action cannot be undone."}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={onConfirm} color="primary" variant="contained">Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};


export default ConfirmationDialog;

