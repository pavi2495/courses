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

### Frontend

To run Jest tests for the frontend, use the following command:

```bash
DB_PASSWORD=hello docker-compose run frontend npm run test
```

## Directory Structure

- `frontend/`: Contains the React frontend application and tests.
- `backend/`: Contains the NestJS backend application and tests.

## Courses

- Ensure your MySQL/MariaDB server is running and accessible.
- The React frontend communicates with the NestJS backend API. Make sure the backend server is running while using the frontend application.
- You can modify the database connection details and API endpoints according to your requirements directly in the `docker-compose.yml` file.
