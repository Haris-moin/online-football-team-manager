# Fantasy Football Team Manager

A full-stack fantasy football application where users can register/login, manage their teams, and participate in a transfer market. The project is built with **Node.js** on the backend and **React** on the frontend.

---

## Features

### Users
- Single flow for **Registration/Login** using email and password.
- Secure authentication using **JWT** and password hashing with **bcrypt**.

### Team Creation
- Upon registration, a team is automatically created with:
  - **Budget**: $5,000,000.
  - **Players**:
    - 3 Goalkeepers
    - 6 Defenders
    - 6 Midfielders
    - 5 Attackers
- Team creation is handled as a separate background process.

### Transfer Market
- **Filter Transfers**: Search by team name, player name, or price.
- **Manage Transfer List**:
  - Add/remove players.
  - Set a specific asking price.
- **Buy Players**:
  - Purchase players from other teams at **95% of their asking price**.

---

## Technology Stack

### Backend
- **Node.js** with **Express.js** for API development.
- **MongoDB** with **Mongoose** for database management.
- **JWT** for secure authentication.
- **dotenv** for environment variables.

### Frontend
- **React.js** for UI development.
- **Ant Design** for styling and components.
- **Redux Toolkit** for state management.
- **React Router** for navigation.

---

## Installation and Setup

### Prerequisites
- **Node.js** installed.
- **MongoDB** instance set up.
- **npm** or **yarn** for package management.

---

### Step-by-Step Guide

#### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend

2. Install the required dependencies:

   npm install

3. Create a .env file in the backend root directory and add the following variables:

   MONGO_URI=<your-mongodb-uri>
   PORT=<your-backend-port>
   JWT_SECRET=<your-secret-key>

4. Run the backend server:
   
   npm run dev

#### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend

2. Install the required dependencies:

   npm install

3. Start the frontend development server:
   
   npm run dev

## Usage

1. **Access the Application**: Open your browser and navigate to `http://localhost:3000`.
2. **Register/Login**: Create an account or log in using a valid email and password.
3. **Manage Your Team**:
   - View team details, including players and budget.
   - Use the **transfer market** to:
     - Filter players by name, team, or price.
     - Add/remove players from your transfer list.
     - Set asking prices for players.
     - Buy players from other teams at 95% of their asking price.



# Project Overview
This project is divided into two main sections: **Frontend Development** and **Backend Development**, each focusing on specific technologies and best practices to ensure a scalable and efficient application.

---

## Time Report
### Frontend Development
1. **Frontend Structure Creation**: 12 hours  
   Designed and implemented a clean and scalable folder structure to enhance maintainability.

2. **Redux Toolkit API Integration**: 3 hours  
   Integrated Redux Toolkit for state management, including the setup of slices and middleware for API handling.

3. **Reusable Components**: 6 hours  
   Developed separate components to promote code reusability, ensuring consistent styling and behavior across the application.

### Backend Development
1. **Service Layer Creation**: 2 hours  
   Designed and implemented service layers for business logic, ensuring a clear separation of concerns.

2. **Database Integration (MongoDB with Mongoose)**: 8 hours  
   Set up MongoDB as the database, configured Mongoose as the ORM, and implemented models and schemas for data structure.

3. **Controller and Structure Setup**: 8 hours  
   Built a modular and organized controller structure for handling API endpoints efficiently.

---

## Frontend Development Details
### Key Features:
#### **Frontend Structure:**
- Created a logical folder structure for components, hooks, Redux slices, and utilities.
- Ensured clear separation between presentation and logic layers.

#### **Redux Toolkit API Integration:**
- Configured slices and API middleware for state management.
- Used `useDispatch` and `useSelector` hooks to connect components to the global state.

#### **Reusable Components:**
- Developed modular and reusable components to reduce redundancy.
- Examples include Buttons, Modals, and Form Elements.

---

## Backend Development Details
### Key Features:
#### **Services:**
- Encapsulated business logic into service files to keep controllers clean.
- Ensured easy scalability for future feature additions.

#### **Database Integration:**
- Used MongoDB as the primary database for its flexibility and scalability.
- Configured Mongoose ORM for schema definition and data validation.

#### **Controllers and Structure:**
- Designed RESTful controllers for handling API requests.
- Organized code into a modular structure for maintainability.

---

## Technologies Used
### Frontend:
- React.js
- Redux Toolkit
- JavaScript/TypeScript
- Ant Design

### Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
