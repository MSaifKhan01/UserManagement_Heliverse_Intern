

# User Management System

## Deployed Links

- **Backend:** [https://usermanagement-g8b8.onrender.com](https://usermanagement-g8b8.onrender.com)
- **Frontend:** [https://user-management-team.netlify.app/](https://user-management-team.netlify.app/)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Backend](#backend)
  - [Setup](#setup)
  - [API Endpoints](#api-endpoints)
- [Frontend](#frontend)
  - [Setup](#setup-1)
  - [Routes](#routes)
- [Tech Stack](#tags)


## Overview

The User Management System is a robust MERN stack application designed for efficient user, team, and authentication management. This README provides a comprehensive guide to the system's features, setup, and components.

## Features

- **User Management:** Get a list of users with optional search, filters, and pagination as well as you can update a user and delete a user also you can add a memeber in your team.
- **Team Management:** Manage teams and view details.
- **Authentication:** Secure endpoints with JWT.
- **Search and Filters:** Search and filter users by name, domain, gender, and availability.
- **Pagination:** Navigate through paginated user lists.

## Backend

Built with Node.js, Express.js, and MongoDB, the backend ensures seamless communication between the frontend and the database. JWT adds a layer of security to user authentication.

### Setup

1. Install dependencies: `npm install`
2. Configure environment variables in a `.env` file.
3. Run the server: `npm start`

### API Endpoints

- **POST /api/users:** Add a new user.
- **GET /api/users:** Get users with search, filters, and pagination.
- **GET /api/users/:id:** Get details of a specific user.
- **PUT /api/users/:id:** Update a user.
- **DELETE /api/users/:id:** Delete a user.
- **POST /api/users/login:** User login with JWT token generation.
- **POST /api/team:** Add a user to the team (requires authentication).
- **GET /api/team/:id:** Get details of the team for a specific user.

## Frontend

Implemented with React and React Router, the frontend provides a seamless user experience. CSS is used for styling.

### Setup

1. Install dependencies: `npm install`
2. Run the development server: `npm start`

### Routes

- **/:** User list page with search, filters, and pagination.
- **/login:** Login page for user authentication.
- **/update/:id:** Update user details page.
- **/user/:id:** User details page on the clicking user's image.
- **/user/add:** Add new user page.
- **/user/team:** Team management page.

## Tech Stack

- **Frontend:** React, React Router,sweetalert2, CSS.
- **Backend:** Node.js, Express.js, MongoDB Atlas, JWT.


