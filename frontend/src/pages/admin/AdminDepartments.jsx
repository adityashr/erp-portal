import { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminDepartments() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  //

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    hod: "",
    description: "",
    status: "Active",
  });
  // EDIT DEPARTMENT ID
  const [editId, setEditId] = useState(null);
  // SEARCH DEPARTMENT
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await api.get("/departments");
      setDepartments(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  //
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= Edit Department =================

  const handleEdit = (dept) => {
    setEditId(dept._id);

    setFormData({
      name: dept.name,
      code: dept.code,
      hod: dept.hod,
      description: dept.description,
      status: dept.status,
    });

    setShowModal(true);
  };

  // ================= Delete Department =================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/departments/${id}`);

      alert("Department deleted successfully");

      fetchDepartments();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete department");
    }
  };

  // ================= Add Department =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await api.put(`/departments/${editId}`, formData);
      } else {
        await api.post("/departments", formData);
      }
      //   await api.post("/departments", formData);

      setShowModal(false);
      //
      setEditId(null);

      setFormData({
        name: "",
        code: "",
        hod: "",
        description: "",
        status: "Active",
      });

      fetchDepartments();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create department");
    }
  };

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(search.toLowerCase()) ||
      dept.code.toLowerCase().includes(search.toLowerCase()) ||
      dept.hod.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <DashboardLayout
      user={user}
      onLogout={() => {
        logout();
        navigate("/");
      }}
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#193e37]">Departments</h1>

          <p className="text-sm text-gray-500">
            Manage all departments of your college
          </p>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search Department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-[#136b5d]"
          />
          <button
            onClick={() => {
              setEditId(null);

              setFormData({
                name: "",
                code: "",
                hod: "",
                description: "",
                status: "Active",
              });

              setShowModal(true);
            }}
            className="rounded-lg bg-[#136b5d] px-5 py-2 font-semibold text-white hover:bg-[#0f564a]"
          >
            + Add Department
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#dce8e4] bg-white shadow">
        <table className="w-full">
          <thead className="bg-[#136b5d] text-white">
            <tr>
              <th className="px-5 py-3 text-left">Department</th>
              <th className="px-5 py-3 text-left">Code</th>
              <th className="px-5 py-3 text-left">HOD</th>
              <th className="px-5 py-3 text-left">Status</th>
              <th className="px-5 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="py-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : departments.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-6 text-center">
                  No Departments Found
                </td>
              </tr>
            ) : (
              filteredDepartments.map((dept) => (
                <tr key={dept._id} className="border-b hover:bg-gray-50">
                  <td className="px-5 py-4">{dept.name}</td>

                  <td className="px-5 py-4">{dept.code}</td>

                  <td className="px-5 py-4">{dept.hod}</td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                      {dept.status}
                    </span>
                  </td>

                  <td className="space-x-2 px-5 py-4 text-center">
                    <button
                      onClick={() => handleEdit(dept)}
                      className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(dept._id)}
                      className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              {/* <h2 className="text-2xl font-bold text-[#193e37]">
                Add Department
              </h2> */}
              <h2 className="text-2xl font-bold text-[#193e37]">
                {editId ? "Edit Department" : "Add Department"}
              </h2>

              <button
                onClick={() => {
                  setShowModal(false);
                  setEditId(null);
                }}
                className="text-xl text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Department Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Computer Science"
                  className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[#136b5d]"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Department Code</label>

                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="CSE"
                  className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[#136b5d]"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">HOD Name</label>

                <input
                  type="text"
                  name="hod"
                  value={formData.hod}
                  onChange={handleChange}
                  placeholder="Dr. Sharma"
                  className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[#136b5d]"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Department description"
                  rows="3"
                  className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[#136b5d]"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                >
                  <option value="Active">Active</option>

                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditId(null);
                  }}
                  className="rounded-lg border px-4 py-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-[#136b5d] px-5 py-2 text-white hover:bg-[#0f564a]"
                >
                  {editId ? "Update Department" : "Save Department"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default AdminDepartments;
