import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/DashboardLayout";
import { useEffect, useState } from "react";
import api from "../../api/axios";

function FacultyAttendance() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [students, setStudents] = useState([]);
  // 👇 ADD HERE
  const [attendanceData, setAttendanceData] = useState({});
  const [loading, setLoading] = useState(false);
  const loadStudents = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        `/students?course=${course}&semester=${semester}`,
      );

      setStudents(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const saveAttendance = async () => {
    try {
      for (const student of students) {
        await api.post("/attendance/mark", {
          student: student.user._id,
          faculty: user._id,
          course,
          semester,
          subject: "Java",
          status: attendanceData[student._id] || "Absent",
        });
      }

      alert("Attendance Saved Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DashboardLayout
      user={user}
      onLogout={() => {
        logout();
        navigate("/");
      }}
    >
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold mb-4">Faculty Attendance</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <select
            className="border rounded-lg p-2"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option value="">Select Course</option>
            <option value="BCA">BCA</option>
            <option value="B.Com">B.Com</option>
            <option value="BBA">BBA</option>
            <option value="MBA">MBA</option>
          </select>

          <select
            className="border rounded-lg p-2"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option value="">Semester</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>

          <button
            className="bg-green-600 text-white rounded-lg"
            onClick={loadStudents}
          >
            Load Students
          </button>
        </div>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Student ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Attendance</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td className="border p-2">{student.user?.studentId}</td>

                <td className="border p-2">{student.user?.name}</td>

                <td className="border p-2">
                  <label className="mr-3">
                    <input
                      type="radio"
                      name={student._id}
                      value="Present"
                      onChange={(e) =>
                        setAttendanceData({
                          ...attendanceData,
                          [student._id]: e.target.value,
                        })
                      }
                    />
                    Present
                  </label>

                  <label>
                    <input
                      type="radio"
                      name={student._id}
                      value="Absent"
                      onChange={(e) =>
                        setAttendanceData({
                          ...attendanceData,
                          [student._id]: e.target.value,
                        })
                      }
                    />
                    Absent
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={saveAttendance}
          className="mt-5 bg-green-600 text-white px-5 py-2 rounded-lg"
        >
          Save Attendance
        </button>
      </div>
    </DashboardLayout>
  );
}

export default FacultyAttendance;
