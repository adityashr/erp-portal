import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";

import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";

import StudentDashboard from "./pages/Student/StudentDashboard.jsx";
import Attendance from "./pages/Student/Attendance.jsx";
import StudentAssignments from "./pages/Student/StudentAssignments.jsx";
import Fee from "./pages/Student/Fee.jsx";
import HelpDesk from "./pages/Student/HelpDesk.jsx";
import Notices from "./pages/Student/Notices.jsx";
import StudentProfile from "./pages/Student/StudentProfile.jsx";

import FacultyDashboard from "./pages/faculty/FacultyDashboard.jsx";
import FacultyStudents from "./pages/faculty/FacultyStudents.jsx";
import FacultyAttendance from "./pages/faculty/FacultyAttendance.jsx";
import FacultyAssignments from "./pages/faculty/FacultyAssignments.jsx";

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminFaculty from "./pages/admin/AdminFaculty.jsx";
import AdminSubjects from "./pages/admin/AdminSubjects.jsx";
// import AdminDepartments from "./pages/admin/AdminDepartment.jsx";
import AdminDepartments from "./pages/admin/AdminDepartments.jsx";
import AdminLogin from "./pages/auth/AdminLogin.jsx";
import AdminAttendance from "./pages/admin/AdminAttendance.jsx";
import AdminCommunication from "./pages/admin/AdminCommunication.jsx";

import Timetable from "./pages/Student/Timetable.jsx";
import Syllabus from "./pages/Student/Syllabus.jsx";
import Examination from "./pages/Student/Examination.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/student/dashboard" element={<StudentDashboard />} />

          <Route path="/student/attendance" element={<Attendance />} />
          <Route path="/student/assignments" element={<StudentAssignments />} />
          <Route path="/student/timetable" element={<Timetable />} />
          <Route path="/student/syllabus" element={<Syllabus />} />
          <Route path="/student/examination" element={<Examination />} />
          <Route path="/student/fee" element={<Fee />} />
          <Route path="/student/help-desk" element={<HelpDesk />} />
          <Route path="/student/notices" element={<Notices />} />

          <Route path="/student/profile" element={<StudentProfile />} />

          <Route path="/faculty/dashboard" element={<FacultyDashboard />} />

          <Route path="/faculty/students" element={<FacultyStudents />} />
          <Route path="/faculty/attendance" element={<FacultyAttendance />} />
          <Route path="/faculty/assignments" element={<FacultyAssignments />} />

          {/* ADMIN */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          <Route path="/admin/faculty" element={<AdminFaculty />} />

          <Route path="/admin/subjects" element={<AdminSubjects />} />

          <Route path="/admin/departments" element={<AdminDepartments />} />

          <Route path="/admin/attendance" element={<AdminAttendance />} />
          <Route path="/admin/communication" element={<AdminCommunication />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
