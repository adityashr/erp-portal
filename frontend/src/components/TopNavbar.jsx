import { FiBell, FiChevronDown, FiHome, FiLogOut } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function TopNavbar({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <header className="flex h-16 items-center justify-between border-b border-[#dce8e4] bg-white px-5 shadow-sm md:px-7">
      <button
        onClick={() => navigate(`/${user?.role}/dashboard`)}
        className="flex items-center gap-3"
      >
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#136b5d] text-xs font-black text-white">
          CE
        </div>
        <div className="text-left">
          <p className="font-bold tracking-tight text-[#173e38]">
            CampusOne ERP
          </p>
          <p className="text-[9px] font-semibold tracking-[.16em] text-[#71857f]">
            ACADEMIC PORTAL
          </p>
        </div>
      </button>
      <div className="flex items-center gap-3">
        <button className="grid h-9 w-9 place-items-center rounded-full text-[#58706a] hover:bg-[#edf5f2]">
          <FiBell />
        </button>
        <button
          onClick={() => navigate(`/${user?.role}/dashboard`)}
          className="hidden items-center gap-1 text-sm text-[#557069] sm:flex"
        >
          <FiHome /> Home
        </button>
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-[#f1f6f4]"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#e7f0ed] text-xs font-bold text-[#146c5e]">
              {user?.name?.slice(0, 2).toUpperCase()}
            </span>
            <span className="hidden text-left sm:block">
              <span className="block max-w-28 truncate text-sm font-semibold text-[#294b44]">
                {user?.name}
              </span>
              <span className="block text-[10px] uppercase tracking-wide text-[#82938f]">
                {user?.role}
              </span>
            </span>
            <FiChevronDown className="text-[#768984]" />
          </button>
          {open && (
            <div className="absolute right-0 top-11 z-20 w-36 rounded-lg border border-[#dbe7e3] bg-white p-1 shadow-xl">
              <button
                onClick={onLogout}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-700 hover:bg-red-50"
              >
                <FiLogOut /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
export default TopNavbar;
