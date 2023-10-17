import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { defaultColorTemplate } from "../../UIProvider";
import { CancelButton } from "../Button/cancelButton";
import { ProceedButton } from "../Button/proceedButton";

interface DeleteConfirmationDialogBoxProps {
  onOpenDialogBox: boolean;
  onCloseDialogBox: () => void;
  onClickDeleteButton: () => void;
  courseToDelete: { id: number; name: string };
}

const DeleteConfirmationDialogBox: React.FC<
  DeleteConfirmationDialogBoxProps
> = ({
  onClickDeleteButton,
  onCloseDialogBox,
  onOpenDialogBox,
  courseToDelete,
}) => {
  return (
    <Dialog open={onOpenDialogBox} onClose={onCloseDialogBox}>
      <Typography
        sx={{ fontSize: "0.8rem", fontWeight: 600, paddingTop: 4, px: 3 }}
      >
        Delete Course
      </Typography>
      <Typography
        sx={{
          fontSize: "20px",
          paddingTop: 4,
          px: 3,
          py: 3,
        }}
      >{`Are you sure you want to delete the course "${courseToDelete.name}"?`}</Typography>

      <DialogActions>
        <CancelButton
          id="PMSModalCancelButton"
          onClick={() => {
            onCloseDialogBox();
          }}
        >
          Cancel
        </CancelButton>
        <ProceedButton
          id="PMSModalProceedButton"
          onClick={() => {
            onClickDeleteButton();
          }}
        >
          Delete
        </ProceedButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialogBox;
