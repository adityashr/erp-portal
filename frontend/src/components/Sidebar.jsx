import { NavLink } from "react-router-dom";
import {
  FiBookOpen,
  FiCalendar,
  FiClipboard,
  FiFileText,
  FiGrid,
  FiHelpCircle,
  FiSettings,
  FiUsers,
} from "react-icons/fi";

const roleLinks = {
  student: [
    { label: "Dashboard", path: "/student/dashboard", icon: FiGrid },
    { label: "Timetable", path: "/student/timetable", icon: FiCalendar },
    { label: "Syllabus", path: "/student/syllabus", icon: FiBookOpen },
    { label: "Examination", path: "/student/examination", icon: FiBookOpen },
    { label: "Assignments", path: "/student/assignments", icon: FiFileText },
    { label: "Attendance", path: "/student/attendance", icon: FiClipboard },
    { label: "Notices", path: "/student/notices", icon: FiFileText },
    { label: "Help Desk", path: "/student/help-desk", icon: FiHelpCircle },
    { label: "My Profile", path: "/student/profile", icon: FiUsers },
  ],
  faculty: [
    { label: "Dashboard", path: "/faculty/dashboard", icon: FiGrid },
    { label: "Students", path: "/faculty/students", icon: FiUsers },
    { label: "Attendance", path: "/faculty/attendance", icon: FiClipboard },
    { label: "Assignments", path: "/faculty/assignments", icon: FiFileText },
    { label: "Academics", path: "/faculty/dashboard", icon: FiBookOpen },
  ],
  // admin: [
  //   { label: "Dashboard", path: "/admin/dashboard", icon: FiGrid },
  //   { label: "Faculty", path: "/admin/faculty", icon: FiUsers },
  //   { label: "Subjects", path: "/admin/subjects", icon: FiBookOpen },
  //   { label: "Administration", path: "/admin/dashboard", icon: FiSettings },
  // ],
  admin: [
    { label: "Dashboard", path: "/admin/dashboard", icon: FiGrid },
    { label: "Faculty", path: "/admin/faculty", icon: FiUsers },
    { label: "Subjects", path: "/admin/subjects", icon: FiBookOpen },
    { label: "Attendance", path: "/admin/attendance", icon: FiClipboard },
    { label: "Departments", path: "/admin/departments", icon: FiSettings },
    { label: "Communication", path: "/admin/communication", icon: FiHelpCircle },
  ],
};

function Sidebar({ user, profile }) {
  const links = roleLinks[user?.role] || [];
  return (
    <aside className="hidden w-64 shrink-0 border-r border-[#dce8e4] bg-white lg:block">
      <div className="border-b border-[#e3ece9] bg-[#123f38] px-6 py-7 text-white">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#d29a40] text-lg font-black text-[#173e38]">
          {user?.name?.slice(0, 2).toUpperCase() || "CE"}
        </div>
        <p className="mt-4 truncate font-semibold">{user?.name || "Campus user"}</p>
        <p className="mt-1 text-xs uppercase tracking-wider text-emerald-100/65">
          {user?.role || "portal"} portal
        </p>
        {profile?.enrollmentNumber && (
          <p className="mt-3 text-xs text-[#efca83]">ID · {profile.enrollmentNumber}</p>
        )}
      </div>
      <nav className="p-4">
        <p className="px-3 pb-2 text-[10px] font-bold tracking-[.16em] text-[#81948f]">MAIN MENU</p>
        {links.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive ? "bg-[#e6f1ee] text-[#136b5d]" : "text-[#526b65] hover:bg-[#f2f7f5] hover:text-[#136b5d]"}`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="mx-4 mt-4 rounded-xl bg-[#f3f7f5] p-4 text-xs leading-5 text-[#637872]">
        <FiHelpCircle className="mb-2 text-[#c58a2e]" size={18} />
        <b className="block text-[#284b44]">Need assistance?</b>Contact the academic support desk.
      </div>
    </aside>
  );
}
export default Sidebar;
