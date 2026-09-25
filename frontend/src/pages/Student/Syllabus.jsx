import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../api/axios";

function Syllabus() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [syllabus, setSyllabus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "student") {
      navigate("/");
      return;
    }

    const fetchSyllabus = async () => {
      try {
        const res = await api.get("/syllabus");
        setSyllabus(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load syllabus.");
      } finally {
        setLoading(false);
      }
    };

    fetchSyllabus();
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
        <h1 className="text-2xl font-bold text-[#193e37]">Syllabus</h1>
        <p className="mt-2 text-sm text-[#60746e]">
          Access your current syllabus and subject-wise module outline.
        </p>
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-[#70837e]">Loading syllabus...</p>
      ) : error ? (
        <p className="mt-6 text-sm text-[#9f1c1c]">{error}</p>
      ) : (
        <div className="mt-6 space-y-4">
          {syllabus.map((subject) => (
            <div
              key={subject.subjectCode}
              className="rounded-2xl border border-[#e6eee9] bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-[#214036]">
                    {subject.subjectName}
                  </h2>
                  <p className="text-sm text-[#60746e]">
                    {subject.subjectCode}
                  </p>
                </div>
                <span className="rounded-full bg-[#e7f2ec] px-3 py-1 text-xs font-semibold text-[#2d543d]">
                  {subject.credits} Credits
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm text-[#455a4f]">
                {subject.topics.map((topic, index) => (
                  <p key={index}>• {topic}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default Syllabus;
