import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiHelpCircle,
  FiLock,
  FiMail,
  FiShield,
} from "react-icons/fi";

import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      // const res = await api.post("/auth/admin-login", {
      const res = await api.post("/auth/admin/login", {
        email,
        password,
      });

      login(res.data);

      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to sign in as administrator.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f8f7] via-white to-[#edf5f3]">
      <div className="flex min-h-screen items-center justify-center px-5 py-10">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-[#dce8e4] bg-white shadow-2xl lg:grid-cols-2">
          {/* Left Section */}

          <div className="bg-[#123f38] p-12 text-white">
            <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-widest text-[#f2c56d]">
              CAMPUSONE ERP
            </span>

            <h1 className="mt-8 text-4xl font-bold">Administrator Portal</h1>

            <p className="mt-5 text-sm leading-7 text-emerald-100">
              Secure access for administrators to manage departments, faculty,
              students, notices, attendance, assignments, examinations and
              institutional settings.
            </p>

            <div className="mt-12 space-y-5">
              <div className="flex items-center gap-3">
                <FiShield className="text-xl text-[#f2c56d]" />
                <span>Role Based Secure Authentication</span>
              </div>

              <div className="flex items-center gap-3">
                <FiMail className="text-xl text-[#f2c56d]" />
                <span>Institution Administration</span>
              </div>
            </div>
          </div>

          {/* Right Section */}

          <div className="p-10 lg:p-14">
            <p className="text-sm font-semibold tracking-widest text-[#c28a2c]">
              ADMIN LOGIN
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#163f38]">
              Welcome Back
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Login using your administrator account.
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              {/* Email */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <div className="flex items-center rounded-xl border border-gray-300 bg-gray-50 px-3">
                  <FiMail className="text-gray-500" />

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@campusone.com"
                    className="w-full bg-transparent px-3 py-3 outline-none"
                  />
                </div>
              </div>

              {/* Password */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Password
                </label>

                <div className="flex items-center rounded-xl border border-gray-300 bg-gray-50 px-3">
                  <FiLock className="text-gray-500" />

                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-transparent px-3 py-3 outline-none"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#136b5d] py-3 font-semibold text-white transition hover:bg-[#0f564a]"
              >
                {loading ? "Signing In..." : "Admin Sign In"}

                <FiArrowRight />
              </button>
            </form>

            <div className="mt-10 border-t pt-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <FiHelpCircle />
                Contact system administrator for access.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
