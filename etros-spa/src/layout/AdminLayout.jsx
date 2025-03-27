import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";

const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const isActive = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarCollapsed ? "w-20" : "w-64"
        } bg-gray-900 text-white transition-all duration-300 ease-in-out h-screen fixed left-0 top-0 z-40`}
      >
        {/* Admin Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!isSidebarCollapsed && (
            <div className="flex items-center">
              <img
                src="/etros-150x150.png"
                alt="Etros Logo"
                className="h-8 w-8 mr-2"
              />
              <span className="font-bold text-xl text-yellow-400">ADMIN</span>
            </div>
          )}
          {isSidebarCollapsed && (
            <img
              src="/etros-150x150.png"
              alt="Etros Logo"
              className="h-8 w-8 mx-auto"
            />
          )}
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              {isSidebarCollapsed ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-6">
          <div className="px-4">
            <Link
              to="/admin/news"
              className={`${
                isActive("/admin/news")
                  ? "bg-gray-800 text-yellow-400"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              } flex items-center py-3 px-3 rounded-lg mb-2 transition-colors`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                />
              </svg>
              {!isSidebarCollapsed && (
                <span className="ml-3">News Management</span>
              )}
            </Link>

            <Link
              to="/admin/matches"
              className={`${
                isActive("/admin/matches")
                  ? "bg-gray-800 text-yellow-400"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              } flex items-center py-3 px-3 rounded-lg mb-2 transition-colors`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                />
              </svg>
              {!isSidebarCollapsed && <span className="ml-3">Matches</span>}
            </Link>

            <Link
              to="/admin/players"
              className={`${
                isActive("/admin/players")
                  ? "bg-gray-800 text-yellow-400"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              } flex items-center py-3 px-3 rounded-lg mb-2 transition-colors`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
              {!isSidebarCollapsed && <span className="ml-3">Players</span>}
            </Link>

            <Link
              to="/admin/player-statistics"
              className={`${
                isActive("/admin/player-statistics")
                  ? "bg-gray-800 text-yellow-400"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              } flex items-center py-3 px-3 rounded-lg mb-2 transition-colors`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                />
              </svg>
              {!isSidebarCollapsed && (
                <span className="ml-3">Player Stats</span>
              )}
            </Link>
          </div>
        </nav>

        {/* Logout Section */}
        <div className="absolute bottom-0 w-full border-t border-gray-700 p-4">
          <Link
            to="/"
            className="flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            {!isSidebarCollapsed && <span className="ml-3">Exit Admin</span>}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 ${
          isSidebarCollapsed ? "ml-20" : "ml-64"
        } transition-all duration-300 ease-in-out`}
      >
        {/* Top Header */}
        <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Admin Panel</h1>
          <div className="flex items-center">
            <div className="relative">
              <span className="text-sm text-gray-600 mr-2">Admin User</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
