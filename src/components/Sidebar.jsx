import { useState } from "react";
import { NavLink } from "react-router-dom";
import { handleLogout } from "../Auth/SignOut";
import { useUserData } from "../queries/DataQueries";
import Logo from "./Logo";
import {
  MdOutlineDashboardCustomize,
  MdEvent,
  MdOutlineEventNote,
} from "react-icons/md";
import { FaBars, FaRegWindowClose } from "react-icons/fa";
import { RiPhoneFindLine } from "react-icons/ri";
import { ImProfile } from "react-icons/im";
import { IoMdLogOut } from "react-icons/io";

const sidebarLinks = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: <MdOutlineDashboardCustomize />,
  },
  {
    path: "/dashboard/create-event",
    label: "Create Event",
    icon: <MdOutlineEventNote />,
  },
  { path: "/dashboard/my-events", label: "My Events", icon: <MdEvent /> },
  {
    path: "/dashboard/find-events",
    label: "Find Events",
    icon: <RiPhoneFindLine />,
  },
  { path: "/dashboard/profile", label: "Profile", icon: <ImProfile /> },
];

const Sidebar = () => {
  const [toggle, setToggle] = useState(false);
  const { data: userData } = useUserData();

  return (
    <div>
      <button
        onClick={() => setToggle(!toggle)}
        className="md:hidden fixed top-6 right-4 z-50 text-white bg-primary p-2.5 rounded-lg shadow-lg"
      >
        {toggle ? <FaRegWindowClose size={20} /> : <FaBars size={20} />}
      </button>

      {toggle && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 z-30"
          onClick={() => setToggle(false)}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 h-full w-80 bg-primary text-white z-40
          transition-transform duration-300 ease-in-out
          ${toggle ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block
        `}
      >
        <div className="h-full flex flex-col">
          <div className="pl-6 py-7">
            <Logo bg />
          </div>

          <div className="pl-8 mb-2 text-[11px] font-semibold uppercase tracking-widest text-white/40">
            Menu
          </div>

          <nav className="flex-1 px-3 space-y-1">
            {sidebarLinks.map(({ path, label, icon }) => (
              <NavLink
                key={path}
                to={path}
                end
                onClick={() => setToggle(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 pl-5 py-4 mx-1 font-semibold rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-white/15 text-white shadow-sm"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <div className="text-2xl">{icon}</div>
                <p className="text-xl">{label}</p>
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto border-t border-white/10 mx-4 pt-4 pb-5">
            <div className="flex items-center gap-3 px-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold flex-shrink-0">
                {userData?.fullname?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="min-w-0">
                <p className="text-base font-semibold truncate">
                  {userData?.fullname || "User"}
                </p>
                <p className="text-xs text-white/40 truncate">
                  {userData?.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition"
            >
              <IoMdLogOut className="text-xl" />
              <span className="text-base font-semibold">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
