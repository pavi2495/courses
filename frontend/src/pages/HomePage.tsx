import React, { FC, useEffect, useRef, useState } from "react";
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
  Grid,
  styled,
  TypographyProps,
  BoxProps,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Course, createCourse, deleteCourse, getCourses } from "../api";
import CourseDialogBox from "../components/DialogBox/CourseDialogBox";
import SectionCard from "../components/SectionCard/SectionCard";
import { CreateButton } from "../components/Button/createButton";
import { FlexRow } from "../components/Flex/Flex";
import DeleteConfirmationDialogBox from "../components/DialogBox/DeleteConfirmDialogBox";
import { defaultColorTemplate } from "../UIProvider";

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

  interface CourseOverviewContentRowProps {
    id: number;
    courseName: string;
    members?: number;
    coachName?: string;
    description?: string;
  }

  const CourseOverviewContent = styled(Typography)<TypographyProps>(() => ({
    overflow: "hidden",
    textAlign: "center",
    fontWeight: 500,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: "10px",
  }));

  const CourseOverviewHeaderBox = styled(Box)<BoxProps>(() => ({
    borderRadius: "5px",
    color: "#00205B",
    backgroundColor: "#D1DBFF",
    height: "20px",
    // width: '70px',
    fontFamily: "'Poppins', normal",
    cursor: "pointer",
    padding: "3px 3px 3px 3px",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  }));

  const CourseOverviewHeaderTitle = styled(Typography)<TypographyProps>(() => ({
    overflow: "hidden",
    textAlign: "center",
    fontWeight: 600,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: "12px",
  }));

  const CourseOverviewContentRow: FC<CourseOverviewContentRowProps> = ({
    id,
    courseName,
    members,
    coachName,
    description,
  }) => {
    const navigate = useNavigate();

    return (
      <Grid
        container
        flex={1}
        sx={{
          padding: "10px",
        }}
      >
        <Grid
          item
          component={Stack}
          md={3}
          sm={3}
          xs={3}
          sx={{ justifyContent: "center" }}
        >
          <Box
            sx={{
              borderRadius: "10px",
              height: "20px",
              cursor: "pointer",
              padding: "4px 4px 4px 4px",
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              "&:hover": {
                background: "#D1DBFF",
              },
            }}
          >
            <CourseOverviewContent
              sx={{
                cursor: "pointer",
              }}
              onClick={() => {
                navigate(`/course/${id}`);
              }}
            >
              {courseName}
            </CourseOverviewContent>
          </Box>
        </Grid>
        <Grid
          item
          component={Stack}
          md={2}
          sm={2}
          xs={2}
          sx={{ justifyContent: "center" }}
        >
          <CourseOverviewContent> {members}</CourseOverviewContent>
        </Grid>
        <Grid
          item
          component={Stack}
          md={2}
          sm={2}
          xs={2}
          sx={{ justifyContent: "center" }}
        >
          <CourseOverviewContent> {coachName}</CourseOverviewContent>
        </Grid>
        <Grid
          item
          component={Stack}
          md={4}
          sm={4}
          xs={4}
          sx={{ justifyContent: "center" }}
        >
          <CourseOverviewContent> {description}</CourseOverviewContent>
        </Grid>
        <Grid
          item
          component={Stack}
          md={1}
          sm={1}
          xs={1}
          sx={{ justifyContent: "center" }}
        >
          <div style={{ display: "flex" }}>
            <DeleteIcon
              color="error"
              sx={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent click propagation to the parent div
                handleDeleteConfirmationOpen(id, courseName);
              }}
            ></DeleteIcon>
          </div>
        </Grid>
      </Grid>
    );
  };

  const CourseOverviewHeaderRow = () => {
    return (
      <Grid
        container
        flex={1}
        sx={{
          padding: "10px",
        }}
      >
        <Grid
          item
          component={Stack}
          md={3}
          sm={3}
          xs={3}
          sx={{ justifyContent: "center" }}
        >
          <CourseOverviewHeaderBox onClick={() => {}}>
            <CourseOverviewHeaderTitle>Course Name</CourseOverviewHeaderTitle>
          </CourseOverviewHeaderBox>
        </Grid>
        <Grid
          item
          component={Stack}
          md={2}
          sm={2}
          xs={2}
          sx={{ justifyContent: "center" }}
        >
          <CourseOverviewHeaderBox onClick={() => {}}>
            <CourseOverviewHeaderTitle>Members</CourseOverviewHeaderTitle>
          </CourseOverviewHeaderBox>
        </Grid>
        <Grid
          item
          component={Stack}
          md={2}
          sm={2}
          xs={2}
          sx={{ justifyContent: "center" }}
        >
          <CourseOverviewHeaderBox onClick={() => {}}>
            <CourseOverviewHeaderTitle>Coach</CourseOverviewHeaderTitle>
          </CourseOverviewHeaderBox>
        </Grid>
        <Grid
          item
          component={Stack}
          md={4}
          sm={4}
          xs={4}
          sx={{ justifyContent: "center" }}
        >
          <CourseOverviewHeaderBox onClick={() => {}}>
            <CourseOverviewHeaderTitle>
              Course Description
            </CourseOverviewHeaderTitle>
          </CourseOverviewHeaderBox>
        </Grid>
      </Grid>
    );
  };

  return (
    <React.Fragment>
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
      ></Box>
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
        aria-label="add"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: defaultColorTemplate.mainColor,
        }}
        onClick={handleOpenDialog}
      >
        <AddIcon style={{ color: "white" }} />
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
        courseToDelete={{
          id: courseToDelete.id,
          name: courseToDelete.name,
        }}
      />

      {/* <ProjectOverviewCreateAndEditModal
        open={createOrEditProjectModalOpen}
        onClose={() => {
          setCreateOrEditProjectModalOpen(false);
        }}
        onCreateProject={handleCreateProject}
        onUpdateProject={handleUpdateProject}
      /> */}
      <div style={{ padding: "20px" }}>
        <FlexRow sx={{ maxHeight: "50px", justifyContent: "right" }}>
          <CreateButton
            id="ProjectFundingHistoryCreateProjectButton"
            variant="contained"
            size="small"
            onClick={() => {
              handleOpenDialog();
            }}
          >
            Add Course
          </CreateButton>
        </FlexRow>
        <SectionCard
          id={"CMSCourseOverviewSection"}
          header="Course Overview"
          openAddModal={handleOpenDialog}
          disableEditing={true}
        >
          <CourseOverviewHeaderRow></CourseOverviewHeaderRow>
          {courses &&
            courses.map((course, index) => {
              return (
                <CourseOverviewContentRow
                  id={course?.id}
                  courseName={course?.name}
                  members={course?.members}
                  coachName={"Frau. Anna"}
                  description={course.description}
                />
              );
            })}
        </SectionCard>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
