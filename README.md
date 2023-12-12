# Svelte Firebase Todo App
## Overview

This is a simple Todo application built using Svelte and Firebase. The app allows users to sign in with Google, add, mark as completed, and delete tasks. User authentication is handled using Firebase Authentication, and task data is stored in Firestore.
Project Structure

- layout.svelte: The layout component that wraps the main content and handles user authentication state.
- dashboard.svelte: The main dashboard component where users can view and manage their tasks.
- authStore.js: Svelte store for managing authentication state and handling authentication actions.
- - firebase.server.js: Firebase configuration and initialization script.

## Setup

- Clone the repository.
- Install dependencies using npm install.
- Create a Firebase project and obtain the configuration values.
- Create a .env file in the project root with the following variables:
```makefile

    VITE_APIKEY=your_api_key
    VITE_AUTHDOMAIN=your_auth_domain
    VITE_PROJECTID=your_project_id
    VITE_STORAGEBUCKET=your_storage_bucket
    VITE_MESSAGINGSENDERID=your_messaging_sender_id
    VITE_APPID=your_app_id
    VITE_MEASUREMENTID=your_measurement_id
```
## Running the App

Use the following commands to run the application:

- Development Mode: npm run dev
- Production Build: npm run build

## Features

- User Authentication: Sign in with Google and handle user authentication state.
- Task Management: Add, mark as completed, and delete tasks.
- Real-time Updates: Tasks are updated in real-time using Firestore snapshots.
- Responsive Design: The app is designed to be responsive for various screen sizes.

## Dependencies

- Svelte: The main JavaScript framework.
- Firebase: Used for authentication (Firebase Auth) and data storage (Firestore).
- Tailwind CSS: Utility-first CSS framework for styling.

## Notes

- Make sure to secure your Firebase configuration and API keys.
- This is a simple demo app, and additional features and optimizations can be added.

Feel free to explore and modify the code to fit your needs!
