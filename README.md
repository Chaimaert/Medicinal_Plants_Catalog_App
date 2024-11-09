# Medicinal Plants Catalog 🌿

A comprehensive medicinal plants catalog application developed with a Spring Boot backend, an Angular web frontend, and a Flutter mobile app. This project aims to provide detailed insights into medicinal plants, including their properties, uses, and safety precautions.It provides users with access to an extensive database of medicinal plants. Users can explore plant properties, discover safe usage methods, view multimedia content, and receive personalized recommendations.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Features
  - *Medicinal Plant Database*: Access a complete catalog with detailed information on each plant, including names, descriptions, properties, uses, and safety precautions.
  - *Advanced Search*: Search for plants based on specific criteria, such as name, properties, uses, and geographic origin.
  - *Multimedia Resources*: View rich content like images, videos, and articles to gain a deeper understanding of each plant.
  - *Personalized Recommendations*: Receive tailored plant recommendations based on user needs, preferences, and medical history.
  - *Safety and Interaction Guidance*: Learn about potential drug interactions and important safety precautions for using medicinal plants effectively and safely.

## Technologies
  - *Backend*: Spring Boot, Spring Security, MySQL
  - *Frontend*: Angular Material
  - *Mobile App*: Flutter
  - *Database*: MySQL

## Getting Started
These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
  - *Java* (JDK 17 or higher)
  - *Node.js* and *npm*
  - *MySQL Server*

### Installation

#### Backend
1. Clone the repository:
   ```
   git clone https://github.com/your-username/your-repo-name.git

2. Navigate to the backend directory and configure your database connection in application.properties:
    - spring.datasource.url=jdbc:mysql://localhost:3306/your-database-name
    - spring.datasource.username=your-username
    - spring.datasource.password=your-password
  
3. Run the Spring Boot application:
   ./mvnw spring-boot:run
   
#### Frontend
1. Navigate to the frontend directory:
   . cd frontend
2. Install dependencies:
   . npm install
3. Run the Angular application:
   . ng serve

## Usage
Access the application at [http://localhost:4200](http://localhost:4200).  
Register or log in to start creating, prioritizing, and tracking tasks.

## API Endpoints
Here is a summary of the main API endpoints:

| Method | Endpoint           | Description                  |
|--------|---------------------|------------------------------|
| GET    | /api/plants          | Get all tasks for a user     |
| POST   | /api/plants          | Create a new task            |
| PUT    | /api/plants/{id}     | Update a plantplants's details|
| DELETE | /api/plants/{id}     | Delete a plant                |

> *Note*: For full API documentation, refer to the docs/api folder.


Contact
For questions or feedback, feel free to reach out via GitHub Issues or connect with the repository maintainer.
