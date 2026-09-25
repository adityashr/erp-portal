import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../api/axios";

function FacultyAssignments() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    subject: "",
    course: "BCA",
    semester: "1",
    dueDate: "",
    pdfFile: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user || user.role !== "faculty") {
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

  const handleChange = (e) => {
    if (e.target.name === "pdfFile") {
      setForm({ ...form, pdfFile: e.target.files[0] });
      return;
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("subject", form.subject);
      formData.append("course", form.course);
      formData.append("semester", form.semester);
      formData.append("dueDate", form.dueDate);
      if (form.pdfFile) {
        formData.append("pdfFile", form.pdfFile);
      }

      await api.post("/assignments", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Assignment uploaded successfully.");
      setForm({
        title: "",
        description: "",
        subject: "",
        course: "BCA",
        semester: "1",
        dueDate: "",
        pdfFile: null,
      });
      fetchAssignments();
    } catch (error) {
      setMessage(error.response?.data?.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== "faculty") return null;

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
            Faculty Assignment Upload
          </p>
          <h1 className="mt-3 text-3xl font-bold text-[#193e37]">
            Create new assignment
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#60746e]">
            Upload assignment details for your students and share submission
            status.
          </p>
        </div>

        <div className="rounded-xl border border-[#dce8e4] bg-white p-6 shadow-sm">
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            encType="multipart/form-data"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#294d46]">
                  Assignment title
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#dce8e4] bg-[#fbfdfc] px-3 py-3 outline-none"
                  placeholder="Enter assignment title"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#294d46]">
                  Subject
                </label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#dce8e4] bg-[#fbfdfc] px-3 py-3 outline-none"
                  placeholder="Enter subject name"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#294d46]">
                  Course
                </label>
                <select
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#dce8e4] bg-[#fbfdfc] px-3 py-3 outline-none"
                >
                  <option value="BCA">BCA</option>
                  <option value="B.Com">B.Com</option>
                  <option value="BBA">BBA</option>
                  <option value="MBA">MBA</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#294d46]">
                  Semester
                </label>
                <select
                  name="semester"
                  value={form.semester}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#dce8e4] bg-[#fbfdfc] px-3 py-3 outline-none"
                >
                  {[1, 2, 3, 4, 5, 6].map((sem) => (
                    <option key={sem} value={sem}>
                      {sem}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#294d46]">
                  Due date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#dce8e4] bg-[#fbfdfc] px-3 py-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#294d46]">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-xl border border-[#dce8e4] bg-[#fbfdfc] px-3 py-3 outline-none"
                placeholder="Enter assignment instructions or notes"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#294d46]">
                Assignment PDF
              </label>
              <input
                type="file"
                name="pdfFile"
                accept="application/pdf"
                onChange={handleChange}
                className="w-full rounded-xl border border-[#dce8e4] bg-[#fbfdfc] px-3 py-2 outline-none"
              />
            </div>

            {message && <p className="text-sm text-[#136b5d]">{message}</p>}

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#136b5d] px-5 py-3 text-white transition hover:bg-[#0f564a] disabled:opacity-60"
            >
              {loading ? "Uploading..." : "Upload Assignment"}
            </button>
          </form>
        </div>

        <div className="rounded-xl border border-[#dce8e4] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#193e37]">
            Your assignments
          </h2>
          <p className="mt-2 text-sm text-[#637872]">
            Assignments uploaded by you are visible here.
          </p>

          <div className="mt-6 space-y-4">
            {assignments.length === 0 ? (
              <p className="text-sm text-[#70837e]">
                No assignments uploaded yet.
              </p>
            ) : (
              assignments.map((assignment) => (
                <div
                  key={assignment._id}
                  className="rounded-2xl border border-[#e2ebe8] bg-[#f8faf8] p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#163e38]">
                        {assignment.title}
                      </h3>
                      <p className="text-sm text-[#526b65]">
                        {assignment.subject}
                      </p>
                    </div>
                    <div className="text-sm text-[#506d62]">
                      Due {new Date(assignment.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <span className="rounded-full bg-white px-3 py-2 text-sm text-[#566c64]">
                      Course: {assignment.course}
                    </span>
                    <span className="rounded-full bg-white px-3 py-2 text-sm text-[#566c64]">
                      Semester: {assignment.semester}
                    </span>
                    <span className="rounded-full bg-white px-3 py-2 text-sm text-[#566c64]">
                      Uploaded:{" "}
                      {new Date(assignment.uploadDate).toLocaleDateString()}
                    </span>
                    {assignment.pdfUrl && (
                      <a
                        href={assignment.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-[#eaf6ef] px-3 py-2 text-sm text-[#206a4d]"
                      >
                        View PDF
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default FacultyAssignments;
