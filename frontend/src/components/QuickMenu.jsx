import { useNavigate } from "react-router-dom";
import {
  FiBookOpen,
  FiCalendar,
  FiClipboard,
  FiCreditCard,
  FiFileText,
  FiHelpCircle,
  FiHome,
  FiMapPin,
  FiTruck,
} from "react-icons/fi";
const menus = [
  { title: "Academics", icon: FiBookOpen, path: "/student/dashboard" },
  { title: "Timetable", icon: FiCalendar, path: "/student/timetable" },
  { title: "Syllabus", icon: FiBookOpen, path: "/student/syllabus" },
  { title: "Examination", icon: FiBookOpen, path: "/student/examination" },
  { title: "Attendance", icon: FiClipboard, path: "/student/attendance" },
  { title: "Assignments", icon: FiFileText, path: "/student/assignments" },
  { title: "Fee", icon: FiCreditCard, path: "/student/fee" },
  { title: "Help Desk", icon: FiHelpCircle, path: "/student/help-desk" },
];
function QuickMenu() {
  const navigate = useNavigate();
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-bold text-[#264a43]">Quick access</h2>
        <span className="text-xs text-[#80928d]">Student services</span>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 xl:grid-cols-9">
        {menus.map(({ title, icon: Icon, path }) => (
          <button
            key={title}
            onClick={() => path && navigate(path)}
            className="group rounded-xl border border-[#dce8e4] bg-white px-2 py-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-[#88b9ae] hover:shadow-md"
          >
            <Icon
              className="mx-auto text-[#136b5d] group-hover:text-[#c68c32]"
              size={22}
            />
            <span className="mt-2 block text-xs font-medium text-[#526b65]">
              {title}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
export default QuickMenu;
