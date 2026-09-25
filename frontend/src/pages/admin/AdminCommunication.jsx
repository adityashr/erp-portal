import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMessageSquare, FiSend } from "react-icons/fi";
import api from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from "../../context/AuthContext";

const emptyNotice = {
  title: "",
  content: "",
  category: "General",
  audience: "all",
};

function AdminCommunication() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [notice, setNotice] = useState(emptyNotice);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    Promise.all([api.get("/notices"), api.get("/helpdesk")])
      .then(([noticeResponse, ticketResponse]) => {
        setNotices(noticeResponse.data);
        setTickets(ticketResponse.data);
      })
      .catch((requestError) => {
        setError(requestError.response?.data?.message || "Unable to load communication data.");
      })
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (!user || user.role !== "admin") return null;

  const handleNoticeChange = (event) => {
    setNotice({ ...notice, [event.target.name]: event.target.value });
  };

  const handleNoticeSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await api.post("/notices", {
        ...notice,
        audience: [notice.audience],
      });
      setNotices([response.data, ...notices]);
      setNotice(emptyNotice);
      setMessage("Notice published successfully.");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to publish notice.");
    } finally {
      setSaving(false);
    }
  };

  const updateTicket = async (ticketId, field, value) => {
    try {
      const response = await api.patch(`/helpdesk/${ticketId}`, { [field]: value });
      setTickets(tickets.map((ticket) => (ticket._id === ticketId ? response.data : ticket)));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to update ticket.");
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
      <div className="space-y-6">
        <header className="rounded-2xl bg-[#123f38] p-6 text-white shadow-sm">
          <p className="text-xs font-bold tracking-[.18em] text-[#efca83]">COMMUNICATIONS</p>
          <h1 className="mt-2 text-3xl font-bold">Notices and support desk</h1>
          <p className="mt-2 text-sm text-emerald-50/70">
            Publish campus updates and keep student requests moving to resolution.
          </p>
        </header>

        {message && <p className="rounded-lg bg-[#ecf7ee] p-3 text-sm text-[#1e5a38]">{message}</p>}
        {error && <p className="rounded-lg bg-[#fff1f1] p-3 text-sm text-[#9f1c1c]">{error}</p>}

        <div className="grid gap-6 xl:grid-cols-[.8fr_1.2fr]">
          <section className="rounded-xl border border-[#dce8e4] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <FiSend className="text-[#c58a2e]" size={20} />
              <div>
                <h2 className="font-bold text-[#234941]">Publish notice</h2>
                <p className="text-sm text-[#70837e]">Share an update with the campus.</p>
              </div>
            </div>

            <form onSubmit={handleNoticeSubmit} className="mt-5 space-y-4">
              <input
                name="title"
                value={notice.title}
                onChange={handleNoticeChange}
                required
                placeholder="Notice title"
                className="w-full rounded-lg border border-[#dce8e4] px-3 py-2.5 outline-none focus:border-[#136b5d]"
              />
              <select
                name="category"
                value={notice.category}
                onChange={handleNoticeChange}
                className="w-full rounded-lg border border-[#dce8e4] px-3 py-2.5 outline-none focus:border-[#136b5d]"
              >
                <option>General</option>
                <option>Academic</option>
                <option>Admission</option>
                <option>Exam</option>
                <option>Fee</option>
                <option>Hostel</option>
                <option>Announcement</option>
              </select>
              <select
                name="audience"
                value={notice.audience}
                onChange={handleNoticeChange}
                className="w-full rounded-lg border border-[#dce8e4] px-3 py-2.5 outline-none focus:border-[#136b5d]"
              >
                <option value="all">Everyone</option>
                <option value="student">Students</option>
                <option value="faculty">Faculty</option>
                <option value="admin">Admins</option>
              </select>
              <textarea
                name="content"
                value={notice.content}
                onChange={handleNoticeChange}
                required
                rows={6}
                placeholder="Write the announcement..."
                className="w-full rounded-lg border border-[#dce8e4] px-3 py-2.5 outline-none focus:border-[#136b5d]"
              />
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-[#136b5d] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0f564a] disabled:opacity-60"
              >
                {saving ? "Publishing..." : "Publish notice"}
              </button>
            </form>
          </section>

          <section className="rounded-xl border border-[#dce8e4] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <FiMessageSquare className="text-[#c58a2e]" size={20} />
              <div>
                <h2 className="font-bold text-[#234941]">Support tickets</h2>
                <p className="text-sm text-[#70837e]">Review requests and update their progress.</p>
              </div>
            </div>

            <div className="mt-5 overflow-x-auto">
              {loading ? (
                <p className="py-6 text-sm text-[#70837e]">Loading communications...</p>
              ) : tickets.length === 0 ? (
                <p className="rounded-lg bg-[#f7faf9] p-4 text-sm text-[#70837e]">
                  No support tickets yet.
                </p>
              ) : (
                <table className="w-full min-w-[680px] text-left text-sm">
                  <thead className="border-b border-[#e6eee9] text-xs uppercase tracking-wide text-[#81938e]">
                    <tr>
                      <th className="px-3 py-3">Request</th>
                      <th className="px-3 py-3">Student</th>
                      <th className="px-3 py-3">Priority</th>
                      <th className="px-3 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket) => (
                      <tr key={ticket._id} className="border-b border-[#eef3f0] align-top">
                        <td className="px-3 py-4">
                          <p className="font-semibold text-[#294b44]">{ticket.subject}</p>
                          <p className="mt-1 max-w-xs text-xs leading-5 text-[#70837e]">
                            {ticket.message}
                          </p>
                          <p className="mt-1 text-xs text-[#81938e]">{ticket.category}</p>
                        </td>
                        <td className="px-3 py-4 text-[#526b65]">
                          {ticket.user?.name || ticket.name}
                        </td>
                        <td className="px-3 py-4">
                          <select
                            value={ticket.priority || "Medium"}
                            onChange={(event) =>
                              updateTicket(ticket._id, "priority", event.target.value)
                            }
                            className="rounded border border-[#dce8e4] px-2 py-1 text-xs"
                          >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                          </select>
                        </td>
                        <td className="px-3 py-4">
                          <select
                            value={ticket.status}
                            onChange={(event) =>
                              updateTicket(ticket._id, "status", event.target.value)
                            }
                            className="rounded border border-[#dce8e4] px-2 py-1 text-xs"
                          >
                            <option>Open</option>
                            <option>In Progress</option>
                            <option>Resolved</option>
                            <option>Closed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>

        <section className="rounded-xl border border-[#dce8e4] bg-white p-5 shadow-sm">
          <h2 className="font-bold text-[#234941]">Published notices</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {notices.length === 0 ? (
              <p className="text-sm text-[#70837e]">No notices published yet.</p>
            ) : (
              notices.slice(0, 6).map((item) => (
                <article key={item._id} className="rounded-lg bg-[#f7faf9] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#c58a2e]">
                    {item.category}
                  </p>
                  <h3 className="mt-1 font-semibold text-[#294b44]">{item.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-[#70837e]">{item.content}</p>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default AdminCommunication;
