import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface CourseProps {
  title: string;
  onDelete: () => void;
  onClick: () => void;
}

const Course: React.FC<CourseProps> = ({ title, onDelete, onClick }) => {
  return (
    <Card variant="outlined" style={{ marginBottom: "1rem" }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <IconButton onClick={onDelete} aria-label="delete">
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={onClick} aria-label="edit">
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default Course;
