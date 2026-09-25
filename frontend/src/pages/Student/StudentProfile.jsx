import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/DashboardLayout";
function StudentProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!user || user.role !== "student") {
      navigate("/");
      return;
    }
    api
      .get("/students")
      .then((r) =>
        setProfile(r.data.find((s) => s.user?._id === user._id) || null),
      )
      .catch((e) =>
        setError(e.response?.data?.message || "Failed to load profile"),
      )
      .finally(() => setLoading(false));
  }, [user, navigate]);
  if (!user || user.role !== "student") return null;
  const fields = [
    ["Full name", profile?.user?.name],
    ["Email", profile?.user?.email],
    ["Enrollment ID", profile?.enrollmentNumber],
    ["Course", profile?.course],
    ["Branch", profile?.branch],
    ["Semester", profile?.semester],
    ["Section", profile?.section],
    ["Mobile", profile?.mobile],
  ];
  return (
    <DashboardLayout
      user={user}
      profile={profile}
      onLogout={() => {
        logout();
        navigate("/");
      }}
    >
      <div className="mb-6 rounded-xl border border-[#dce8e4] bg-white px-5 py-4">
        <p className="text-xs font-bold tracking-[.14em] text-[#bd8128]">
          STUDENT RECORD
        </p>
        <h1 className="mt-1 text-xl font-bold text-[#193e37]">My profile</h1>
        <p className="mt-1 text-sm text-[#70837e]">
          Review the personal and academic information linked to your account.
        </p>
      </div>
      {loading && <p className="text-sm text-[#70837e]">Loading profile...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!loading && !error && !profile && (
        <p className="rounded-xl border border-[#dce8e4] bg-white p-5 text-sm text-[#70837e]">
          No student profile found. Contact the administrator.
        </p>
      )}
      {profile && (
        <section className="overflow-hidden rounded-xl border border-[#dce8e4] bg-white shadow-sm">
          <div className="border-b border-[#e4ece9] px-5 py-4 font-bold text-[#234941]">
            Profile information
          </div>
          <div className="grid sm:grid-cols-2">
            {fields.map(([label, value]) => (
              <div
                key={label}
                className="border-b border-r border-[#edf2f0] px-5 py-4"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[#82938f]">
                  {label}
                </p>
                <p className="mt-1 text-sm font-medium text-[#294b44]">
                  {value || "—"}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </DashboardLayout>
  );
}
export default StudentProfile;
