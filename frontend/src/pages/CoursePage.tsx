import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  styled,
  TypographyProps,
  BoxProps,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { Course, getCourseById, updateCourse } from "../api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CourseDialogBox from "../components/DialogBox/CourseDialogBox";
import SectionCard from "../components/SectionCard/SectionCard";
import { FlexRow } from "../components/Flex/Flex";
import { CreateButton } from "../components/Button/createButton";

const CoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [editedCourse, setEditedCourse] = useState({
    name: "",
    members: 0,
    coachId: 0,
    description: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  interface CourseOverviewContentRowProps {
    id?: number;
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
          md={12}
          sm={12}
          xs={12}
          sx={{ justifyContent: "center", mb: 3 }}
        >
          <CourseOverviewHeaderBox onClick={() => {}}>
            <CourseOverviewHeaderTitle>Course Name</CourseOverviewHeaderTitle>
          </CourseOverviewHeaderBox>
        </Grid>

        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          sx={{ justifyContent: "center", mb: 3 }}
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
            >
              {courseName}
            </CourseOverviewContent>
          </Box>
        </Grid>

        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          sx={{ justifyContent: "center", mb: 3 }}
        >
          <CourseOverviewHeaderBox onClick={() => {}}>
            <CourseOverviewHeaderTitle>Members</CourseOverviewHeaderTitle>
          </CourseOverviewHeaderBox>
        </Grid>
        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          sx={{ justifyContent: "center", mb: 3 }}
        >
          <CourseOverviewContent> {members}</CourseOverviewContent>
        </Grid>
        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          sx={{ justifyContent: "center", mb: 3 }}
        >
          <CourseOverviewHeaderBox onClick={() => {}}>
            <CourseOverviewHeaderTitle>Coach</CourseOverviewHeaderTitle>
          </CourseOverviewHeaderBox>
        </Grid>
        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          sx={{ justifyContent: "center", mb: 3 }}
        >
          <CourseOverviewContent> {coachName}</CourseOverviewContent>
        </Grid>

        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          sx={{ justifyContent: "center", mb: 3 }}
        >
          <CourseOverviewHeaderBox onClick={() => {}}>
            <CourseOverviewHeaderTitle>
              Course Description
            </CourseOverviewHeaderTitle>
          </CourseOverviewHeaderBox>
        </Grid>

        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          sx={{ justifyContent: "center", mb: 3 }}
        >
          <CourseOverviewContent> {description}</CourseOverviewContent>
        </Grid>
      </Grid>
    );
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

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
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

      <div style={{ padding: "20px" }}>
        <FlexRow sx={{ maxHeight: "50px", justifyContent: "space-between" }}>
          <ArrowBackIcon
            sx={{
              color: "#00205B",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
          ></ArrowBackIcon>

          <CreateButton
            id="ProjectFundingHistoryCreateProjectButton"
            variant="contained"
            size="small"
            onClick={() => {
              handleOpenDialog();
            }}
          >
            Edit Course
          </CreateButton>
        </FlexRow>
        <SectionCard
          id={"CMSCourseOverviewSection"}
          header="Course Details"
          openAddModal={handleOpenDialog}
          disableEditing={true}
        >
          <CourseOverviewContentRow
            courseName={course?.name}
            members={course?.members}
            coachName={"Frau. Anna"}
            description={course.description}
          />
        </SectionCard>
      </div>
    </React.Fragment>
  );
};

export default CoursePage;
