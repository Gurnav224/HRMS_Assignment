# HRMS Assignment

A Human Resource Management System with recruitment tracking, employee management, attendance, and leave management features.

## Overview

This project is a full-stack HR Management System built with:
- Frontend: React, Redux, React Router
- Backend: Express.js, MongoDB

## Features

- **Authentication**: Secure login and registration
- **Recruitment**: Candidate tracking and management
- **Organization**: 
  - Employee management
  - Attendance tracking
  - Leave management

## Project Structure

```
├── frontend/           # React application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── features/   # Feature modules (auth, candidates, etc.)
│   │   └── store/      # Redux store configuration
│   └── ...
└── backend/            # Express.js server
    ├── controllers/    # Request handlers
    ├── models/         # MongoDB schemas
    ├── routes/         # API routes
    └── ...
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd HRMS_Assignment
   ```

2. Install backend dependencies
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies
   ```
   cd ../frontend
   npm install
   ```

4. Create `.env` file in the backend directory with:
   ```
   PORT=3000
   dbUri=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   ```

5. Create `.env` file in the frontend directory with:
   ```
   VITE_API_URL=http://localhost:3000
   ```

### Running the Application

1. Start the backend server
   ```
   cd backend
   npm run dev
   ```

2. Start the frontend development server
   ```
   cd frontend
   npm run dev
   ```

3. Access the application at `http://localhost:5173`

## Deployment

The application is deployed on Vercel:
- Frontend: https://hrms-assignment-u5od.vercel.app
- Backend: Deployed separately with API endpoints

## License

ISC
