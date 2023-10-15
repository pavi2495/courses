import React from "react";
import Course from "./Course"; // Import the Course component
import { List } from "@mui/material";
import colors from "../colors"; // Import the colors object

interface CourseListProps {
  courses: { title: string; body: string; createdDate: Date }[]; // Update the type to represent courses
  onDeleteCourse: (index: number) => void;
  onCourseClick: (index: number) => void;
}

const CourseList: React.FC<CourseListProps> = ({
  courses,
  onDeleteCourse,
  onCourseClick,
}) => {
  return (
    <List style={{ backgroundColor: colors.background }}>
      {courses.map((course, index) => (
        <Course
          key={index}
          title={course.title}
          onDelete={() => onDeleteCourse(index)}
          onClick={() => onCourseClick(index)}
          // Pass colors as props to the Course component if needed
        />
      ))}
    </List>
  );
};

export default CourseList;
