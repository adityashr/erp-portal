import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../api/axios";

function StudentAssignments() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [selected, setSelected] = useState(null);
  const [submissionText, setSubmissionText] = useState("");
  const [submissionFile, setSubmissionFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "student") {
      navigate("/");
      return;
    }
    fetchAssignments();
  }, [user, navigate]);

  const fetchAssignments = async () => {
    try {
      const res = await api.get("/assignments");
      setAssignments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (assignmentId) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("submissionText", submissionText);
      if (submissionFile) {
        formData.append("submissionFile", submissionFile);
      }

      await api.post(`/assignments/${assignmentId}/submit`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Assignment submitted successfully.");
      setSubmissionText("");
      setSubmissionFile(null);
      setSelected(null);
      fetchAssignments();
    } catch (error) {
      setMessage(error.response?.data?.message || "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== "student") return null;

  return (
    <DashboardLayout
      user={user}
      onLogout={() => {
        logout();
        navigate("/");
      }}
    >
      <div className="space-y-6">
        <div className="rounded-xl border border-[#dce8e4] bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#81948f]">
            Student Assignments
          </p>
          <h1 className="mt-3 text-3xl font-bold text-[#193e37]">
            Active assignments
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#60746e]">
            View assignments assigned for your course and semester, and submit
            your work.
          </p>
        </div>

        <div className="space-y-4">
          {assignments.length === 0 ? (
            <div className="rounded-xl border border-[#dce8e4] bg-[#fafafa] p-6 text-[#70837e]">
              No assignments found for your course/semester.
            </div>
          ) : (
            assignments.map((assignment) => (
              <div
                key={assignment._id}
                className="rounded-3xl border border-[#dce8e4] bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-[#193e37]">
                      {assignment.title}
                    </h2>
                    <p className="mt-2 text-sm text-[#526b65]">
                      {assignment.description}
                    </p>
                  </div>
                  <div className="text-sm text-[#506d62]">
                    Uploaded:{" "}
                    {new Date(assignment.uploadDate).toLocaleDateString()}
                  </div>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <span className="rounded-full bg-[#f5faf7] px-3 py-2 text-sm text-[#4f6e64]">
                    Subject: {assignment.subject}
                  </span>
                  <span className="rounded-full bg-[#f5faf7] px-3 py-2 text-sm text-[#4f6e64]">
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </span>
                  <span className="rounded-full bg-[#f5faf7] px-3 py-2 text-sm text-[#4f6e64]">
                    Faculty: {assignment.faculty?.name || "Unknown"}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <span className="rounded-full bg-[#eef7ff] px-3 py-2 text-sm text-[#2563eb]">
                    Status: {assignment.submitted ? "Submitted" : "Pending"}
                  </span>
                  {assignment.submitted && (
                    <span className="rounded-full bg-[#eef7ff] px-3 py-2 text-sm text-[#2563eb]">
                      Submission Date:{" "}
                      {new Date(assignment.submissionDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
                {assignment.pdfUrl && (
                  <div className="mt-4">
                    <a
                      href={assignment.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded-full bg-[#eaf6ef] px-4 py-2 text-sm font-medium text-[#206a4d] transition hover:bg-[#d5eed9]"
                    >
                      Download Assignment PDF
                    </a>
                  </div>
                )}

                {!assignment.submitted && (
                  <div className="mt-5 space-y-3">
                    <textarea
                      rows={4}
                      value={selected === assignment._id ? submissionText : ""}
                      onChange={(e) => {
                        setSelected(assignment._id);
                        setSubmissionText(e.target.value);
                      }}
                      className="w-full rounded-xl border border-[#dce8e4] bg-[#fbfdfc] px-3 py-3 outline-none"
                      placeholder="Write your submission notes or message here"
                    />
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#294d46]">
                        Upload your submission PDF
                      </label>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {
                          setSelected(assignment._id);
                          setSubmissionFile(e.target.files[0]);
                        }}
                        className="w-full rounded-xl border border-[#dce8e4] bg-[#fbfdfc] px-3 py-2 outline-none"
                      />
                    </div>
                    <button
                      onClick={() => handleSubmit(assignment._id)}
                      disabled={loading}
                      className="rounded-xl bg-[#136b5d] px-5 py-3 text-white transition hover:bg-[#0f564a] disabled:opacity-60"
                    >
                      {loading ? "Submitting..." : "Submit Assignment"}
                    </button>
                  </div>
                )}
                {assignment.submissionFileUrl && (
                  <div className="mt-4">
                    <a
                      href={assignment.submissionFileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded-full bg-[#eaf6ef] px-4 py-2 text-sm font-medium text-[#206a4d] transition hover:bg-[#d5eed9]"
                    >
                      View your submitted PDF
                    </a>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {message && <p className="text-sm text-[#136b5d]">{message}</p>}
      </div>
    </DashboardLayout>
  );
}

export default StudentAssignments;
