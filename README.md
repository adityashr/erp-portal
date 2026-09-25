# College ERP — Clean, Working Base

This is the complete, consistent version of everything we built together:
JWT auth (register/login), role-based access (student/faculty/admin),
Student/Faculty/Subject CRUD, and a styled dashboard (sidebar, top navbar,
quick menu, dashboard cards) for each role.

## Setup

### 1. Backend
```
cd backend
npm install
```
Copy `.env.example` to `.env` and fill in your real MongoDB connection,
JWT secret, and Razorpay live/test credentials:
```
cp .env.example .env
```
Then run:
```
npm run dev
```
You should see `MongoDB Connected: ...` and `Server running on port 5000`.

The backend intentionally does not use an in-memory database or seed demo
accounts. It will refuse to start until `MONGO_URI` is configured. Online fee
payments use Razorpay Checkout and are marked successful only after the
server verifies the Razorpay signature.

### 2. Frontend
```
cd frontend
npm install
npm run dev
```
Open http://localhost:5173

## What's included

- **Auth**: register/login with bcrypt-hashed passwords and JWT tokens.
  Every frontend API call automatically attaches the token via an Axios
  interceptor (see `frontend/src/api/axios.js`) — no page has to build
  the Authorization header manually.
- **Roles**: `student`, `faculty`, `admin`, enforced both in the backend
  (`protect` + `allowRoles` middleware) and the frontend (dashboards
  redirect away if the logged-in user's role doesn't match).
- **Student / Faculty / Subject**: full CRUD on the backend, with
  `Student`/`Faculty` linked to `User` by reference (not duplicating
  auth data), and `Subject` optionally linked to a `Faculty`.
- **Dashboards**: Student, Faculty, and Admin each have a working
  dashboard. Student's is the most complete (styled Sidebar, TopNavbar,
  QuickMenu, DashboardCard grid). Faculty/Admin are functional but
  simpler — worth applying the same DashboardLayout treatment next.

## First-time data setup

There are no demo accounts. Register users through the Register page or your
institution's provisioning workflow, then create matching Student/Faculty
profiles through the admin APIs. Never commit real `.env` values.
```
POST /api/auth/register
{ "name": "Admin One", "email": "admin@test.com", "password": "pass123", "role": "admin" }
```
Then log in as admin and create matching Student/Faculty profiles through
`POST /api/students` or `POST /api/faculty`, referencing the registered user
`_id`.
