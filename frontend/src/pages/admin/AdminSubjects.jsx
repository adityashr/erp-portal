// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import DashboardLayout from "../../components/DashboardLayout";
// import api from "../../api/axios";
// function AdminSubjects() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [subjects, setSubjects] = useState([]);
//   const [error, setError] = useState("");
//   useEffect(() => {
//     if (!user || user.role !== "admin") {
//       navigate("/");
//       return;
//     }
//     api
//       .get("/subjects")
//       .then((r) => setSubjects(r.data))
//       .catch((e) =>
//         setError(e.response?.data?.message || "Unable to load subjects"),
//       );
//   }, [user, navigate]);
//   if (!user || user.role !== "admin") return null;
//   return (
//     <DashboardLayout
//       user={user}
//       onLogout={() => {
//         logout();
//         navigate("/");
//       }}
//     >
//       <div className="mb-6 rounded-xl border border-[#dce8e4] bg-white px-5 py-4">
//         <p className="text-xs font-bold tracking-[.14em] text-[#bd8128]">
//           ADMINISTRATION
//         </p>
//         <h1 className="mt-1 text-xl font-bold text-[#193e37]">
//           Subject catalogue
//         </h1>
//         <p className="mt-1 text-sm text-[#70837e]">
//           Course, branch and faculty assignment records.
//         </p>
//       </div>
//       {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
//       <section className="overflow-hidden rounded-xl border border-[#dce8e4] bg-white shadow-sm">
//         <div className="border-b border-[#e4ece9] px-5 py-4 font-bold text-[#234941]">
//           Subject records{" "}
//           <span className="ml-2 text-sm font-normal text-[#70837e]">
//             ({subjects.length})
//           </span>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[750px] text-left text-sm">
//             <thead className="bg-[#f4f8f6] text-xs uppercase tracking-wide text-[#70837e]">
//               <tr>
//                 {[
//                   "Subject",
//                   "Code",
//                   "Course",
//                   "Branch",
//                   "Semester",
//                   "Faculty",
//                 ].map((h) => (
//                   <th className="px-5 py-3" key={h}>
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {subjects.length ? (
//                 subjects.map((s) => (
//                   <tr
//                     className="border-t border-[#edf2f0] text-[#526b65]"
//                     key={s._id}
//                   >
//                     <td className="px-5 py-3 font-medium text-[#234941]">
//                       {s.name}
//                     </td>
//                     <td className="px-5 py-3">{s.code}</td>
//                     <td className="px-5 py-3">{s.course}</td>
//                     <td className="px-5 py-3">{s.branch}</td>
//                     <td className="px-5 py-3">{s.semester}</td>
//                     <td className="px-5 py-3">
//                       {s.faculty?.user?.name || "Unassigned"}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td className="px-5 py-6 text-[#70837e]" colSpan="6">
//                     No subjects available.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </section>
//     </DashboardLayout>
//   );
// }
// export default AdminSubjects;

// new

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../api/axios";

function AdminSubjects() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [faculty, setFaculty] = useState([]);

  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    subjectCode: "",
    name: "",
    department: "",
    faculty: "",
    semester: "",
    credits: 4,
    status: "Active",
  });

  const fetchSubjects = async () => {
    try {
      const res = await api.get("/subjects");
      setSubjects(res.data);
    } catch (error) {
      setError(error.response?.data?.message || "Unable to load subjects");
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

  const fetchFaculty = async () => {
    try {
      const res = await api.get("/faculty");
      setFaculty(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    fetchSubjects();
    fetchDepartments();
    fetchFaculty();
  }, [user, navigate]);

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
        await api.put(`/subjects/${editId}`, formData);
      } else {
        await api.post("/subjects", formData);
      }

      setShowModal(false);
      setEditId(null);

      setFormData({
        subjectCode: "",
        name: "",
        department: "",
        faculty: "",
        semester: "",
        credits: 4,
        status: "Active",
      });

      fetchSubjects();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save subject");
    }
  };

  const handleEdit = (s) => {
    setEditId(s._id);

    setFormData({
      subjectCode: s.subjectCode,
      name: s.name,
      department: s.department?._id,
      faculty: s.faculty?._id || "",
      semester: s.semester,
      credits: s.credits,
      status: s.status,
    });

    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this subject?")) return;

    try {
      await api.delete(`/subjects/${id}`);
      fetchSubjects();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const filteredSubjects = subjects.filter((s) => {
    return (
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.subjectCode?.toLowerCase().includes(search.toLowerCase())
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
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#193e37]">Subjects</h1>

          <p className="text-sm text-gray-500">Manage all subjects</p>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg border px-4 py-2"
          />

          <button
            onClick={() => {
              setEditId(null);

              setFormData({
                subjectCode: "",
                name: "",
                department: "",
                faculty: "",
                semester: "",
                credits: 4,
                status: "Active",
              });

              setShowModal(true);
            }}
            className="rounded-lg bg-[#136b5d] px-5 py-2 text-white"
          >
            + Add Subject
          </button>
        </div>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <section className="rounded-xl border bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#f4f8f6]">
            <tr>
              {[
                "Code",
                "Subject",
                "Department",
                "Semester",
                "Faculty",
                "Credits",
                "Status",
                "Action",
              ].map((h) => (
                <th key={h} className="px-5 py-3 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredSubjects.length ? (
              filteredSubjects.map((s) => (
                <tr key={s._id} className="border-t">
                  <td className="px-5 py-3">{s.subjectCode}</td>

                  <td className="px-5 py-3">{s.name}</td>

                  <td className="px-5 py-3">{s.department?.name || "-"}</td>

                  <td className="px-5 py-3">{s.semester}</td>

                  <td className="px-5 py-3">
                    {s.faculty?.name || s.faculty?.user?.name || "Unassigned"}
                  </td>

                  <td className="px-5 py-3">{s.credits}</td>

                  <td className="px-5 py-3">{s.status}</td>

                  <td className="px-5 py-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(s)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(s._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-5 py-6 text-center">
                  No subjects available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-5">
              {editId ? "Edit Subject" : "Add Subject"}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input
                name="subjectCode"
                placeholder="Subject Code"
                value={formData.subjectCode}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />

              <input
                name="name"
                placeholder="Subject Name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="">Select Department</option>

                {departments.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name}
                  </option>
                ))}
              </select>

              <select
                name="faculty"
                value={formData.faculty}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="">Select Faculty</option>

                {faculty.map((f) => (
                  <option key={f._id} value={f._id}>
                    {f.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="semester"
                placeholder="Semester"
                value={formData.semester}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <input
                type="number"
                name="credits"
                value={formData.credits}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option>Active</option>

                <option>Inactive</option>
              </select>

              <button className="bg-[#136b5d] text-white rounded p-2">
                {editId ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default AdminSubjects;
