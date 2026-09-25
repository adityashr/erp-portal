import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../api/axios";

function Examination() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "student") {
      navigate("/");
      return;
    }

    const fetchExams = async () => {
      try {
        const res = await api.get("/examinations");
        setExams(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load examination details.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
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
      <div className="rounded-xl border border-[#dce8e4] bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-[#193e37]">Examination</h1>
        <p className="mt-2 text-sm text-[#60746e]">
          Check upcoming exams, schedules, and registration status.
        </p>
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-[#70837e]">
          Loading examination information...
        </p>
      ) : error ? (
        <p className="mt-6 text-sm text-[#9f1c1c]">{error}</p>
      ) : (
        <div className="mt-6 space-y-4">
          {exams.map((exam) => (
            <div
              key={exam.examId}
              className="rounded-2xl border border-[#e6eee9] bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[#214036]">
                    {exam.title}
                  </h2>
                  <p className="text-sm text-[#60746e]">{exam.courseName}</p>
                </div>
                <p className="rounded-full bg-[#e7f2ec] px-3 py-1 text-xs font-semibold text-[#2d543d]">
                  {exam.date}
                </p>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-[#455a4f]">Type</p>
                  <p className="mt-1 text-base font-medium text-[#223931]">
                    {exam.type}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#455a4f]">Status</p>
                  <p className="mt-1 text-base font-medium text-[#223931]">
                    {exam.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default Examination;
