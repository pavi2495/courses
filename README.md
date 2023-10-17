```markdown
# Course Management System - Web Application

This repository contains a course management system web application demonstrating a React frontend application and a NestJS backend API, all running inside Docker containers. Jest tests are included for both the frontend and backend.

## Prerequisites

- **Docker:** Make sure you have Docker installed on your system. You can download it from [Docker's official website](https://www.docker.com/).

## Setup Instructions

To run the application, execute the following command in the root directory of the project:

```bash
DB_PASSWORD=hello docker-compose up
```

This command will build and start both the frontend and backend services defined in the `docker-compose.yml` file. The React frontend will be accessible at `http://localhost:3000`, and the NestJS backend will be accessible at `http://localhost:3001`.

## Testing

### Backend

To run Jest tests for the backend, use the following command:

```bash
DB_PASSWORD=hello docker-compose run backend npm run test
```

## Python Script

To run Python Script for the backend, use the following command:

```bash
 python course_api_client.py
```

## Directory Structure

- `frontend/`: Contains the React frontend application and tests.
- `backend/`: Contains the NestJS backend application and tests.

## Courses

- Ensure your MySQL/MariaDB server is running and accessible.
- The React frontend communicates with the NestJS backend API. Make sure the backend server is running while using the frontend application.
- You can modify the database connection details and API endpoints according to your requirements directly in the `docker-compose.yml` file.

---

### Personal Comments

Hello! I'm Pavithra, the developer behind this project. I built this course management system with a focus on simplicity and extensibility. While I've currently implemented the basic functionality, there's a lot of room for expansion. I wanted to keep the codebase clean and maintainable, allowing for easy integration of new features like user authentication, coach management, and more.

Regarding the frontend, I chose React.js and Typescript for their flexibility and ease of use. The frontend might look minimal, but it provides a solid foundation for future enhancements. For now, the coach names are hardcoded due to time constraints, but this can easily be extended to a full coach management system in the future.

On the backend, Nest.js was my choice because of its robustness and scalability. I set up a MariaDB database, although it's currently limited to the courses table. With more time, I would expand this to include a coaches table, establishing relationships for a more comprehensive system.

I used Docker to containerize the application, making it easy to deploy and manage. While I didn't dive into Kubernetes in this iteration, it's certainly a consideration for future scaling.

Feel free to explore the code, and if you have any questions or suggestions, don't hesitate to reach out. Happy coding! 😊
```