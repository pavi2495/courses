import requests
import os

# Get the API_BASE_URL environment variable or use http://localhost:3001 as the default
BASE_URL = os.getenv('API_BASE_URL', 'http://localhost:3001')


# Function to get a list of courses
def get_courses(page=1, page_size=10):
    url = f"{BASE_URL}/courses?page={page}&pageSize={page_size}"
    response = requests.get(url)
    return response.json()

# Function to create a new course
def create_course(course_data):
    url = f"{BASE_URL}/courses"
    response = requests.post(url, json=course_data)
    return response.json()

# Function to create a new course and return its ID
def create_course_and_get_id(course_data):
    created_course = create_course(course_data)
    return created_course.get('id')

# Function to update an existing course using its ID
def update_course(course_id, course_data):
    url = f"{BASE_URL}/courses/{course_id}"
    response = requests.patch(url, json=course_data)
    return response.json()

# Function to delete a course
def delete_course(course_id):
    url = f"{BASE_URL}/courses/{course_id}"
    response = requests.delete(url)
    if response.status_code == 200:
        print(f"Course with ID {course_id} deleted successfully.")
    else:
        print(f"Failed to delete course with ID {course_id}.")

# Example usage
if __name__ == "__main__":
    # Get list of courses
    courses = get_courses()
    print("List of Courses:")
    print(courses)
    # Create a new course and get its ID
    new_course_data = {
        "name": "New Course",
        "members": 50,
        "coachId": 1,
        "description": "This is a new course."
    }
    created_course_id = create_course_and_get_id(new_course_data)
    print(f"Created Course with ID: {created_course_id}")

    # Update the created course using its ID
    updated_course_data = {
        "name": "Updated Course Name",
        "members": 60,
        "coachId": 2,
        "description": "This course has been updated."
    }
    updated_course = update_course(created_course_id, updated_course_data)
    print("Updated Course:")
    print(updated_course)

    # Delete the created course using its ID
    delete_course(created_course_id)
