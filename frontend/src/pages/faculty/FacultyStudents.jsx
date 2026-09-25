import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/DashboardLayout";
function FacultyStudents() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!user || user.role !== "faculty") {
      navigate("/");
      return;
    }
    api
      .get("/students")
      .then((r) => setStudents(r.data))
      .catch((e) =>
        setError(e.response?.data?.message || "Failed to load students"),
      )
      .finally(() => setLoading(false));
  }, [user, navigate]);
  if (!user || user.role !== "faculty") return null;
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
          FACULTY WORKSPACE
        </p>
        <h1 className="mt-1 text-xl font-bold text-[#193e37]">
          Student directory
        </h1>
      </div>
      <section className="overflow-hidden rounded-xl border border-[#dce8e4] bg-white shadow-sm">
        {loading && <p className="p-5 text-sm">Loading students...</p>}
        {error && <p className="p-5 text-sm text-red-600">{error}</p>}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-[#f4f8f6] text-xs uppercase tracking-wide text-[#70837e]">
                <tr>
                  {[
                    "Student",
                    "Enrollment ID",
                    "Course",
                    "Branch",
                    "Semester",
                  ].map((h) => (
                    <th key={h} className="px-5 py-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr
                    key={s._id}
                    className="border-t border-[#edf2f0] text-[#526b65]"
                  >
                    <td className="px-5 py-3 font-medium text-[#234941]">
                      {s.user?.name}
                    </td>
                    <td className="px-5 py-3">{s.enrollmentNumber}</td>
                    <td className="px-5 py-3">{s.course}</td>
                    <td className="px-5 py-3">{s.branch}</td>
                    <td className="px-5 py-3">{s.semester}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}
export default FacultyStudents;
