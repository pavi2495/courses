# React Frontend and NestJS Backend with Jest Testing

This repository contains a course management system web application demonstrating a React frontend application and a NestJS backend API, along with Jest testing for the backend.

## Prerequisites

- **Node.js:** Make sure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

## Setup Instructions

### Frontend (React)

1. **Navigate to the `frontend` directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the React development server:**

   ```bash
   npm run start
   ```

   The React application will be running at `http://localhost:3000`.

### Backend (NestJS)

1. **Navigate to the `backend` directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up the environment variables:**
   - Create a `.env` file in the `backend` directory.
   - Add the following environment variables to the `.env` file:

   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_DATABASE=courses
   ```

   Replace `yourpassword` with your MySQL/MariaDB database password.

4. **Run the NestJS backend:**

   ```bash
   npm run start
   ```

   The NestJS backend will be running at `http://localhost:3001`.

### Backend Testing with Jest

1. **Navigate to the `backend` directory if you are not already there:**

   ```bash
   cd backend
   ```

2. **Run Jest tests:**

   ```bash
   npm run test
   ```

   Jest will execute the tests and provide the results in the console.

## Directory Structure

- `frontend/`: Contains the React frontend application.
- `backend/`: Contains the NestJS backend application and Jest tests.
- `backend/tests/`: Contains Jest test files for the backend.

## Courses

- Ensure your MySQL/MariaDB server is running and accessible with the provided credentials in the `.env` file.
- The React frontend communicates with the NestJS backend API. Make sure the backend server is running while using the frontend application.
- You can modify the database connection details and API endpoints according to your requirements in the `.env` and backend code respectively.

---# courses
# courses
