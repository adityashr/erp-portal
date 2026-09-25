// import DashboardLayout from "../../components/DashboardLayout";

// function AdminAttendance() {
//   return (
//     <DashboardLayout>
//       <div className="p-6">
//         <h1 className="text-3xl font-bold mb-4">Attendance Management</h1>

//         <div className="bg-white shadow rounded-lg p-6">
//           <p className="text-gray-600">
//             Attendance records will be displayed here.
//           </p>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }

// export default AdminAttendance;

import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../api/axios";

function AdminAttendance() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await api.get("/attendance");
      setAttendance(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Attendance Management</h1>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Student ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Semester</th>
                <th className="p-3 text-left">Overall %</th>
              </tr>
            </thead>

            <tbody>
              {attendance.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="p-3">{item.student?.studentId}</td>

                  <td className="p-3">{item.student?.name}</td>

                  <td className="p-3">{item.semester}</td>

                  <td className="p-3">{item.overall}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminAttendance;
