# App

## Description

This repository contains the code for a full-stack web application built with React.js for the frontend and Flask for the backend. The application is containerized using Docker to ensure consistency and ease of deployment across different environments.

## Features

- **React Frontend:** The frontend is built using React.js. It provides a simple textbox and button for requesting a ML prediction and shows the current version of the package.
  
- **Flask Backend:** The backend is developed using Flask. It provides 2 endpoints up to this point, one that leverages lib-version to access the current released version number and that furthers the predict request to the model-service.

- **Dockerized Environment:** Both the frontend and backend are containerized using Docker.

## Installation

**Start the 2 docker instances:**
   ```bash
   docker build -t app-frontend .   
   docker build -t app-service .   
   ```
## Configuration
- **Environment Variables:** Both docker files leverage environment variables for the urls of the services requires. If the user requires to change these links, they can add -e URL=your_url.
