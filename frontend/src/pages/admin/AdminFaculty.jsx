import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../api/axios";
function AdminFaculty() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState([]);
  //
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    facultyId: "",
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    qualification: "",
    joiningDate: "",
    status: "Active",
  });

  const [error, setError] = useState("");
  const fetchFaculty = async () => {
    try {
      const res = await api.get("/faculty");
      setFaculty(res.data);
    } catch (error) {
      setError(
        error.response?.data?.message || "Unable to load faculty records",
      );
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
        await api.put(`/faculty/${editId}`, formData);
      } else {
        await api.post("/faculty", formData);
      }

      setShowModal(false);
      setEditId(null);

      setFormData({
        facultyId: "",
        name: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        qualification: "",
        joiningDate: "",
        status: "Active",
      });

      fetchFaculty();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save faculty");
    }
  };
  const handleEdit = (f) => {
    setEditId(f._id);

    setFormData({
      facultyId: f.facultyId,
      name: f.name,
      email: f.email,
      phone: f.phone,
      department: f.department?._id,
      designation: f.designation,
      qualification: f.qualification,
      joiningDate: f.joiningDate?.substring(0, 10),
      status: f.status,
    });

    setShowModal(true);
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this faculty?")) return;

    try {
      await api.delete(`/faculty/${id}`);
      fetchFaculty();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    fetchFaculty();
    fetchDepartments();
  }, [user, navigate]);

  const filteredFaculty = faculty.filter((f) => {
    return (
      f.name?.toLowerCase().includes(search.toLowerCase()) ||
      f.facultyId?.toLowerCase().includes(search.toLowerCase()) ||
      f.email?.toLowerCase().includes(search.toLowerCase()) ||
      f.department?.name?.toLowerCase().includes(search.toLowerCase()) ||
      f.designation?.toLowerCase().includes(search.toLowerCase())
    );
  });

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
          Faculty directory
        </h1>
        <p className="mt-1 text-sm text-[#70837e]">
          Registered faculty profiles and department details.
        </p>
      </div> */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#193e37]">Faculty</h1>

          <p className="text-sm text-gray-500">Manage all faculty members</p>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search Faculty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-[#136b5d]"
          />

          <button
            onClick={() => {
              setEditId(null);

              setFormData({
                facultyId: "",
                name: "",
                email: "",
                phone: "",
                department: "",
                designation: "",
                qualification: "",
                joiningDate: "",
                status: "Active",
              });

              setShowModal(true);
            }}
            className="rounded-lg bg-[#136b5d] px-5 py-2 font-semibold text-white hover:bg-[#0f564a]"
          >
            + Add Faculty
          </button>
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      <section className="overflow-hidden rounded-xl border border-[#dce8e4] bg-white shadow-sm">
        <div className="border-b border-[#e4ece9] px-5 py-4 font-bold text-[#234941]">
          Faculty records{" "}
          <span className="ml-2 text-sm font-normal text-[#70837e]">
            ({filteredFaculty.length})
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-[#f4f8f6] text-xs uppercase tracking-wide text-[#70837e]">
              <tr>
                {[
                  "Faculty member",
                  "Faculty ID",
                  "Department",
                  "Designation",
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
              {filteredFaculty.length ? (
                filteredFaculty.map((f) => (
                  <tr
                    className="border-t border-[#edf2f0] text-[#526b65]"
                    key={f._id}
                  >
                    <td className="px-5 py-3 font-medium text-[#234941]">
                      {f.name}
                    </td>

                    <td className="px-5 py-3">{f.facultyId}</td>

                    <td className="px-5 py-3">{f.department?.name || "—"}</td>

                    <td className="px-5 py-3">{f.designation || "—"}</td>

                    {/* 👇 Email yahan add karo */}
                    <td className="px-5 py-3">{f.email}</td>

                    {/* 👇 Actions last me */}
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(f)}
                          className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(f._id)}
                          className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>

                    {/* {f.email}</td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-5 py-6 text-[#70837e]" colSpan="6">
                    No faculty records available.
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
                {editId ? "Edit Faculty" : "Add Faculty"}
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
                name="facultyId"
                placeholder="Faculty ID"
                value={formData.facultyId}
                onChange={handleChange}
                className="rounded border p-2"
                required
              />

              <input
                type="text"
                name="name"
                placeholder="Faculty Name"
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
                name="designation"
                placeholder="Designation"
                value={formData.designation}
                onChange={handleChange}
                className="rounded border p-2"
                required
              />

              <input
                type="text"
                name="qualification"
                placeholder="Qualification"
                value={formData.qualification}
                onChange={handleChange}
                className="rounded border p-2"
              />

              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
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
                {editId ? "Update Faculty" : "Add Faculty"}
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
export default AdminFaculty;
