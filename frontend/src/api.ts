import axios, { AxiosResponse } from "axios";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3001";

export interface Course {
  id: number;
  name: string;
  members: number;
  coachId: number;
  description: string;
  createdDate: Date;
}

export interface AllCourses {
  courses: Course[];
  totalCount: number;
}

export const getCourseById = async (id: number): Promise<Course> => {
  try {
    const response: AxiosResponse<Course> = await axios.get(
      `${API_BASE_URL}/courses/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching course with ID ${id}:`, error);
    throw error;
  }
};

export const getCourses = async (
  page: number = 1,
  pageSize: number = 10
): Promise<AllCourses> => {
  try {
    const response: AxiosResponse<AllCourses> = await axios.get(
      `${API_BASE_URL}/courses`,
      {
        params: {
          page: page,
          pageSize: pageSize,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const createCourse = async (course: {
  name: string;
  members: number;
  coachId: number;
  description: string;
}): Promise<Course> => {
  try {
    const response: AxiosResponse<Course> = await axios.post(
      `${API_BASE_URL}/courses`,
      course
    );
    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

export const updateCourse = async (
  id: number,
  course: {
    name: string;
    members: number;
    coachId: number;
    description: string;
  }
): Promise<Course> => {
  try {
    const response: AxiosResponse<Course> = await axios.patch(
      `${API_BASE_URL}/courses/${id}`,
      course
    );
    return response.data;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

export const deleteCourse = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/courses/${id}`);
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};
