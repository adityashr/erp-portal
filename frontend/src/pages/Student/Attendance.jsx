import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/DashboardLayout";
import AttendanceSummary from "../../components/AttendanceSummary";
import SubjectAttendance from "../../components/SubjectAttendance";
import TodayAttendance from "../../components/TodayAttendance";
function Attendance() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "student") {
      navigate("/");
      return;
    }

    setLoading(true);
    setError("");
    api
      .get("/attendance/student")
      .then((r) => {
        setData(r.data);
      })
      .catch((err) => {
        const message = err.response?.data?.message;
        setError(
          message ||
            "Attendance data is not available yet. Please contact administration.",
        );
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [user, navigate]);
  if (!user || user.role !== "student") return null;
  return (
    <DashboardLayout
      user={user}
      onLogout={() => {
        logout();
        navigate("/");
      }}
    >
      <div className="mb-6 rounded-xl border border-[#dce8e4] bg-white px-5 py-4">
        <p className="text-xs font-bold tracking-[.14em] text-[#bd8128]">
          ACADEMIC RECORD
        </p>
        <h1 className="mt-1 text-xl font-bold text-[#193e37]">
          Attendance overview
        </h1>
        <p className="mt-1 text-sm text-[#70837e]">
          Track subject-wise attendance and today's class status.
        </p>
        {data?.course && data?.semester && (
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-[#4f6e64]">
            <span className="rounded-full border border-[#dce8e4] bg-[#f7fcfb] px-3 py-2">
              Course: {data.course}
            </span>
            <span className="rounded-full border border-[#dce8e4] bg-[#f7fcfb] px-3 py-2">
              Semester: {data.semester}
            </span>
          </div>
        )}
      </div>
      {loading ? (
        <p className="text-sm text-[#70837e]">Loading attendance...</p>
      ) : error ? (
        <div className="mb-5 rounded-xl border border-[#f5d0d0] bg-[#fff1f1] p-4 text-sm text-[#9f1c1c]">
          {error}
        </div>
      ) : data ? (
        <>
          <AttendanceSummary data={data} />
          <SubjectAttendance subjects={data.subjects} />
          <TodayAttendance today={data.today} />
          {data.subjects.length === 0 && (
            <p className="mt-5 text-sm text-[#70837e]">
              No attendance records found yet. Your attendance will appear here
              when faculty submit it.
            </p>
          )}
        </>
      ) : (
        <p className="text-sm text-[#70837e]">
          Attendance information is not available.
        </p>
      )}
    </DashboardLayout>
  );
}
export default Attendance;
