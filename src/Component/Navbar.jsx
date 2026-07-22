import React, { useState, useRef } from "react";
import { Link, NavLink } from "react-router";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "../Hooks/useAuth";
import Logo from "./Logo";
import { toast } from "react-toastify";
import {
  LayoutDashboard,
  LogIn,
  LogOut,
  UserPen,
  Briefcase,
  PlusCircle,
} from "lucide-react";
import { MdOutlineHome } from "react-icons/md";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef();

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logout successful"))
      .catch((err) => toast.error(err.message));
  };

  const activeLinks = (isActive) =>
    `px-3 py-2 text-sm font-medium flex items-center gap-1 transition-all duration-300 ${
      isActive
        ? "text-gray-800 text-xs bg-sky-500/70 rounded-lg"
        : "text-xs dark:text-gray-200 hover:bg-sky-500/70 hover:text-gray-800 rounded-lg"
    }`;

  const navLinks = (
    <>
      <NavLink to="/" className={({ isActive }) => activeLinks(isActive)}>
        <MdOutlineHome size={18} />
        Home
      </NavLink>

      <NavLink to="/addJob" className={({ isActive }) => activeLinks(isActive)}>
        <PlusCircle size={18} />
        Add Job
      </NavLink>

      {user && (
        <>
          <NavLink
            to="/myApplications"
            className={({ isActive }) => activeLinks(isActive)}
          >
            <Briefcase size={18} />
            My Applications
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 backdrop-blur bg-gradient-to-r from-sky-800/50 via-sky-900/50 to-sky-800/50 shadow-sm z-[999] max-w-6xl mx-auto py-1 md:mt-2 md:rounded-2xl">
      <div className="max-w-[1100px] lg:mx-auto py-4 flex justify-between items-center mx-2">
        {/* Logo */}
        <Logo />

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-3 items-center">{navLinks}</div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Avatar / Login */}
          <div
            className="relative hidden lg:inline-flex"
            ref={avatarRef}
            onClick={() => setAvatarOpen(false)}
          >
            {user ? (
              <>
                <img
                  onClick={(e) => {
                    e.stopPropagation();
                    setAvatarOpen(!avatarOpen);
                  }}
                  src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border-2 border-sky-500 cursor-pointer object-cover"
                />

                {avatarOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute -right-7 mt-15 w-52 bg-gradient-to-r from-sky-800/80 via-sky-900/80 to-sky-800/80 shadow-xl rounded-xl p-3 z-50"
                  >
                    <p className="font-semibold  text-white">
                      {user?.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-300 break-all">
                      {user?.email}
                    </p>

                    <hr className="my-2" />

                    <Link
                      to="/profile"
                      className="flex gap-1 items-center px-3 py-2 rounded hover:bg-sky-500/30 text-sm"
                    >
                      <UserPen size={18} />
                      Profile
                    </Link>

                    <Link
                      to="/dashboard"
                      className="flex gap-1 items-center px-3 py-2 rounded hover:bg-sky-500/30 text-sm"
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex gap-1 items-center text-left px-3 py-2 rounded font-semibold hover:bg-sky-500/30  text-sm cursor-pointer"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="btn btn-sm btn-outline text-green-500 hover:bg-green-500 shadow-none hover:border-green-500 hover:text-gray-800 rounded-lg"
              >
                <LogIn size={16} />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gradient-to-r from-sky-800 via-sky-900 to-sky-800 shadow-xl border-t z-50">
          <div className="flex flex-col p-4 space-y-3">
            {navLinks}

            <div className="border-t pt-3 space-y-2">
              {user && (
                <Link
                  to="/dashboard"
                  className="btn btn-sm btn-warning w-full rounded-lg"
                >
                  Dashboard
                </Link>
              )}

              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="btn btn-sm bg-red-500 text-white w-full rounded-lg"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="btn btn-sm w-full rounded-lg bg-accent text-gray-800"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
