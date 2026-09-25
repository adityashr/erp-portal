import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../api/axios";

function AdminAssignments() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }
    fetchAssignments();
  }, [user, navigate]);

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const res = await api.get("/assignments");
      setAssignments(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load assignments.");
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== "admin") return null;

  return (
    <DashboardLayout
      user={user}
      onLogout={() => {
        logout();
        navigate("/");
      }}
    >
      <div className="p-6">
        <div className="mb-6 rounded-xl border border-[#dce8e4] bg-white px-6 py-5">
          <p className="text-xs font-bold tracking-[.14em] text-[#bd8128]">
            ADMIN ASSIGNMENTS
          </p>
          <h1 className="mt-1 text-3xl font-bold text-[#193e37]">
            Manage assignments
          </h1>
          <p className="mt-2 text-sm text-[#70837e]">
            View all assignments and submission counts across departments.
          </p>
        </div>

        {loading && <p>Loading assignments...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="overflow-hidden rounded-xl border border-[#e2ebe8] bg-white shadow-sm">
            <table className="w-full min-w-[720px] divide-y divide-[#e6ece8]">
              <thead className="bg-[#f8faf8] text-left text-xs uppercase tracking-[.2em] text-[#6f8880]">
                <tr>
                  <th className="px-5 py-4">Title</th>
                  <th className="px-5 py-4">Subject</th>
                  <th className="px-5 py-4">Course</th>
                  <th className="px-5 py-4">Semester</th>
                  <th className="px-5 py-4">Faculty</th>
                  <th className="px-5 py-4">Due Date</th>
                  <th className="px-5 py-4">PDF</th>
                  <th className="px-5 py-4">Submissions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6ece8] text-sm text-[#485f57]">
                {assignments.map((assignment) => (
                  <tr key={assignment._id}>
                    <td className="px-5 py-4">{assignment.title}</td>
                    <td className="px-5 py-4">{assignment.subject}</td>
                    <td className="px-5 py-4">{assignment.course}</td>
                    <td className="px-5 py-4">{assignment.semester}</td>
                    <td className="px-5 py-4">
                      {assignment.faculty?.name || "-"}
                    </td>
                    <td className="px-5 py-4">
                      {new Date(assignment.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4">
                      {assignment.pdfUrl ? (
                        <a
                          href={assignment.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#136b5d] hover:underline"
                        >
                          View
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-5 py-4">{assignment.submissionCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default AdminAssignments;
