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

---
For backend/API integration, see the `Backend/` folder.
