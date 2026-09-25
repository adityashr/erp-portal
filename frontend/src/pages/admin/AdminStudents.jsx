import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../api/axios";
function AdminStudents() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  //
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    email: "",
    phone: "",
    course: "",
    department: "",
    batch: "",
    semester: "",
    status: "Active",
  });
  const [error, setError] = useState("");
  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (error) {
      setError(error.response?.data?.message || "Unable to load students");
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await api.get("/departments");
      setDepartments(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  //
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await api.put(`/students/${editId}`, formData);
      } else {
        await api.post("/students", formData);
      }

      setShowModal(false);
      setEditId(null);

      setFormData({
        studentId: "",
        name: "",
        email: "",
        phone: "",
        course: "",
        department: "",
        batch: "",
        semester: "",
        status: "Active",
      });

      fetchStudents();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save student");
    }
  };
  const handleEdit = (f) => {
    setEditId(f._id);

    setFormData({
      studentId: f.studentId,
      course: f.course,
      batch: f.batch,
      semester: f.semester,
      name: f.name,
      email: f.email,
      phone: f.phone,
      department: f.department?._id,
      status: f.status,
    });

    setShowModal(true);
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await api.delete(`/students/${id}`);
      fetchStudents();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    fetchStudents();
    fetchDepartments();
  }, [user, navigate]);

  const filteredStudents = students.filter((s) => {
    return (
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.studentId?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase()) ||
      s.department?.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.course?.toLowerCase().includes(search.toLowerCase())
    );
  });
  if (!user) return null;
  if (loading) {
    return (
      <DashboardLayout user={user}>
        <p className="p-6">Loading...</p>
      </DashboardLayout>
    );
  }

  if (!user || user.role !== "admin") return null;
  return (
    <DashboardLayout
      user={user}
      onLogout={() => {
        logout();
        navigate("/");
      }}
    >
      {/* <div className="mb-6 rounded-xl border border-[#dce8e4] bg-white px-5 py-4">
        <p className="text-xs font-bold tracking-[.14em] text-[#bd8128]">
          ADMINISTRATION
        </p>
        <h1 className="mt-1 text-xl font-bold text-[#193e37]">
          Students directory
        </h1>
        <p className="mt-1 text-sm text-[#70837e]">
          Registered Students profiles and department details.
        </p>
      </div> */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#193e37]">Students</h1>

          <p className="text-sm text-gray-500">Manage all Students members</p>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search Students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-[#136b5d]"
          />

          <button
            onClick={() => {
              setEditId(null);

              setFormData({
                studentId: "",
                name: "",
                email: "",
                phone: "",
                department: "",
                course: "",
                batch: "",
                semester: "",
                status: "Active",
              });

              setShowModal(true);
            }}
            className="rounded-lg bg-[#136b5d] px-5 py-2 font-semibold text-white hover:bg-[#0f564a]"
          >
            + Add Students
          </button>
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      <section className="overflow-hidden rounded-xl border border-[#dce8e4] bg-white shadow-sm">
        <div className="border-b border-[#e4ece9] px-5 py-4 font-bold text-[#234941]">
          Students records{" "}
          <span className="ml-2 text-sm font-normal text-[#70837e]">
            ({filteredStudents.length})
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-[#f4f8f6] text-xs uppercase tracking-wide text-[#70837e]">
              <tr>
                {[
                  "Student",
                  "Student ID",
                  "Course",
                  "Department",
                  "Semester",
                  "Email",
                  "Actions",
                ].map((h) => (
                  <th className="px-5 py-3" key={h}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length ? (
                filteredStudents.map((s) => (
                  <tr
                    className="border-t border-[#edf2f0] text-[#526b65]"
                    key={s._id}
                  >
                    <td className="px-5 py-3 font-medium text-[#234941]">
                      {s.name}
                    </td>

                    <td className="px-5 py-3">{s.studentId}</td>

                    <td className="px-5 py-3">{s.course || "—"}</td>
                    <td className="px-5 py-3">{s.department?.name || "—"}</td>

                    <td className="px-5 py-3">{s.semester || "—"}</td>

                    <td className="px-5 py-3">{s.email}</td>

                    {/* 👇 Actions last me */}
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(s)}
                          className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(s._id)}
                          className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-5 py-6 text-[#70837e]" colSpan="7">
                    No Students records available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#193e37]">
                {editId ? "Edit Students" : "Add Students"}
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-2xl font-bold text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="studentId"
                placeholder="Students ID"
                value={formData.studentId}
                onChange={handleChange}
                className="rounded border p-2"
                required
              />

              <input
                type="text"
                name="name"
                placeholder="Students Name"
                value={formData.name}
                onChange={handleChange}
                className="rounded border p-2"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="rounded border p-2"
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="rounded border p-2"
              />

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="rounded border p-2"
                required
              >
                <option value="">Select Department</option>

                {departments.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="course"
                placeholder="Course"
                value={formData.course}
                onChange={handleChange}
                className="rounded border p-2"
                required
              />

              <input
                type="text"
                name="batch"
                placeholder="Batch"
                value={formData.batch}
                onChange={handleChange}
                className="rounded border p-2"
              />

              <input
                type="number"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="rounded border p-2"
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="rounded border p-2"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <div></div>

              <button
                type="submit"
                className="rounded-lg bg-[#136b5d] py-2 font-semibold text-white hover:bg-[#0f564a]"
              >
                {editId ? "Update Students" : "Add Students"}
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
export default AdminStudents;
