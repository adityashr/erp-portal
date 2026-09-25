// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import StudentDashboard from "./pages/Student/StudentDashboard";
// import Attendance from "./pages/Student/Attendance";
// import AdminDepartments from "./pages/admin/AdminDepartments";
// import AdminSubjects from "./pages/admin/AdminSubjects";
// import AdminLogin from "./pages/auth/AdminLogin";
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/student/dashboard" element={<StudentDashboard />} />
//         <Route path="/student/attendance" element={<Attendance />} />

//         <Route path="/admin/departments" element={<AdminDepartments />} />
//       </Routes>
//       <Routes>
//         <Route path="/admin/login" element={<AdminLogin />} />
//       </Routes>
//       <Route path="/admin/subjects" element={<AdminSubjects />} />

//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import StudentDashboard from "./pages/Student/StudentDashboard";
import Attendance from "./pages/Student/Attendance";

import AdminDepartments from "./pages/admin/AdminDepartments";
import AdminSubjects from "./pages/admin/AdminSubjects";
import AdminLogin from "./pages/admin/AdminLogin";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Student */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />

        <Route path="/student/attendance" element={<Attendance />} />

        {/* Admin */}
        <Route path="/" element={<h1>App Working</h1>} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin/departments" element={<AdminDepartments />} />

        <Route path="/admin/subjects" element={<AdminSubjects />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
