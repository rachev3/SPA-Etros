import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useUser from "../../hooks/useUser";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img
                src="/etros-150x150.png"
                alt="Etros Logo"
                className="h-12 w-12 mr-3"
              />
              <Link
                to="/"
                className="text-yellow-400 font-bold text-2xl tracking-tight"
              >
                ETROS
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-12 flex items-baseline space-x-6">
                <Link
                  to="/"
                  className={`${
                    isActive("/")
                      ? "text-yellow-400 border-b-2 border-yellow-400"
                      : "text-white hover:text-yellow-400 transition-colors duration-200"
                  } px-2 py-1 text-sm font-medium`}
                >
                  Home
                </Link>
                <Link
                  to="/team"
                  className={`${
                    isActive("/team")
                      ? "text-yellow-400 border-b-2 border-yellow-400"
                      : "text-white hover:text-yellow-400 transition-colors duration-200"
                  } px-2 py-1 text-sm font-medium`}
                >
                  Team
                </Link>
                <Link
                  to="/schedule"
                  className={`${
                    isActive("/schedule")
                      ? "text-yellow-400 border-b-2 border-yellow-400"
                      : "text-white hover:text-yellow-400 transition-colors duration-200"
                  } px-2 py-1 text-sm font-medium`}
                >
                  Schedule
                </Link>
                <Link
                  to="/news"
                  className={`${
                    isActive("/news")
                      ? "text-yellow-400 border-b-2 border-yellow-400"
                      : "text-white hover:text-yellow-400 transition-colors duration-200"
                  } px-2 py-1 text-sm font-medium`}
                >
                  News
                </Link>
                <Link
                  to="/about"
                  className={`${
                    isActive("/about")
                      ? "text-yellow-400 border-b-2 border-yellow-400"
                      : "text-white hover:text-yellow-400 transition-colors duration-200"
                  } px-2 py-1 text-sm font-medium`}
                >
                  About
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              {isAuthenticated ? (
                <>
                  <span className="text-white text-sm">
                    Welcome, {user?.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-white hover:text-yellow-400 px-4 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Register
                  </Link>
                </>
              )}
              {isAuthenticated && user && user.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-white hover:text-yellow-400 px-4 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Admin
                </Link>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-400 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className={`${
              isActive("/")
                ? "text-yellow-400"
                : "text-white hover:text-yellow-400"
            } block px-3 py-2 rounded-md text-base font-medium`}
          >
            Home
          </Link>
          <Link
            to="/team"
            className={`${
              isActive("/team")
                ? "text-yellow-400"
                : "text-white hover:text-yellow-400"
            } block px-3 py-2 rounded-md text-base font-medium`}
          >
            Team
          </Link>
          <Link
            to="/schedule"
            className={`${
              isActive("/schedule")
                ? "text-yellow-400"
                : "text-white hover:text-yellow-400"
            } block px-3 py-2 rounded-md text-base font-medium`}
          >
            Schedule
          </Link>
          <Link
            to="/news"
            className={`${
              isActive("/news")
                ? "text-yellow-400"
                : "text-white hover:text-yellow-400"
            } block px-3 py-2 rounded-md text-base font-medium`}
          >
            News
          </Link>
          <Link
            to="/about"
            className={`${
              isActive("/about")
                ? "text-yellow-400"
                : "text-white hover:text-yellow-400"
            } block px-3 py-2 rounded-md text-base font-medium`}
          >
            About
          </Link>
          {isAuthenticated ? (
            <>
              <div className="px-3 py-2 text-white text-sm">
                Welcome, {user?.username}
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-base font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-yellow-400 hover:bg-yellow-500 text-black block px-3 py-2 rounded-md text-base font-medium"
              >
                Register
              </Link>
            </>
          )}
          {isAuthenticated && user && user.role === "admin" && (
            <Link
              to="/admin"
              className="text-white hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium"
            >
              Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
