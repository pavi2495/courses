import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { Course, deleteCourse, getCourseById, updateCourse } from "../api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import colors from "../colors";
import DeleteConfirmationDialogBox from "../components/DeleteConfirmDialogBox";
import CourseDialogBox from "../components/CourseDialogBox";

const CoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCourse, setEditedCourse] = useState({
    name: "",
    members: 0,
    coachId: 0,
    description: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState({ id: -1, name: "" });
  const theme = useTheme();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        if (id !== undefined) {
          const data: Course = await getCourseById(parseInt(id));
          setCourse(data);
          setEditedCourse({
            name: data.name,
            members: data.members,
            coachId: data.coachId,
            description: data.description,
          });
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const handleDeleteConfirmationOpen = (id: number, name: string) => {
    setCourseToDelete({ id, name });
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setCourseToDelete({ id: -1, name: "" });
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteCourse = async () => {
    try {
      await deleteCourse(courseToDelete.id);
      handleDeleteConfirmationClose();
      navigate("/");
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSaveCourse = async (newCourse: {
    name: string;
    members: number;
    coachId: number;
    description: string;
  }) => {
    try {
      if (id !== undefined) {
        const updatedCourse: Course = await updateCourse(parseInt(id), {
          name: newCourse.name,
          members: newCourse.members,
          coachId: newCourse.coachId,
          description: newCourse.description,
        });
        setCourse(updatedCourse);
        setEditedCourse({
          name: newCourse.name,
          members: newCourse.members,
          coachId: newCourse.coachId,
          description: newCourse.description,
        });
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleEditCourse = () => {
    handleOpenDialog();
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
      }}
    >
      <Stack
        sx={{
          position: "absolute",
          top: "0px",
          right: "0",
          left: "0",
          bottom: "0px",
          padding: "30px",
          backgroundColor: colors.lightBackground,
        }}
      >
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1px",
            width: "100%",
          }}
        >
          <div style={{ flexDirection: "row", display: "flex" }}>
            <IconButton
              sx={{ color: colors.primary }}
              onClick={() => navigate("/")}
            >
              <ArrowBackIcon />
            </IconButton>

            <Typography
              component={"h3"}
              sx={{
                color: colors.primary,
                textAlign: "center",
                lineHeight: "40px",
                fontSize: "30px",
                fontWeight: 400,
                fontFamily: "sans-serif",
                marginLeft: "20px",
                overflow: "hidden",
                textOverflow: "ellipsis", // Add ellipsis for overflowed text
                whiteSpace: "nowrap", // Prevent the text from wrapping to the next line
                [theme.breakpoints.down("md")]: {
                  maxWidth: "150px", // Set different maxWidth for mobile view (for screens smaller than 'md' breakpoint)
                },
                [theme.breakpoints.up("md")]: {
                  maxWidth: "400px", // Default maxWidth for screens larger than or equal to 'md' breakpoint
                },
              }}
            >
              {course.name}
            </Typography>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              sx={{ color: colors.accent }}
              onClick={handleEditCourse}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              sx={{ color: colors.accent }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent click propagation to the parent div
                handleDeleteConfirmationOpen(course.id, course.name);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <Box
          sx={{
            backgroundColor: colors.secondary,
            padding: "30px",
            marginBottom: "30px",
            height: "60%",
            borderRadius: "5px",
            scrollbarWidth: "thin", // Set the width of the scrollbar
            WebkitOverflowScrolling: "touch", // Enable smooth scrolling on iOS devices
            "&::-webkit-scrollbar": {
              width: "3px", // Width of the scrollbar track
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: colors.primary, // Color of the scrollbar thumb
            },
            flex: 1,
            overflow: "auto",
          }}
        >
          <Typography
            component={"h3"}
            sx={{
              color: colors.primary,
              lineHeight: "40px",
              fontSize: "30px",
              fontWeight: 400,
              fontFamily: "sans-serif",
              marginBottom: "20px",
            }}
          >
            Members and Coach Identification number
          </Typography>
          <Box
            sx={{
              color: colors.primary,
              lineHeight: "28px",
              fontSize: "20px",
              fontWeight: 400,
              fontFamily: "sans-serif",
              marginBottom: "40px",
            }}
          >
            There are {course.members}{" "}
            {course.members === 1 ? "member" : "members"} in the course{" "}
            {course.name} and the coach identification number is{" "}
            {course.coachId}.
          </Box>
          <Typography
            component={"h3"}
            sx={{
              color: colors.primary,
              lineHeight: "40px",
              fontSize: "30px",
              fontWeight: 400,
              fontFamily: "sans-serif",
              marginBottom: "20px",
            }}
          >
            About the course
          </Typography>
          <Box
            sx={{
              color: colors.primary,
              lineHeight: "28px",
              fontSize: "20px",
              fontWeight: 400,
              fontFamily: "sans-serif",
            }}
          >
            {course.description}
          </Box>
        </Box>
        <DeleteConfirmationDialogBox
          onOpenDialogBox={deleteConfirmationOpen}
          onClickDeleteButton={handleDeleteCourse}
          onCloseDialogBox={handleDeleteConfirmationClose}
          courseToDelete={{ id: courseToDelete.id, name: courseToDelete.name }}
        />

        <CourseDialogBox
          open={isDialogOpen}
          onClose={handleCloseDialog}
          onSave={handleSaveCourse}
          name={editedCourse.name}
          members={editedCourse.members}
          coachId={editedCourse.coachId}
          description={editedCourse.description}
          title={"Edit Course"}
        />
      </Stack>
    </Box>
  );
};

export default CoursePage;
