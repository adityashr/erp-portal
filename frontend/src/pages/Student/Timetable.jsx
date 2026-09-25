import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../api/axios";

function Timetable() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "student") {
      navigate("/");
      return;
    }

    const fetchTimetable = async () => {
      try {
        const res = await api.get("/timetable");
        setTimetable(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load timetable.");
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [user, navigate]);

  if (!user || user.role !== "student") return null;

  return (
    <DashboardLayout
      user={user}
      onLogout={() => {
        logout();
        navigate("/");
      }}
    >
      <div className="rounded-xl border border-[#dce8e4] bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-[#193e37]">Timetable</h1>
        <p className="mt-2 text-sm text-[#60746e]">
          View your weekly schedule and class timings.
        </p>
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-[#70837e]">Loading timetable...</p>
      ) : error ? (
        <p className="mt-6 text-sm text-[#9f1c1c]">{error}</p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-xl border border-[#e2ebe8] bg-white shadow-sm">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-[#f4f8f6] text-xs uppercase tracking-wide text-[#70837e]">
              <tr>
                <th className="px-5 py-3">Day</th>
                <th className="px-5 py-3">08:00 - 09:00</th>
                <th className="px-5 py-3">09:00 - 10:00</th>
                <th className="px-5 py-3">10:15 - 11:15</th>
                <th className="px-5 py-3">11:15 - 12:15</th>
                <th className="px-5 py-3">01:00 - 02:00</th>
              </tr>
            </thead>
            <tbody>
              {timetable.map((row) => (
                <tr key={row.day} className="border-t border-[#edf2f0]">
                  <td className="px-5 py-3 font-semibold text-[#263f37]">
                    {row.day}
                  </td>
                  <td className="px-5 py-3">{row.slot1}</td>
                  <td className="px-5 py-3">{row.slot2}</td>
                  <td className="px-5 py-3">{row.slot3}</td>
                  <td className="px-5 py-3">{row.slot4}</td>
                  <td className="px-5 py-3">{row.slot5}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Timetable;
