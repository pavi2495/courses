import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { isNamedExportBindings } from "typescript";
import { defaultColorTemplate } from "../../UIProvider";
import { CancelButton } from "../Button/cancelButton";
import { ProceedButton } from "../Button/proceedButton";

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
  const [description, setDescription] = React.useState(initialDescription);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const MAX_CHARACTERS = 1000;
  const MAX_TITLE_CHARACTERS = 150;

  useEffect(() => {
    setIsSaveDisabled((prevState) => {
      const isNameEmpty = !name.trim();
      const isMembersInvalid = members === "0";
      const isDescriptionEmpty = !description.trim();

      return isNameEmpty || isMembersInvalid || isDescriptionEmpty;
    });
  }, [name, members, description]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value.slice(0, MAX_TITLE_CHARACTERS);
    setName(newName);

    setIsSaveDisabled((prevState) => {
      const isNameEmpty = !newName.trim();
      const isMembersInvalid = !members.trim();
      const isDescriptionEmpty = !description.trim();

      return isNameEmpty || isMembersInvalid || isDescriptionEmpty;
    });
  };

  const handleMembersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMembers = e.target.value.slice(0, 3); // Assuming maximum 3 digits for members

    // if (/^\d*$/.test(newMembers)) {
      setMembers(newMembers);
    // }

    setIsSaveDisabled((prevState) => {
      const isNameEmpty = !name.trim();
      const isMembersInvalid = !newMembers.trim();
      const isMembersGreater = parseInt(newMembers) > 100;
      const isDescriptionEmpty = !description.trim();

      return (
        isNameEmpty ||
        isMembersInvalid ||
        isDescriptionEmpty 
        // ||
        // isMembersGreater
      );
    });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = e.target.value.slice(0, MAX_CHARACTERS);
    setDescription(newDescription);
    setIsSaveDisabled((prevState) => {
      const isNameEmpty = !name.trim();
      const isMembersInvalid = !members.trim();
      const isDescriptionEmpty = !newDescription.trim();

      return isNameEmpty || isMembersInvalid || isDescriptionEmpty;
    });
  };

  useEffect(() => {
    if (!open) {
      setName(initialName);
      setMembers(initialMembers.toString());
      setDescription(initialDescription);
      setIsSaveDisabled(true);
    }
  }, [open, initialName, initialMembers, initialCoachId, initialDescription]);

  const handleSave = () => {
    onSave({
      name,
      members: parseInt(members),
      coachId: 1, // Default 1
      description,
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ minHeight: "200px" }}
      maxWidth={"md"}
    >
      <Typography
        sx={{ fontSize: "0.8rem", fontWeight: 600, paddingTop: 4, px: 3 }}
      >
        {initialTitle}
      </Typography>
      <DialogContent>
        <TextField
          fullWidth
          variant="outlined"
          margin="dense"
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
          InputProps={{
            style: {
              borderRadius: "5px",
              background: "#f7f7f7",
              marginBottom: "5px",
            },
          }}
        />

        <TextField
          fullWidth
          variant="outlined"
          value={members}
          onChange={handleMembersChange}
          placeholder="Members"
          InputProps={{
            style: {
              borderRadius: "5px",
              background: "#f7f7f7",
              marginBottom: "5px",
            },
          }}
        />
        <TextField
          disabled
          multiline
          value={"Frau. Anna"}
          fullWidth
          variant="outlined"
          placeholder="Coach"
          InputProps={{
            style: {
              borderRadius: "5px",
              background: "#f7f7f7",
              marginBottom: "5px",
            },
          }}
        />
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
          multiline
          rows={4}
          InputProps={{
            style: {
              borderRadius: "5px",
              background: "#f7f7f7",
              marginBottom: "5px",
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <CancelButton
          id="PMSModalCancelButton"
          onClick={() => {
            onClose();
          }}
        >
          Cancel
        </CancelButton>
        <ProceedButton
          id="PMSModalProceedButton"
          isSaveDisabled={isSaveDisabled}
          onClick={() => {
            handleSave();
          }}
        >
          Save
        </ProceedButton>
      </DialogActions>
    </Dialog>
  );
};

export default CourseDialogBox;
