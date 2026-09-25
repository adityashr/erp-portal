import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiBookOpen, FiCalendar, FiClock, FiUsers } from "react-icons/fi";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/DashboardLayout";

function Metric({ label, value, detail, tone = "default" }) {
  return (
    <div
      className={`rounded-xl border p-5 shadow-sm ${
        tone === "primary"
          ? "border-[#136b5d] bg-[#136b5d] text-white"
          : "border-[#dce8e4] bg-white"
      }`}
    >
      <p className={`text-sm ${tone === "primary" ? "text-emerald-50/75" : "text-[#70837e]"}`}>
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      <p className={`mt-1 text-xs ${tone === "primary" ? "text-emerald-50/65" : "text-[#81938e]"}`}>
        {detail}
      </p>
    </div>
  );
}

function FacultyDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "faculty") {
      navigate("/");
      return;
    }

    api
      .get("/faculty/dashboard")
      .then((response) => setDashboard(response.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Faculty dashboard could not be loaded."),
      )
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (!user || user.role !== "faculty") return null;

  const onLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <DashboardLayout user={user} onLogout={onLogout}>
      {loading && <p className="text-sm text-[#70837e]">Loading faculty dashboard...</p>}
      {error && (
        <div className="rounded-xl border border-[#f5d0d0] bg-[#fff1f1] p-4 text-sm text-[#9f1c1c]">
          {error}
        </div>
      )}

      {!loading && !error && dashboard && (
        <div className="space-y-6">
          <section className="rounded-2xl bg-[#123f38] px-6 py-7 text-white shadow-sm md:px-8">
            <p className="text-xs font-bold tracking-[.18em] text-[#efca83]">FACULTY WORKSPACE</p>
            <h1 className="mt-2 text-2xl font-bold md:text-3xl">Welcome back, {user.name}</h1>
            <p className="mt-2 text-sm text-emerald-50/70">
              Track class coverage, assignment performance, and student engagement.
            </p>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Metric
              label="Students"
              value={dashboard.stats.totalStudents}
              detail="Across your courses"
              tone="primary"
            />
            <Metric
              label="Assignments"
              value={dashboard.stats.totalAssignments}
              detail="Uploaded this term"
            />
            <Metric
              label="Classes today"
              value={dashboard.stats.classesToday}
              detail="Attendance records"
            />
            <Metric
              label="Attendance"
              value={`${dashboard.stats.attendanceRate}%`}
              detail="Average class presence"
            />
          </section>

          <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
            <section className="rounded-xl border border-[#dce8e4] bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-bold text-[#234941]">Attendance trend</h2>
                  <p className="mt-1 text-sm text-[#70837e]">
                    Monthly class participation across your sessions.
                  </p>
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
                          style={{ height: `${Math.max(month.percentage, 6)}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-[#81938e]">{month.month.slice(5)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-8 rounded-lg bg-[#f7faf9] p-4 text-sm text-[#70837e]">
                  No attendance data yet.
                </p>
              )}
            </section>

            <section className="rounded-xl border border-[#dce8e4] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-[#234941]">Today</h2>
                  <p className="mt-1 text-sm text-[#70837e]">Latest marked classes</p>
                </div>
                <FiClock className="text-[#c58c32]" size={20} />
              </div>

              <div className="mt-4 space-y-2">
                {dashboard.todaysClasses.length ? (
                  dashboard.todaysClasses.map((item) => (
                    <div key={item._id} className="rounded-lg bg-[#f7faf9] p-3">
                      <p className="text-sm font-semibold text-[#294b44]">{item.subject}</p>
                      <p className="mt-1 text-xs text-[#81938e]">
                        {new Date(item.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        · {item.status}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="rounded-lg bg-[#f7faf9] p-4 text-sm text-[#70837e]">
                    No classes recorded today.
                  </p>
                )}
              </div>
            </section>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-xl border border-[#dce8e4] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-[#234941]">Top students</h2>
                <FiUsers className="text-[#c58c32]" size={20} />
              </div>

              <div className="mt-4 space-y-3">
                {dashboard.students.length ? (
                  dashboard.students.map((student) => (
                    <div
                      key={student._id}
                      className="flex items-center justify-between rounded-lg border border-[#e6eee9] p-3"
                    >
                      <div>
                        <p className="text-sm font-semibold text-[#294b44]">{student.user?.name}</p>
                        <p className="text-xs text-[#81938e]">{student.enrollmentNumber}</p>
                      </div>
                      <span className="text-sm font-bold text-[#136b5d]">
                        {student.attendanceRate}%
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-[#70837e]">No student data available.</p>
                )}
              </div>
            </section>

            <section className="rounded-xl border border-[#dce8e4] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-[#234941]">Pending actions</h2>
                <FiBookOpen className="text-[#c58c32]" size={20} />
              </div>

              <div className="mt-4 space-y-2">
                {dashboard.pendingActions.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    className="flex w-full items-center justify-between rounded-lg border border-[#e6eee9] p-3 text-left hover:bg-[#f7faf9]"
                  >
                    <span className="text-sm font-medium text-[#34584e]">{item.label}</span>
                    <FiArrowRight className="text-[#81938e]" />
                  </button>
                ))}
              </div>
            </section>
          </div>

          <section className="rounded-xl border border-[#dce8e4] bg-white p-5 shadow-sm">
            <h2 className="font-bold text-[#234941]">Recent assignments</h2>

            <div className="mt-4 space-y-3">
              {dashboard.assignments.length ? (
                dashboard.assignments.map((assignment) => (
                  <div
                    key={assignment._id}
                    className="flex items-center justify-between rounded-lg bg-[#f7faf9] p-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#294b44]">{assignment.title}</p>
                      <p className="mt-1 text-xs text-[#81938e]">
                        {assignment.subject} · {assignment.course} · Sem {assignment.semester}
                      </p>
                    </div>
                    <p className="text-xs font-bold text-[#136b5d]">
                      {assignment.submissions} submissions
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-[#70837e]">No assignments uploaded yet.</p>
              )}
            </div>
          </section>
        </div>
      )}
    </DashboardLayout>
  );
}

export default FacultyDashboard;
