import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/80 border-b border-[#cce8ec] shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* ---------- Logo ---------- */}
        <Link to="/" className="flex items-center gap-1 group transition-all">
          <span className="text-2xl font-extrabold text-[#01869E] group-hover:text-[#026877] transition-all duration-200 tracking-tight">
            Recipe
          </span>
          <span className="text-2xl font-extrabold text-[#ff6b9d] group-hover:text-[#e45c8a] transition-all duration-200 tracking-tight">
            Nest
          </span>
          <span className="text-2xl font-extrabold text-black drop-shadow-sm">
            🍳
          </span>
        </Link>

        {/* ---------- Desktop Links ---------- */}
        <div className="hidden md:flex items-center gap-6 font-semibold text-black">
          <Link
            to="/"
            className="hover:text-[#01869E] transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/explore"
            className="hover:text-[#ff6b9d] transition-colors duration-200"
          >
            Explore
          </Link>
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="hover:text-[#01869E] transition-colors duration-200"
            >
              Admin
            </Link>
          )}
          {user && (
            <Link
              to="/profile"
              className="hover:text-[#ff6b9d] transition-colors duration-200"
            >
              Profile
            </Link>
          )}

          {!user ? (
            <Link
              to="/login"
              className="bg-[#01869E] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#026877] transition-all duration-200"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#e7f8f9] rounded-full px-3 py-1 shadow-inner">
                <img
                  src={`https://ui-avatars.com/api/?name=${user.name}&background=01869E&color=fff`}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-black">
                  {user.name.split(" ")[0]}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-[#ff7b9d] text-white px-4 py-1.5 rounded-lg hover:bg-[#e45c8a] transition-all duration-200 shadow-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* ---------- Mobile Menu Button ---------- */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-black focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-7 h-7 transition-transform duration-300 ${
              menuOpen ? "rotate-90 text-[#ff6b9d]" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 16h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* ---------- Mobile Menu Dropdown ---------- */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 border-t border-[#b6e4e9] shadow-lg animate-fadeIn">
          <div className="flex flex-col items-center py-4 gap-3 text-black font-semibold">
            <Link
              to="/"
              onClick={toggleMenu}
              className="hover:text-[#01869E] transition"
            >
              Home
            </Link>
            <Link
              to="/explore"
              onClick={toggleMenu}
              className="hover:text-[#ff6b9d] transition"
            >
              Explore
            </Link>
            {user?.role === "admin" && (
              <Link
                to="/admin"
                onClick={toggleMenu}
                className="hover:text-[#01869E] transition"
              >
                Admin
              </Link>
            )}
            {user && (
              <Link
                to="/profile"
                onClick={toggleMenu}
                className="hover:text-[#ff6b9d] transition"
              >
                Profile
              </Link>
            )}

            {!user ? (
              <Link
                to="/login"
                onClick={toggleMenu}
                className="bg-[#01869E] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#026877] transition-all duration-200"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="bg-[#ff7b9d] text-white px-5 py-2 rounded-lg hover:bg-[#e45c8a] transition-all duration-200 shadow-sm"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
