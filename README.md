# Medicinal Plants Catalog 🌿

A comprehensive medicinal plants catalog application developed with a Spring Boot backend, an Angular web frontend, and a Flutter mobile app. 
This project aims to provide detailed insights into medicinal plants, including their properties, uses, and safety precautions.It provides users with access to an extensive database of medicinal plants. Users can explore plant properties, discover safe usage methods, view multimedia content, and receive personalized recommendations.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Conception](#concception)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Web Demo](#web-demo)
- [Mobile Demo](#mobile-demo)

  
## Features
  - *Medicinal Plant Database*: Access a complete catalog with detailed information on each plant, including names, descriptions, properties, uses, and safety precautions.
  - *Advanced Search*: Search for plants based on specific criteria, such as name, properties, uses, and geographic origin.
  - *Multimedia Resources*: View rich content like images, videos, and articles to gain a deeper understanding of each plant.
  - *Personalized Recommendations*: Receive tailored plant recommendations based on user needs, preferences, and medical history.
  - *Safety and Interaction Guidance*: Learn about potential drug interactions and important safety precautions for using medicinal plants effectively and safely.

## Technologies
  - *Backend*: Spring Boot, Spring Security, MySQL
  - *Frontend*: Angular Material
  - *Mobile App*: Flutter, Firebase
  - *Database*: MySQL
    
## Conception

 - Use Case Diagram

![useCase_diag](https://github.com/user-attachments/assets/a7574db2-4d65-4cc3-8184-de2e96c1d5f9)

 - Class Diagram

![class_diag](https://github.com/user-attachments/assets/e50c5b46-6376-4345-85c1-263a8902eb7f)


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
   git clone https://github.com/Chaimaert/Medicinal_Plants_Catalog_App.git

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
| GET    | /plantes          | Get all plants     |
| GET    | /plantes/{id}     | Get  plant by ID |
| GET    | /plantes/recommandations  | Get plant recommandation|
| GET    | /plantes/recherche-avancee  | filter plants|
| GET    | /{planteId}/commentaires  | Get plant comments|
| POST    | /{planteId}/commentaires  | Add a plant comment|
| GET    | /admin/plantes     | Get all plants|
| POST   | /admin/plantes          | Add a new plant  |
| PUT    | /admin/plants/{id}     | Update a plant by ID |
| DELETE | /admin/plants/{id}     | Delete a plant by ID |
| POST    | /admin/files/upload     | To add a picture or a video of a  plant|
| GET    | /admin/files/{filename}   | Get all the pictures or videos of a  plant|

### Notes

  - *Admin Endpoints (/admin/plantes)*: These endpoints are restricted to the ADMIN role. Make sure to authenticate as an Admin before using them.
  - *Public Endpoints (/plantes)*: These endpoints are accessible to all users without authentication.


### Contact
For questions or feedback, feel free to reach out via GitHub Issues or mail.

## Web Demo

https://github.com/user-attachments/assets/160cd027-41e1-468c-8710-e37d20a4ad90



## Mobile Demo

https://github.com/user-attachments/assets/977b016c-c212-4950-9811-8cbc74f2f484

