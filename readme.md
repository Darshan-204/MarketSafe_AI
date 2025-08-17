# MarketSafeAI Frontend

## Overview
The MarketSafeAI frontend is a modern, responsive React application built with Vite. It provides a seamless user experience for secure market analytics, user authentication, and CSV data uploads.

## Features
- **Home Page**: About MarketSafeAI, service tiers, and animated feature highlights.
- **Vertical Navbar**: Persistent navigation with dark/light mode toggle.
- **Authentication**: Login and register pages with email verification, strong password validation, and password visibility toggle.
- **Profile/Dashboard**: User info and actions.
- **CSV Upload**: Dedicated page for uploading CSV files with validation and feedback.
- **Consistent UI**: Attractive, accessible design with dark/light themes and responsive layouts.

## Tech Stack
- React (Vite)
- React Router DOM
- Custom CSS (modular, theme-aware)

## Usage
1. Navigate to the `client` directory:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open your browser at [http://localhost:5173](http://localhost:5173)

## Pages
- `/` — Home
- `/login` — Login
- `/register` — Register (with email verification)
- `/profile` — User dashboard
- `/upload` — Upload CSV file

# MarketSafeAI Backend

## Overview
The MarketSafeAI backend is a modular Express.js REST API that powers authentication, user management, email services, and secure CSV file uploads for the platform. It uses MongoDB for data storage and JWT for authentication.

## Features
- User registration, login, and JWT-based authentication
- Email verification and password reset (via Nodemailer)
- User profile management
- Secure CSV file upload and storage (with Multer)
- Retrieve all CSV files uploaded by a user

## Tech Stack
- Node.js, Express.js
- MongoDB (Mongoose ODM)
- JWT (jsonwebtoken)
- Multer (file upload)
- Nodemailer (email)
- dotenv (environment variables)

## API Endpoints
- `POST   /register` — Register a new user
- `POST   /signin` — User login
- `PUT    /update-password` — Reset password
- `POST   /logout` — User logout
- `POST   /update-user` — Update user profile (auth required)
- `POST   /user-details` — Get user details (auth required)
- `POST   /email` — Send verification or password reset email
- `POST   /upload-csv` — Upload a CSV file (auth required, field: `csv_file`)
- `GET    /my-csv-files` — List all CSV files uploaded by the user (auth required)

## Usage
1. Navigate to the `Backend` directory:
   ```sh
   cd Backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up your `.env` file in the `Backend` directory with the following variables:
   ```env
   # MongoDB connection string
   MONGO_URI=your_mongodb_connection_string

   # JWT secret for authentication
   JWT_SECRET=your_jwt_secret

   # Frontend URL (for CORS, email links, etc.)
   FRONTEND_URL=http://localhost:5173

   # SMTP configuration for sending emails
   SMTP_HOST=smtp_server_host
   SMTP_PORT=465
   MAIL_USER=your_email@example.com
   MAIL_PASSWORD=your_email_password_or_app_password
   ADMIN_MAIL=admin_email@example.com

   # (Optional) Token secret key (if used separately)
   TOKEN_SECRET_KEY=your_token_secret_key
   ```
4. Start the backend server:
   ```sh
   npm start
   ```
5. The API will be available at [http://localhost:8080](http://localhost:5000)

## Folder Structure
- `controllers/` — Route logic (User, CSV file, etc.)
- `model/` — Mongoose models
- `router/` — Express routers
- `middleware/` — Auth and upload middleware
- `helper/` — Utility functions (e.g., email)
- `config/` — Database config

---
For frontend usage, see the `client/` folder.
