import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiBookOpen,
  FiCalendar,
  FiCheckCircle,
  FiClipboard,
  FiHome,
  FiUser,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Not scheduled";

function Metric({ label, value, detail, tone = "default" }) {
  return (
    <div
      className={`rounded-xl border p-5 shadow-sm ${
        tone === "primary"
          ? "border-[#136b5d] bg-[#136b5d] text-white"
          : "border-[#dce8e4] bg-white"
      }`}
    >
      <p
        className={`text-sm ${
          tone === "primary" ? "text-emerald-50/75" : "text-[#70837e]"
        }`}
      >
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      <p
        className={`mt-1 text-xs ${
          tone === "primary" ? "text-emerald-50/65" : "text-[#81938e]"
        }`}
      >
        {detail}
      </p>
    </div>
  );
}

function StudentDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "student") {
      navigate("/");
      return;
    }

    api
      .get("/students/dashboard")
      .then((response) => setDashboard(response.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Dashboard data could not be loaded."),
      )
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (!user || user.role !== "student") return null;

  const onLogout = () => {
    logout();
    navigate("/");
  };

  const attendance = dashboard?.attendance;

  return (
    <DashboardLayout user={user} profile={dashboard?.profile} onLogout={onLogout}>
      {loading && <p className="text-sm text-[#70837e]">Loading your dashboard...</p>}
      {error && (
        <div className="rounded-xl border border-[#f5d0d0] bg-[#fff1f1] p-4 text-sm text-[#9f1c1c]">
          {error}
        </div>
      )}

      {!loading && !error && dashboard && (
        <div className="space-y-6">
          <section className="rounded-2xl bg-[#123f38] px-6 py-7 text-white shadow-sm md:px-8">
            <p className="text-xs font-bold tracking-[.18em] text-[#efca83]">
              STUDENT OVERVIEW
            </p>
            <h1 className="mt-2 text-2xl font-bold md:text-3xl">
              Good to see you, {dashboard.profile.user?.name || user.name}
            </h1>
            <p className="mt-2 text-sm text-emerald-50/70">
              {dashboard.profile.course} · Semester {dashboard.profile.semester} · {dashboard.profile.enrollmentNumber}
            </p>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Metric
              label="Overall attendance"
              value={`${attendance.overall}%`}
              detail={`${attendance.present} present of ${attendance.present + attendance.absent} classes`}
              tone="primary"
            />
            <Metric
              label="Today's classes"
              value={attendance.today.length}
              detail={
                attendance.today.length
                  ? "Attendance marked today"
                  : "No classes marked today"
              }
            />
            <Metric
              label="Pending assignments"
              value={dashboard.pendingAssignments.length}
              detail="Open submissions"
            />
            <Metric
              label="Published semesters"
              value={dashboard.results.length}
              detail={
                dashboard.results.length
                  ? "Results available"
                  : "Results not published yet"
              }
            />
          </section>

          <div className="grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
            <section className="rounded-xl border border-[#dce8e4] bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-bold text-[#234941]">Attendance trend</h2>
                  <p className="mt-1 text-sm text-[#70837e]">
                    Monthly presence across recorded classes.
                  </p>
                </div>
                <button
                  onClick={() => navigate("/student/attendance")}
                  className="flex items-center gap-1 text-xs font-semibold text-[#136b5d]"
                >
                  Details <FiArrowRight />
                </button>
              </div>

              {attendance.monthly.length ? (
                <div className="mt-7 flex h-44 items-end gap-3 border-b border-[#e8efec] px-1">
                  {attendance.monthly.map((month) => {
                    const total = month.present + month.absent;
                    const percentage = total
                      ? Math.round((month.present / total) * 100)
                      : 0;

                    return (
                      <div
                        key={month.month}
                        className="flex min-w-0 flex-1 flex-col items-center gap-2"
                      >
                        <span className="text-xs font-semibold text-[#4b6d63]">
                          {percentage}%
                        </span>
                        <div className="flex h-28 w-full max-w-12 items-end rounded-t-md bg-[#edf5f2]">
                          <div
                            className="w-full rounded-t-md bg-[#2a8b78]"
                            style={{ height: `${Math.max(percentage, 4)}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-[#81938e]">
                          {month.month.slice(5)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-8 rounded-lg bg-[#f7faf9] p-4 text-sm text-[#70837e]">
                  Monthly attendance will appear after faculty mark classes.
                </p>
              )}
            </section>

            <section className="rounded-xl border border-[#dce8e4] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-[#234941]">Today</h2>
                  <p className="mt-1 text-sm text-[#70837e]">
                    Class attendance status
                  </p>
                </div>
                <FiCalendar className="text-[#c58c32]" size={20} />
              </div>

              <div className="mt-4 space-y-2">
                {attendance.today.length ? (
                  attendance.today.map((item) => (
                    <div
                      key={`${item.period}-${item.subject}`}
                      className="flex items-center justify-between rounded-lg bg-[#f7faf9] px-3 py-3"
                    >
                      <div>
                        <p className="text-sm font-semibold text-[#294b44]">
                          {item.subject}
                        </p>
                        <p className="text-xs text-[#81938e]">
                          Period {item.period} · {item.faculty}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-bold ${
                          item.status === "Present"
                            ? "text-[#16806b]"
                            : "text-[#bd5548]"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="rounded-lg bg-[#f7faf9] p-4 text-sm text-[#70837e]">
                    No attendance recorded today.
                  </p>
                )}
              </div>
            </section>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-xl border border-[#dce8e4] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-[#234941]">Semester results</h2>
                <FiBookOpen className="text-[#c58c32]" size={20} />
              </div>

              <div className="mt-4 space-y-3">
                {dashboard.results.length ? (
                  dashboard.results.map((result) => (
                    <div
                      key={result.semester}
                      className="rounded-lg border border-[#e6eee9] p-4"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-[#294b44]">
                          Semester {result.semester}
                        </p>
                        <span className="text-sm font-bold text-[#136b5d]">
                          {result.sgpa != null
                            ? `SGPA ${result.sgpa}`
                            : result.percentage != null
                              ? `${result.percentage}%`
                              : "Published"}
                        </span>
                      </div>
                      {result.subjects?.length > 0 && (
                        <p className="mt-2 text-xs text-[#70837e]">
                          {result.subjects
                            .map(
                              (subject) =>
                                `${subject.name}: ${subject.grade || subject.marks || "-"}`,
                            )
                            .join(" · ")}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="rounded-lg bg-[#f7faf9] p-4 text-sm text-[#70837e]">
                    Results have not been published yet.
                  </p>
                )}
              </div>
            </section>

            <section className="rounded-xl border border-[#dce8e4] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-[#234941]">Hostel status</h2>
                <FiHome className="text-[#c58c32]" size={20} />
              </div>

              {dashboard.hostel.status === "Approved" ? (
                <div className="mt-4 rounded-lg bg-[#edf8f1] p-4">
                  <p className="font-bold text-[#167050]">
                    Hostel accommodation approved
                  </p>
                  <p className="mt-2 text-sm text-[#52766a]">
                    {dashboard.hostel.hostelName || "Hostel"} · Room {dashboard.hostel.roomNumber || "To be assigned"}
                  </p>
                </div>
              ) : (
                <div className="mt-4 rounded-lg bg-[#fff8eb] p-4">
                  <p className="font-bold text-[#94621d]">
                    {dashboard.hostel.status === "Not applied"
                      ? "You are not allotted a hostel"
                      : `Application ${dashboard.hostel.status.toLowerCase()}`}
                  </p>
                  <p className="mt-2 text-sm text-[#806c4b]">
                    {dashboard.hostel.status === "Not applied"
                      ? "No hostel accommodation is linked to your student record."
                      : "The hostel office will update your accommodation status here."}
                  </p>
                </div>
              )}
            </section>
          </div>

          <section className="rounded-xl border border-[#dce8e4] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-[#234941]">Pending actions</h2>
                <p className="mt-1 text-sm text-[#70837e]">
                  Items that need your attention.
                </p>
              </div>
              <FiClipboard className="text-[#c58c32]" size={20} />
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {dashboard.pending.length ? (
                dashboard.pending.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    className="flex items-center gap-3 rounded-lg border border-[#e6eee9] p-4 text-left hover:bg-[#f7faf9]"
                  >
                    <FiUser className="text-[#c58c32]" />
                    <span className="flex-1 text-sm font-semibold text-[#34584e]">
                      {item.label}
                    </span>
                    <FiArrowRight className="text-[#81938e]" />
                  </button>
                ))
              ) : (
                <div className="flex items-center gap-2 rounded-lg bg-[#edf8f1] p-4 text-sm font-semibold text-[#167050]">
                  <FiCheckCircle /> You are all caught up.
                </div>
              )}
            </div>
          </section>

          <section className="rounded-xl border border-[#dce8e4] bg-white p-5 shadow-sm">
            <h2 className="font-bold text-[#234941]">Upcoming examinations</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {dashboard.exams.length ? (
                dashboard.exams.map((exam) => (
                  <div
                    key={exam.examId}
                    className="flex items-center justify-between rounded-lg bg-[#f7faf9] p-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#294b44]">
                        {exam.title}
                      </p>
                      <p className="mt-1 text-xs text-[#81938e]">
                        {exam.type} · {exam.status}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#136b5d]">
                      {formatDate(exam.date)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-[#70837e]">
                  No upcoming examinations published.
                </p>
              )}
            </div>
          </section>
        </div>
      )}
    </DashboardLayout>
  );
}

export default StudentDashboard;
