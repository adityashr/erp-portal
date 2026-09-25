// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../../api/axios";

// function Register() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "student",
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     try {
//       await api.post("/auth/register", formData);
//       setSuccess("Registration successful! Redirecting to login...");
//       setTimeout(() => navigate("/"), 1500);
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
//         <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Register</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm text-gray-600 mb-1">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-600 mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-600 mb-1">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               minLength={6}
//               className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-600 mb-1">Role</label>
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="student">Student</option>
//               <option value="faculty">Faculty</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>

//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           {success && <p className="text-green-600 text-sm">{success}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium disabled:opacity-50"
//           >
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>
//         <p className="text-sm text-center mt-4 text-gray-600">
//           Already have an account?{" "}
//           <Link to="/" className="text-blue-600 hover:underline">
//             Login here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;

// email step hta diya

// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../../api/axios";

// function Register() {
//   const [formData, setFormData] = useState({
//     erpId: "",
//     name: "",
//     password: "",
//     role: "student",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     try {
//       await api.post("/auth/register", formData);
//       setSuccess("Registration successful! Redirecting to login...");
//       setTimeout(() => navigate("/"), 1500);
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
//         <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
//           Register
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm text-gray-600 mb-1">ERP ID</label>
//             <input
//               type="text"
//               name="erpId"
//               value={formData.erpId}
//               onChange={handleChange}
//               required
//               className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-600 mb-1">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-600 mb-1">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               minLength={6}
//               className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-600 mb-1">Role</label>
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="student">Student</option>
//               <option value="faculty">Faculty</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>

//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           {success && <p className="text-green-600 text-sm">{success}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium disabled:opacity-50"
//           >
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>

//         <p className="text-sm text-center mt-4 text-gray-600">
//           Already have an account?{" "}
//           <Link to="/" className="text-blue-600 hover:underline">
//             Login here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;

// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../../api/axios";

// function Register() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "student",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");
//     setSuccess("");
//     setLoading(true);

//     try {
//       await api.post("/auth/register", formData);

//       setSuccess("Registration successful! Redirecting to login...");

//       setTimeout(() => {
//         navigate("/");
//       }, 1500);
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
//         <h1 className="mb-6 text-center text-2xl font-bold text-blue-600">
//           Register
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="mb-1 block text-sm text-gray-600">Name</label>

//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="mb-1 block text-sm text-gray-600">Email</label>

//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="mb-1 block text-sm text-gray-600">Password</label>

//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               minLength={6}
//               className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="mb-1 block text-sm text-gray-600">Role</label>

//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="student">Student</option>
//               <option value="faculty">Faculty</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>

//           {error && <p className="text-sm text-red-500">{error}</p>}

//           {success && <p className="text-sm text-green-600">{success}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>

//         <p className="mt-4 text-center text-sm text-gray-600">
//           Already have an account?{" "}
//           <Link to="/" className="text-blue-600 hover:underline">
//             Login here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;

// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../../api/axios";

// function Register() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "student",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");
//     setSuccess("");
//     setLoading(true);

//     try {
//       await api.post("/auth/register", formData);

//       setSuccess("Registration successful! Redirecting to login...");

//       setTimeout(() => {
//         navigate("/");
//       }, 1500);
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>

//           <p className="text-gray-500 mt-2">College ERP Registration</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Full Name
//             </label>

//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter your name"
//               required
//               className="
//               w-full px-4 py-3 rounded-lg border
//               border-gray-300
//               focus:ring-2 focus:ring-blue-500
//               focus:border-blue-500
//               outline-none transition
//               "
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email Address
//             </label>

//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="example@gmail.com"
//               required
//               className="
//               w-full px-4 py-3 rounded-lg border
//               border-gray-300
//               focus:ring-2 focus:ring-blue-500
//               outline-none transition
//               "
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>

//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Minimum 6 characters"
//               required
//               minLength={6}
//               className="
//               w-full px-4 py-3 rounded-lg border
//               border-gray-300
//               focus:ring-2 focus:ring-blue-500
//               outline-none transition
//               "
//             />
//           </div>

//           {/* Role */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Register As
//             </label>

//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="
//               w-full px-4 py-3 rounded-lg border
//               border-gray-300
//               focus:ring-2 focus:ring-blue-500
//               outline-none
//               "
//             >
//               <option value="student">Student</option>

//               <option value="faculty">Faculty</option>

//               <option value="admin">Admin</option>
//             </select>
//           </div>

//           {/* Error */}
//           {error && (
//             <div
//               className="
//               bg-red-100
//               text-red-600
//               p-3
//               rounded-lg
//               text-sm
//               "
//             >
//               {error}
//             </div>
//           )}

//           {/* Success */}
//           {success && (
//             <div
//               className="
//               bg-green-100
//               text-green-600
//               p-3
//               rounded-lg
//               text-sm
//               "
//             >
//               {success}
//             </div>
//           )}

//           {/* Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="
//             w-full
//             bg-blue-600
//             text-white
//             py-3
//             rounded-lg
//             font-semibold
//             hover:bg-blue-700
//             transition
//             duration-300
//             shadow-md
//             disabled:opacity-50
//             "
//           >
//             {loading ? "Creating Account..." : "Register"}
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-600 mt-6">
//           Already have an account?
//           <Link
//             to="/"
//             className="
//             ml-1
//             text-blue-600
//             font-medium
//             hover:underline
//             "
//           >
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  GraduationCap,
  ShieldCheck,
  Users,
} from "lucide-react";
import api from "../../api/axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    course: "",
    batch: "",
    department: "",
    role: "student",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [studentInfo, setStudentInfo] = useState({
    studentId: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/register", formData);

      setStudentInfo({
        studentId: res.data.studentId,
        password: formData.password,
      });

      setShowPopup(true);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 overflow-hidden px-5">
      {/* Floating Shapes */}

      <div className="absolute w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-30 top-10 left-10"></div>
      <div className="absolute w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-30 top-20 right-10"></div>
      <div className="relative max-w-5xl w-full grid md:grid-cols-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Branding */}

        <div className="hidden md:flex flex-col justify-center p-12 text-white bg-gradient-to-br from-blue-600/40 to-purple-600/40">
          <GraduationCap size={70} className="mb-6" />

          <h1 className="text-4xl font-bold leading-tight"> </h1>

          <p className="mt-4 text-white/80 text-lg">
            Manage academics, attendance, subjects and student life from one
            smart platform.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <ShieldCheck />

              <span>Secure Authentication</span>
            </div>

            <div className="flex items-center gap-3">
              <Users />

              <span>Student & Faculty Management</span>
            </div>
          </div>
        </div>

        {/* Form */}

        <div className="bg-white p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>

          <p className="text-gray-500 mt-2 mb-8">
            Join your college ERP system
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}

            <div className="relative">
              <User
                className="absolute left-3  top-3.5 text-gray-400"
                size={20}
              />

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100 border-none outline-none outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Email */}

            <div className="relative">
              <Mail
                className="absolute left-3 top-3.5 text-gray-400"
                size={20}
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full pl-10 py-3 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Password */}

            <div className="relative">
              <Lock
                className="absolute left-3 top-3.5 text-gray-400"
                size={20}
              />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                placeholder="Password"
                className="w-full pl-10 py-3 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Course */}

            <div className="relative">
              <GraduationCap
                className="absolute left-3 top-3.5 text-gray-400"
                size={20}
              />

              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="w-full pl-10 py-3 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Course</option>
                <option value="BCA">BCA</option>
                <option value="BBA">BBA</option>
                <option value="B.Com">B.Com</option>
                <option value="B.Tech CSE">B.Tech CSE</option>
                <option value="B.Tech ME">B.Tech ME</option>
                <option value="MCA">MCA</option>
                <option value="MBA">MBA</option>
              </select>
            </div>

            {/* Batch */}

            <div className="relative">
              <select
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                required
                className="w-full py-3 px-4 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Batch</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>
            <div className="relative">
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full py-3 px-4 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Management">Management</option>
                <option value="Commerce">Commerce</option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
              </select>
            </div>

            {/* Roles */}

            <div className="grid grid-cols-3 gap-3">
              {[["student", "🎓"]].map((item) => (
                <button
                  type="button"
                  key={item[0]}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      role: item[0],
                    })
                  }
                  className={`p-3 rounded-xl border transition ${
                    formData.role === item[0]
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <div className="text-xl">{item[1]}</div>

                  <div className="text-xs capitalize">{item[0]}</div>
                </button>
              ))}
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {success && <p className="text-green-600 text-sm">{success}</p>}

            <button
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold hover:scale-[1.02] transition shadow-lg"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500">
            Already registered?
            <Link to="/" className="text-indigo-600 font-semibold ml-1">
              Login
            </Link>
          </p>
          {showPopup && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-8 w-[420px] shadow-2xl">
                <h2 className="text-2xl font-bold text-green-600 text-center">
                  🎉 Registration Successful
                </h2>

                <p className="text-center text-gray-500 mt-2">
                  Save your login credentials.
                </p>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="font-semibold text-gray-700">
                      Student ID
                    </label>

                    <input
                      readOnly
                      value={studentInfo.studentId}
                      className="w-full mt-1 p-3 rounded-lg bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700">
                      Password
                    </label>

                    <input
                      readOnly
                      value={studentInfo.password}
                      className="w-full mt-1 p-3 rounded-lg bg-gray-100"
                    />
                  </div>
                </div>

                <button
                  className="w-full mt-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
                  onClick={() => navigate("/")}
                >
                  Go To Login
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
