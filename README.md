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