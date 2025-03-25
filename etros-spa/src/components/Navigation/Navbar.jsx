import { useState } from "react";
import { Link, useLocation } from "react-router";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to check if the current path matches the link
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Main Navigation */}
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

          {/* Auth Buttons */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Link
                to="/admin"
                className="text-white hover:text-yellow-400 px-4 py-2 text-sm font-medium transition-colors duration-200"
              >
                Admin
              </Link>
              <Link
                to="/login"
                className="text-white hover:text-yellow-400 px-4 py-2 text-sm font-medium transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded text-sm font-medium ml-3 transition-colors duration-200"
              >
                Register
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded text-gray-200 hover:text-yellow-400 focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (hidden by default) */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-800">
          <Link
            to="/"
            className={`${
              isActive("/")
                ? "text-yellow-400"
                : "text-white hover:text-yellow-400"
            } block px-3 py-2 text-base font-medium`}
          >
            Home
          </Link>
          <Link
            to="/team"
            className={`${
              isActive("/team")
                ? "text-yellow-400"
                : "text-white hover:text-yellow-400"
            } block px-3 py-2 text-base font-medium`}
          >
            Team
          </Link>
          <Link
            to="/schedule"
            className={`${
              isActive("/schedule")
                ? "text-yellow-400"
                : "text-white hover:text-yellow-400"
            } block px-3 py-2 text-base font-medium`}
          >
            Schedule
          </Link>
          <Link
            to="/news"
            className={`${
              isActive("/news")
                ? "text-yellow-400"
                : "text-white hover:text-yellow-400"
            } block px-3 py-2 text-base font-medium`}
          >
            News
          </Link>
          <Link
            to="/about"
            className={`${
              isActive("/about")
                ? "text-yellow-400"
                : "text-white hover:text-yellow-400"
            } block px-3 py-2 text-base font-medium`}
          >
            About
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-800">
          <div className="px-2 space-y-1">
            <Link
              to="/admin"
              className="block px-3 py-2 text-base font-medium text-white hover:text-yellow-400"
            >
              Admin
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 text-base font-medium text-white hover:text-yellow-400"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block px-3 py-2 my-2 text-base font-medium bg-yellow-500 hover:bg-yellow-400 text-black rounded"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
