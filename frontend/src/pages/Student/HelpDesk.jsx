import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../api/axios";

function HelpDesk() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: "",
    category: "General",
    message: "",
    contactEmail: user?.email || "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "student") {
      navigate("/");
      return;
    }

    setFormData((prev) => ({ ...prev, contactEmail: user.email || "" }));
  }, [user, navigate]);

  if (!user || user.role !== "student") return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);

    try {
      await api.post("/helpdesk", {
        subject: formData.subject,
        category: formData.category,
        message: formData.message,
        contactEmail: formData.contactEmail,
      });

      setSubmitted(true);
      setFormData({
        subject: "",
        category: "General",
        message: "",
        contactEmail: user.email || "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to submit support request.");
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
        <div className="rounded-xl border border-[#dce8e4] bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#81948f]">
            Help Desk
          </p>
          <h1 className="mt-3 text-3xl font-bold text-[#193e37]">Student Support Center</h1>
          <p className="mt-2 text-sm leading-6 text-[#60746e]">
            Submit your issue or question and our academic support team will respond as soon as
            possible.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-[#dce8e4] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#173e38]">Support Hours</h2>
            <ul className="mt-4 space-y-3 text-sm text-[#546e64]">
              <li>Mon - Fri: 9:00 AM to 6:00 PM</li>
              <li>Sat: 10:00 AM to 2:00 PM</li>
              <li>Sun: Closed</li>
            </ul>
          </div>

          <div className="rounded-xl border border-[#dce8e4] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#173e38]">Contact Info</h2>
            <p className="mt-4 text-sm text-[#546e64]">Email: support@campusone.edu</p>
            <p className="mt-2 text-sm text-[#546e64]">Phone: +91 98765 43210</p>
          </div>

          <div className="rounded-xl border border-[#dce8e4] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#173e38]">What we help with</h2>
            <ul className="mt-4 space-y-3 text-sm text-[#546e64]">
              <li>Fee payment and receipts</li>
              <li>Academic records and attendance</li>
              <li>Profile or enrollment support</li>
            </ul>
          </div>
        </div>

        <div className="rounded-xl border border-[#dce8e4] bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {submitted && (
              <div className="rounded-xl bg-[#ecf7ee] p-4 text-sm text-[#1e5a38]">
                Your support request has been submitted successfully.
              </div>
            )}
            {error && (
              <div className="rounded-xl bg-[#fff1f1] p-4 text-sm text-[#9f1c1c]">{error}</div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium text-[#294d46]">Subject</label>
              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-[#dce8e4] bg-[#fbfdfc] px-3 py-3 outline-none"
                placeholder="Enter a short subject"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#294d46]">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#dce8e4] bg-[#fbfdfc] px-3 py-3 outline-none"
              >
                <option>General</option>
                <option>Fees</option>
                <option>Attendance</option>
                <option>Academic Records</option>
                <option>Technical</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#294d46]">Contact Email</label>
              <input
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-[#dce8e4] bg-[#fbfdfc] px-3 py-3 outline-none"
                placeholder="your.email@college.edu"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#294d46]">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full rounded-xl border border-[#dce8e4] bg-[#fbfdfc] px-3 py-3 outline-none"
                placeholder="Tell us how we can help you"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-[#136b5d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0f564a]"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default HelpDesk;
