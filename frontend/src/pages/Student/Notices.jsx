import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../api/axios";

function Notices() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "student") {
      navigate("/");
      return;
    }

    api
      .get("/notices")
      .then((response) => setNotices(response.data))
      .catch((error) => {
        console.error(error);
        setNotices([]);
      })
      .finally(() => setLoading(false));
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
      <div className="space-y-6">
        <div className="rounded-xl border border-[#dce8e4] bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#81948f]">
            Notice Board
          </p>
          <h1 className="mt-3 text-3xl font-bold text-[#193e37]">Latest notices & announcements</h1>
        </div>

        {loading ? (
          <p className="text-sm text-[#70837e]">Loading notices...</p>
        ) : notices.length === 0 ? (
          <div className="rounded-xl border border-[#dce8e4] bg-white p-6 text-sm text-[#60746e] shadow-sm">
            No notices are available right now.
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map((notice) => (
              <article
                key={notice._id}
                className="rounded-xl border border-[#dce8e4] bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[.14em] text-[#c58a2e]">
                      {notice.category || "General"}
                    </p>
                    <h2 className="mt-2 text-xl font-bold text-[#173e38]">{notice.title}</h2>
                  </div>
                  <span className="rounded-full bg-[#eaf5ef] px-3 py-1 text-xs font-semibold text-[#136b5d]">
                    {new Date(notice.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-[#4d635c]">
                  {notice.content}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Notices;
