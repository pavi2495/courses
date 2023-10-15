import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import colors from "../colors";
import { useState } from "react";

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
      <DialogTitle
        style={{
          backgroundColor: colors.lightBackground,
          color: colors.primary,
          lineHeight: "30px",
          fontSize: "28px",
          fontWeight: 400,
          fontFamily: "sans-serif",
        }}
      >
        Delete Course
      </DialogTitle>
      <DialogContent
        style={{
          backgroundColor: colors.lightBackground,
          color: colors.primary,
          lineHeight: "28px",
          fontSize: "20px",
          fontWeight: 400,
          fontFamily: "sans-serif",
        }}
      >{`Are you sure you want to delete the course "${courseToDelete.name}"?`}</DialogContent>
      <DialogActions style={{ backgroundColor: colors.secondary }}>
        <Button
          onClick={onCloseDialogBox}
          sx={{
            color: colors.accent,
            lineHeight: "18px",
            fontSize: "16px",
            fontWeight: 600,
            fontFamily: "sans-serif",
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={onClickDeleteButton}
          sx={{
            color: colors.accent,
            lineHeight: "18px",
            fontSize: "16px",
            fontWeight: 600,
            fontFamily: "sans-serif",
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialogBox;
