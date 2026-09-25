import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import TopNavbar from "./TopNavbar";

function DashboardLayout({ user, profile, onLogout, children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavbar user={user} onLogout={onLogout} />
      <div className="flex">
        <Sidebar user={user} profile={profile} />
        <main className="flex-1 p-6">
          <Topbar />
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
