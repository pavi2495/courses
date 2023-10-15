import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  OutlinedInput,
  Stack,
  Box,
  Typography,
  Pagination,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Course, createCourse, deleteCourse, getCourses } from "../api";
import colors from "../colors";
import DeleteConfirmationDialogBox from "../components/DeleteConfirmDialogBox";
import CourseDialogBox from "../components/CourseDialogBox";

const HomePage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState({ id: -1, name: "" });
  const [newCourse, setNewCourse] = useState({
    name: "",
    members: 0,
    coachId: 0,
    description: "",
  });
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedCourse, setEditedCourse] = useState({
    name: "",
    members: 0,
    coachId: 0,
    description: "",
  });
  const [totalCount, setTotalCount] = useState(0);
  const theme = useTheme();

  // Pagination
  const itemsPerPage = 10;
  const homePagePageListRef = useRef<HTMLDivElement>(null);
  const [homePageFetchNextPage, setHomePageFetchNextPage] = useState({
    page: 1,
    limit: itemsPerPage,
  });

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditedCourse({ name: "", members: 0, coachId: 0, description: "" });
  };

  const MAX_description_LENGTH = 1000;

  const fetchData = async () => {
    try {
      const updatedCourses = await getCourses(
        homePageFetchNextPage.page,
        homePageFetchNextPage.limit
      );
      setTotalCount(updatedCourses.totalCount);
      setCourses(updatedCourses.courses); // Update the state with the new courses data
    } catch (error) {
      // Handle error fetching courses
      console.error("Error fetching courses:", error);
    }
  };

  // Use useEffect to fetch updated courses whenever newCourse changes
  useEffect(() => {
    // Fetch updated courses whenever newCourse changes
    fetchData();
  }, [newCourse]); // Dependency array with newCourse ensures the effect runs whenever newCourse changes

  useEffect(() => {
    fetchData();
  }, [homePageFetchNextPage.page, homePageFetchNextPage.limit]);

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
      // Delete course using the API function
      await deleteCourse(courseToDelete.id);
      const updatedCourses = courses.filter(
        (course) => course.id !== courseToDelete.id
      );
      setCourses(updatedCourses);
      handleDeleteConfirmationClose();
    } catch (error) {
      // Handle error deleting course
      console.error("Error deleting course:", error);
    }
  };

  const handleSaveCourse = async (courseData: {
    name: string;
    members: number;
    coachId: number;
    description: string;
  }) => {
    try {
      // Truncate description if it exceeds 1000 characters
      const truncatedDescription = courseData.description.slice(
        0,
        MAX_description_LENGTH
      );

      const savedCourse = await createCourse({
        name: courseData.name,
        members: courseData.members,
        coachId: courseData.coachId,
        description: truncatedDescription,
      });

      setIsDialogOpen(false);
      setNewCourse({
        name: courseData.name,
        members: courseData.members,
        coachId: courseData.coachId,
        description: truncatedDescription,
      });
      setEditedCourse({ name: "", members: 0, coachId: 0, description: "" });
    } catch (error) {
      // Handle error creating course
      console.error("Error creating course:", error);
    }
  };

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
        <Typography
          component={"h1"}
          sx={{
            color: colors.primary,
            textAlign: "center",
            marginBottom: "20px",
            lineHeight: "56px",
            fontSize: "45px",
            fontWeight: 600,
            fontFamily: "sans-serif",
            overflow: "hidden",
          }}
        >
          Courses
        </Typography>
        <Box
          ref={homePagePageListRef}
          sx={{
            overflowY: "auto",
            marginBottom: "20px",
            "&::-webkit-scrollbar": {
              width: "0.4em",
            },
            "&::-webkit-scrollbar-track": {
              "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,100,.1)",
              borderRadius: "10px",
            },
          }}
        >
          {courses.map((course) => (
            <div
              key={course.id}
              style={{
                backgroundColor: colors.secondary,
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "10px",
                position: "relative",
                display: "flex",
                alignItems: "center", // Align items vertically within each list item
                marginRight: "5px",
              }}
              onClick={() => navigate(`/course/${course.id}`)}
            >
              <div
                style={{
                  cursor: "pointer",
                  color: colors.primary, // Set the text color to primary color from the palette
                  flexGrow: 1,
                  marginRight: "10px",
                }}
              >
                <Typography
                  sx={{
                    color: colors.primary,
                    lineHeight: "28px",
                    fontSize: "20px",
                    fontWeight: 400,
                    fontFamily: "sans-serif",
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
              <IconButton
                color="secondary"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click propagation to the parent div
                  handleDeleteConfirmationOpen(course.id, course.name);
                }}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  color: colors.accent, // Set the icon color to accent color from the palette
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </Box>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center", // Center the items horizontally
            position: "fixed",
            bottom: "20px",
            left: "50%", // Center the stack in the middle of the screen
            transform: "translateX(-50%)", // Center the stack in the middle of the screen
          }}
        >
          <Pagination
            count={Math.ceil((totalCount || 0) / itemsPerPage)}
            size="small"
            // On page number selection
            onChange={(event, value) => {
              setHomePageFetchNextPage({
                ...homePageFetchNextPage,
                page: value,
              });
              homePagePageListRef.current?.scrollTo(0, 0);
            }}
            sx={{
              // Adjust font size of the pagination buttons
              "& .MuiPaginationItem-root": {
                fontSize: "0.6rem",
                minWidth: "30px",
                height: "30px",
              },
            }}
          />
        </Stack>

        <Fab
          color="primary"
          aria-label="add"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: colors.accent,
          }}
          onClick={handleOpenDialog}
        >
          <AddIcon style={{ color: colors.secondary }} />
        </Fab>

        <CourseDialogBox
          open={isDialogOpen}
          onClose={handleCloseDialog}
          onSave={handleSaveCourse}
          name={editedCourse.name}
          members={editedCourse.members}
          coachId={editedCourse.coachId}
          description={editedCourse.description}
          title={"Add New Course"}
        />

        <DeleteConfirmationDialogBox
          onOpenDialogBox={deleteConfirmationOpen}
          onClickDeleteButton={handleDeleteCourse}
          onCloseDialogBox={handleDeleteConfirmationClose}
          courseToDelete={{ id: courseToDelete.id, name: courseToDelete.name }}
        />
        <Stack
          direction={"row"}
          sx={{
            justifyContent: "center",
          }}
        ></Stack>
      </Stack>
    </Box>
  );
};

export default HomePage;
