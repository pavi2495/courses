import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import colors from "../colors";
import { isNamedExportBindings } from "typescript";

interface CourseDialogBoxProps {
  open: boolean;
  onClose: () => void;
  onSave: (courseData: {
    name: string;
    members: number;
    coachId: number;
    description: string;
  }) => void;
  title: string;
  name: string;
  members: number;
  coachId: number;
  description: string;
}

const CourseDialogBox: React.FC<CourseDialogBoxProps> = ({
  open,
  onClose,
  onSave,
  title: initialTitle,
  name: initialName = "",
  members: initialMembers = 0,
  coachId: initialCoachId = 0,
  description: initialDescription = "",
}) => {
  const [name, setName] = React.useState(initialName);
  const [members, setMembers] = React.useState(initialMembers.toString());
  const [coachId, setCoachId] = React.useState(initialCoachId.toString());
  const [description, setDescription] = React.useState(initialDescription);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const MAX_CHARACTERS = 1000;
  const MAX_TITLE_CHARACTERS = 150;

  useEffect(() => {
    setIsSaveDisabled((prevState) => {
      const isNameEmpty = !name.trim();
      const isMembersInvalid = members === "0";
      const isCoachIdInvalid = coachId === "0";
      const isDescriptionEmpty = !description.trim();

      return (
        isNameEmpty ||
        isMembersInvalid ||
        isCoachIdInvalid ||
        isDescriptionEmpty
      );
    });
  }, [name, members, coachId, description]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value.slice(0, MAX_TITLE_CHARACTERS);
    setName(newName);

    setIsSaveDisabled((prevState) => {
      const isNameEmpty = !newName.trim();
      const isMembersInvalid = members === "0";
      const isCoachIdInvalid = coachId === "0";
      const isDescriptionEmpty = !description.trim();

      return (
        isNameEmpty ||
        isMembersInvalid ||
        isCoachIdInvalid ||
        isDescriptionEmpty
      );
    });
  };

  const handleMembersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMembers = e.target.value.slice(0, 3); // Assuming maximum 3 digits for members
    setMembers(newMembers);
    setIsSaveDisabled((prevState) => {
      const isNameEmpty = !name.trim();
      const isMembersInvalid = newMembers === "0";
      const isCoachIdInvalid = coachId === "0";
      const isDescriptionEmpty = !description.trim();

      return (
        isNameEmpty ||
        isMembersInvalid ||
        isCoachIdInvalid ||
        isDescriptionEmpty
      );
    });
  };

  const handleCoachIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCoachId = e.target.value.slice(0, 3); // Assuming maximum 3 digits for coachId
    setCoachId(newCoachId);
    setIsSaveDisabled((prevState) => {
      const isNameEmpty = !name.trim();
      const isMembersInvalid = members === "0";
      const isCoachIdInvalid = newCoachId === "0";
      const isDescriptionEmpty = !description.trim();

      return (
        isNameEmpty ||
        isMembersInvalid ||
        isCoachIdInvalid ||
        isDescriptionEmpty
      );
    });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = e.target.value.slice(0, MAX_CHARACTERS);
    setDescription(newDescription);
    setIsSaveDisabled((prevState) => {
      const isNameEmpty = !name.trim();
      const isMembersInvalid = members === "0";
      const isCoachIdInvalid = coachId === "0";
      const isDescriptionEmpty = !newDescription.trim();

      return (
        isNameEmpty ||
        isMembersInvalid ||
        isCoachIdInvalid ||
        isDescriptionEmpty
      );
    });
  };

  useEffect(() => {
    if (!open) {
      setName(initialName);
      setMembers(initialMembers.toString());
      setCoachId(initialCoachId.toString());
      setDescription(initialDescription);
      setIsSaveDisabled(true);
    }
  }, [open, initialName, initialMembers, initialCoachId, initialDescription]);

  const handleSave = () => {
    onSave({
      name,
      members: parseInt(members),
      coachId: parseInt(coachId),
      description,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        data-testid="initialTitleId"
        sx={{
          backgroundColor: colors.lightBackground,
          color: colors.primary,
          lineHeight: "30px",
          fontSize: "28px",
          fontWeight: 400,
          fontFamily: "sans-serif",
        }}
      >
        {initialTitle}
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: colors.lightBackground,
          color: colors.primary,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          margin="dense"
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="dense"
          value={members !== "0" ? members : ""}
          onChange={handleMembersChange}
          placeholder="Members"
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="dense"
          value={coachId !== "0" ? coachId : ""}
          onChange={handleCoachIdChange}
          placeholder="Coach ID"
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          margin="dense"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Description"
        />
      </DialogContent>
      <DialogActions style={{ backgroundColor: colors.secondary }}>
        <Button
          onClick={onClose}
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
          onClick={handleSave}
          sx={{
            color: colors.accent,
            lineHeight: "18px",
            fontSize: "16px",
            fontWeight: 600,
            fontFamily: "sans-serif",
          }}
          disabled={isSaveDisabled}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CourseDialogBox;
