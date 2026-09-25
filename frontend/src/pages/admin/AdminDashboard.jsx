import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiArrowRight, FiBookOpen, FiCalendar, FiClipboard, FiUsers } from "react-icons/fi";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/DashboardLayout";

function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    api
      .get("/admin/dashboard")
      .then((response) => setDashboard(response.data))
      .catch((e) => setError(e.response?.data?.message || "Failed to load admin dashboard data"))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (!user || user.role !== "admin") return null;

  return (
    <DashboardLayout
      user={user}
      onLogout={() => {
        logout();
        navigate("/");
      }}
    >
      <div className="mb-6 rounded-2xl bg-[#123f38] px-6 py-7 text-white shadow-sm">
        <p className="text-xs font-bold tracking-[.18em] text-[#efca83]">ADMIN WORKSPACE</p>
        <h1 className="mt-2 text-2xl font-bold md:text-3xl">Welcome back, {user.name}</h1>
        <p className="mt-2 text-sm text-emerald-50/70">
          Monitor campus performance, staffing, and academic operations from one place.
        </p>
      </div>

      {loading && <p className="text-sm text-[#70837e]">Loading admin dashboard...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {!loading && !error && dashboard && (
        <div className="space-y-6">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {dashboard.overview.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-[#dce8e4] bg-white p-5 shadow-sm"
              >
                <p className="text-sm text-[#70837e]">{item.label}</p>
                <p className="mt-2 text-3xl font-bold text-[#136b5d]">{item.value}</p>
                <p className="mt-1 text-xs text-[#81938e]">{item.detail}</p>
              </div>
            ))}
          </section>

          <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
            <section className="rounded-xl border border-[#dce8e4] bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-bold text-[#234941]">Attendance trend</h2>
                  <p className="mt-1 text-sm text-[#70837e]">Institute-wide attendance pattern</p>
                </div>
                <FiCalendar className="text-[#c58c32]" size={20} />
              </div>

              {dashboard.attendanceTrend.length ? (
                <div className="mt-7 flex h-44 items-end gap-3 border-b border-[#e8efec] px-1">
                  {dashboard.attendanceTrend.map((month) => (
                    <div
                      key={month.month}
                      className="flex min-w-0 flex-1 flex-col items-center gap-2"
                    >
                      <span className="text-xs font-semibold text-[#4b6d63]">
                        {month.percentage}%
                      </span>
                      <div className="flex h-28 w-full max-w-12 items-end rounded-t-md bg-[#edf5f2]">
                        <div
                          className="w-full rounded-t-md bg-[#2a8b78]"
                          style={{ height: `${Math.max(month.percentage, 8)}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-[#81938e]">{month.month.slice(5)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-8 rounded-lg bg-[#f7faf9] p-4 text-sm text-[#70837e]">
                  No attendance data available.
                </p>
              )}
            </section>

            <section className="rounded-xl border border-[#dce8e4] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-[#234941]">Admin alerts</h2>
                  <p className="mt-1 text-sm text-[#70837e]">Priority review points</p>
                </div>
                <FiClipboard className="text-[#c58c32]" size={20} />
              </div>

              <div className="mt-4 space-y-2">
                {dashboard.alerts.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    className="flex w-full items-center justify-between rounded-lg border border-[#e6eee9] bg-[#f7faf9] p-3 text-left hover:bg-[#eef5f3]"
                  >
                    <span className="text-sm font-medium text-[#34584e]">{item.label}</span>
                    <FiArrowRight className="text-[#81938e]" />
                  </button>
                ))}
              </div>
            </section>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-xl border border-[#dce8e4] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-[#234941]">Recent students</h2>
                <FiUsers className="text-[#c58c32]" size={20} />
              </div>
              <div className="mt-4 space-y-3">
                {dashboard.recentStudents.map((student) => (
                  <div
                    key={student._id}
                    className="flex items-center justify-between rounded-lg bg-[#f7faf9] p-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#294b44]">{student.name}</p>
                      <p className="text-xs text-[#81938e]">
                        {student.studentId} · Sem {student.semester}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-[#136b5d]">{student.course}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-[#dce8e4] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-[#234941]">Recent faculty</h2>
                <FiBookOpen className="text-[#c58c32]" size={20} />
              </div>
              <div className="mt-4 space-y-3">
                {dashboard.recentFaculty.map((member) => (
                  <div
                    key={member._id}
                    className="flex items-center justify-between rounded-lg bg-[#f7faf9] p-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#294b44]">{member.name}</p>
                      <p className="text-xs text-[#81938e]">
                        {member.department} · {member.designation}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-[#136b5d]">{member.status}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <nav className="flex flex-wrap gap-3">
            <Link
              to="/admin/faculty"
              className="rounded-lg bg-[#136b5d] px-4 py-2 text-sm font-medium text-white hover:bg-[#0f564a]"
            >
              Manage faculty
            </Link>
            <Link
              to="/admin/subjects"
              className="rounded-lg border border-[#dce8e4] bg-white px-4 py-2 text-sm font-medium text-[#136b5d] hover:bg-[#f6faf9]"
            >
              Manage subjects
            </Link>
            <Link
              to="/admin/departments"
              className="rounded-lg border border-[#dce8e4] bg-white px-4 py-2 text-sm font-medium text-[#136b5d] hover:bg-[#f6faf9]"
            >
              Departments
            </Link>
            <Link
              to="/admin/attendance"
              className="rounded-lg border border-[#dce8e4] bg-white px-4 py-2 text-sm font-medium text-[#136b5d] hover:bg-[#f6faf9]"
            >
              Attendance
            </Link>
            <Link
              to="/admin/communication"
              className="rounded-lg border border-[#dce8e4] bg-white px-4 py-2 text-sm font-medium text-[#136b5d] hover:bg-[#f6faf9]"
            >
              Communication
            </Link>
          </nav>
        </div>
      )}
    </DashboardLayout>
  );
}

export default AdminDashboard;
