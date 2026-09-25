// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FiArrowRight,
//   FiHelpCircle,
//   FiLock,
//   FiMail,
//   FiShield,
//   FiSmartphone,
//   FiUser,
// } from "react-icons/fi";
// import api from "../../api/axios";
// import { useAuth } from "../../context/AuthContext";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const res = await api.post("/auth/login", { email, password });
//       login(res.data);
//       navigate(`/${res.data.role}/dashboard`);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           "Unable to sign in. Please check your details.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="portal-shell portal-grid flex min-h-screen flex-col">
//       <header className="border-b border-[#d9e5e1] bg-white/90 px-5 py-4 backdrop-blur md:px-10">
//         <div className="mx-auto flex max-w-7xl items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#136b5d] text-sm font-black tracking-tight text-white shadow-lg shadow-emerald-900/15">
//               CE
//             </div>
//             <div>
//               <p className="text-lg font-bold tracking-tight text-[#123e37]">
//                 CampusOne ERP
//               </p>
//               <p className="text-[10px] font-semibold tracking-[.18em] text-[#6d827d]">
//                 STUDENT INFORMATION SYSTEM
//               </p>
//             </div>
//           </div>
//           <div className="hidden items-center gap-2 text-sm text-[#506863] sm:flex">
//             <FiShield className="text-[#c48a2c]" /> Secure institutional access
//           </div>
//         </div>
//       </header>

//       <main className="mx-auto flex w-full max-w-7xl flex-1 items-center px-5 py-10 md:px-10 lg:py-16">
//         <div className="grid w-full overflow-hidden rounded-3xl border border-[#dbe7e3] bg-white login-card lg:grid-cols-[1.08fr_.92fr]">
//           <section className="relative overflow-hidden bg-[#123f38] px-7 py-10 text-white md:px-12 md:py-14">
//             <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[38px] border-[#d39a3e]/20" />
//             <div className="relative max-w-lg">
//               <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-[#eac77d]">
//                 ONE PORTAL. EVERY ACADEMIC MOMENT.
//               </span>
//               <h1 className="mt-7 text-3xl font-bold leading-tight md:text-4xl">
//                 Your campus, organised in one place.
//               </h1>
//               <p className="mt-4 max-w-md text-sm leading-6 text-emerald-50/75">
//                 Access attendance, academic records, fees, examination updates
//                 and important notices from one secure student portal.
//               </p>
//               <div className="mt-10 grid gap-3 sm:grid-cols-3">
//                 {[
//                   ["01", "Academic", "Courses & timetable"],
//                   ["02", "Finance", "Fees & receipts"],
//                   ["03", "Support", "Notices & help"],
//                 ].map(([num, title, copy]) => (
//                   <div
//                     key={title}
//                     className="rounded-xl border border-white/10 bg-white/8 p-3"
//                   >
//                     <p className="text-xs font-bold text-[#eac77d]">{num}</p>
//                     <p className="mt-3 text-sm font-semibold">{title}</p>
//                     <p className="mt-1 text-xs text-white/60">{copy}</p>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-10 rounded-xl border border-[#e5b65c]/25 bg-[#0d322c] p-4 text-sm">
//                 <p className="font-semibold text-[#f0cb84]">Latest notice</p>
//                 <p className="mt-1 text-white/80">
//                   Check the academic calendar and examination notifications
//                   regularly.
//                 </p>
//               </div>
//             </div>
//           </section>

//           <section className="px-7 py-10 md:px-12 md:py-14">
//             <div className="max-w-sm">
//               <p className="text-sm font-semibold text-[#bd8128]">
//                 WELCOME BACK
//               </p>
//               <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#183d36]">
//                 Sign in to your portal
//               </h2>
//               <p className="mt-2 text-sm leading-6 text-[#6a7e79]">
//                 Use your registered campus account to continue.
//               </p>
//               <form onSubmit={handleSubmit} className="mt-8 space-y-5">
//                 <label className="block">
//                   <span className="mb-2 block text-sm font-medium text-[#294d46]">
//                     Email / ERP ID
//                   </span>
//                   <span className="flex items-center rounded-xl border border-[#cfddd8] bg-[#fbfdfc] px-3 focus-within:border-[#167565] focus-within:ring-4 focus-within:ring-[#167565]/10">
//                     <FiUser className="text-[#74908a]" />
//                     <input
//                       className="w-full bg-transparent px-3 py-3 outline-none"
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="name@college.edu"
//                       required
//                     />
//                   </span>
//                 </label>
//                 <label className="block">
//                   <span className="mb-2 block text-sm font-medium text-[#294d46]">
//                     Password
//                   </span>
//                   <span className="flex items-center rounded-xl border border-[#cfddd8] bg-[#fbfdfc] px-3 focus-within:border-[#167565] focus-within:ring-4 focus-within:ring-[#167565]/10">
//                     <FiLock className="text-[#74908a]" />
//                     <input
//                       className="w-full bg-transparent px-3 py-3 outline-none"
//                       type="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="Enter your password"
//                       required
//                     />
//                   </span>
//                 </label>
//                 <div className="flex items-center justify-between text-sm">
//                   <a
//                     href="mailto:support@campusone.edu"
//                     className="font-medium text-[#146c5e] hover:underline"
//                   >
//                     Forgot password?
//                   </a>
//                   <a
//                     href="mailto:support@campusone.edu"
//                     className="font-medium text-[#146c5e] hover:underline"
//                   >
//                     Forgot ID?
//                   </a>
//                 </div>
//                 {error && (
//                   <p
//                     role="alert"
//                     className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
//                   >
//                     {error}
//                   </p>
//                 )}
//                 <button
//                   disabled={loading}
//                   className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#146c5e] px-4 py-3.5 font-semibold text-white shadow-lg shadow-emerald-900/15 transition hover:bg-[#0f574c] disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   {loading ? "Signing in…" : "Sign in securely"}
//                   <FiArrowRight />
//                 </button>
//               </form>
//               <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 border-t border-[#e2ebe8] pt-6 text-xs text-[#66807a]">
//                 <span className="flex items-center gap-1.5">
//                   <FiSmartphone /> Mobile-friendly portal
//                 </span>
//                 <a
//                   className="flex items-center gap-1.5 hover:text-[#146c5e]"
//                   href="mailto:support@campusone.edu"
//                 >
//                   <FiHelpCircle /> Need help?
//                 </a>
//                 <a
//                   className="flex items-center gap-1.5 hover:text-[#146c5e]"
//                   href="mailto:staff@campusone.edu"
//                 >
//                   <FiMail /> Staff email
//                 </a>
//               </div>
//             </div>
//           </section>
//         </div>
//       </main>
//       <footer className="border-t border-[#dce7e3] bg-white/70 px-5 py-4 text-center text-xs text-[#70837e]">
//         © {new Date().getFullYear()} CampusOne ERP · Secure academic information
//         management
//       </footer>
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiHelpCircle,
  FiLock,
  FiMail,
  FiShield,
  FiSmartphone,
  FiUser,
} from "react-icons/fi";

import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

function Login() {
  // const [studentId, setStudentId] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      // const res = await api.post("/auth/login", {
      //   studentId,
      //   password,
      // });
      const res = await api.post("/auth/login", {
        id,
        password,
      });

      login(res.data);

      navigate(`/${res.data.role}/dashboard`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to sign in. Please check your details.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="portal-shell portal-grid flex min-h-screen flex-col">
      <header className="border-b border-[#d9e5e1] bg-white/90 px-5 py-4 backdrop-blur md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#136b5d] text-sm font-black tracking-tight text-white shadow-lg shadow-emerald-900/15">
              CE
            </div>

            <div>
              <p className="text-lg font-bold tracking-tight text-[#123e37]">
                CampusOne ERP
              </p>

              <p className="text-[10px] font-semibold tracking-[.18em] text-[#6d827d]">
                STUDENT INFORMATION SYSTEM
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 text-sm text-[#506863] sm:flex">
            <FiShield className="text-[#c48a2c]" />
            Secure institutional access
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 items-center px-5 py-10 md:px-10 lg:py-16">
        <div className="grid w-full overflow-hidden rounded-3xl border border-[#dbe7e3] bg-white login-card lg:grid-cols-[1.08fr_.92fr]">
          {/* LEFT SIDE SAME */}

          <section className="relative overflow-hidden bg-[#123f38] px-7 py-10 text-white md:px-12 md:py-14">
            <div className="relative max-w-lg">
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-[#eac77d]">
                ONE PORTAL. EVERY ACADEMIC MOMENT.
              </span>

              <h1 className="mt-7 text-3xl font-bold leading-tight md:text-4xl">
                Your campus, organised in one place.
              </h1>

              <p className="mt-4 max-w-md text-sm leading-6 text-emerald-50/75">
                Access attendance, academic records, fees, examination updates
                and important notices from one secure student portal.
              </p>

              <button
                type="button"
                onClick={() => navigate("/register")}
                className="mt-3 inline-flex items-center justify-center rounded-xl border border-[#146c5e] bg-white px-6 py-3 font-semibold text-[#146c5e] transition-all duration-300 hover:bg-[#146c5e] hover:text-white hover:shadow-lg hover:scale-105 active:scale-95"
              >
                Register Now
              </button>
            </div>
          </section>

          {/* LOGIN FORM */}

          <section className="px-7 py-10 md:px-12 md:py-14">
            <div className="max-w-sm">
              <p className="text-sm font-semibold text-[#bd8128]">
                WELCOME BACK
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#183d36]">
                Sign in to your portal
              </h2>
              <p className="mt-2 text-sm text-[#6a7e79]">
                Students login with Student ID and Faculty login with Faculty
                ID.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {/* studentId */}

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#294d46]">
                    Student / Faculty ID
                  </span>

                  <span className="flex items-center rounded-xl border border-[#cfddd8] bg-[#fbfdfc] px-3">
                    <FiUser className="text-[#74908a]" />
                    {/* 
                    <input
                      className="w-full bg-transparent px-3 py-3 outline-none"
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="Enter your student ID"
                      required
                    /> */}

                    <input
                      className="w-full bg-transparent px-3 py-3 outline-none"
                      type="text"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      placeholder="Enter Student ID / Faculty ID"
                      required
                    />
                  </span>
                </label>

                {/* PASSWORD */}

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#294d46]">
                    Password
                  </span>

                  <span className="flex items-center rounded-xl border border-[#cfddd8] bg-[#fbfdfc] px-3">
                    <FiLock className="text-[#74908a]" />

                    <input
                      className="w-full bg-transparent px-3 py-3 outline-none"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  </span>
                </label>

                {error && (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                  </p>
                )}

                <button
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#146c5e] px-4 py-3.5 font-semibold text-white"
                >
                  {loading ? "Signing in…" : "Sign in securely"}

                  <FiArrowRight />
                </button>
              </form>

              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 border-t border-[#e2ebe8] pt-6 text-xs text-[#66807a]">
                <span className="flex items-center gap-1.5">
                  <FiSmartphone />
                  Mobile-friendly portal
                </span>

                <a href="mailto:support@campusone.edu">
                  <FiHelpCircle />
                  Need help?
                </a>

                <a href="mailto:staff@campusone.edu">
                  <FiMail />
                  Staff email
                </a>
                {/* <span
                  onClick={() => navigate("/admin/login")}
                  className="admin-link"
                >
                  Admin Login
                </span> */}
                <span
                  onClick={() => navigate("/admin/login")}
                  className="cursor-pointer text-sm font-semibold text-green-400 hover:text-green-300 transition-all duration-300 hover:underline hover:scale-105 inline-block"
                >
                  Admin Login
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-[#dce7e3] bg-white/70 px-5 py-4 text-center text-xs text-[#70837e]">
        © {new Date().getFullYear()} CampusOne ERP · Secure academic information
        management
      </footer>
    </div>
  );
}

export default Login;
