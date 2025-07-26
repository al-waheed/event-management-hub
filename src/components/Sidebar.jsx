import { useState } from "react";
import { NavLink } from "react-router-dom";
import { handleLogout } from "../Auth/SIgnOut";
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

  return (
    <div>
      <button
        onClick={() => setToggle(!toggle)}
        className="md:hidden fixed top-6 right-4 z-50 text-white bg-primary p-2 rounded"
      >
        {toggle ? <FaRegWindowClose size={20} /> : <FaBars size={20} />}
      </button>
      <div
        className={`
          fixed top-0 left-0 h-full w-80 bg-primary text-white p-4 z-40
          transition-transform duration-300 ease-in-out
          ${toggle ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block
        `}
      >
        <div className="h-full flex flex-col cursor-pointer">
          <div className="pl-6 py-7">
            <Logo bg />
          </div>
          {sidebarLinks.map(({ path, label, icon }) => (
            <NavLink
              key={path}
              to={path}
              end
              onClick={() => setToggle(false)}
              className={({ isActive }) =>
                `flex items-center mb-1 mt-2 gap-3 pl-6 py-5 mx-2 font-semibold ${
                  isActive ? "bg-primary-hover rounded-md" : "hover:font-bold"
                }`
              }
            >
              <div className="text-2xl">{icon}</div>
              <p className="text-xl"> {label}</p>
            </NavLink>
          ))}
          <div className="mt-auto px-6 py-4 flex items-center text-primary font-semibold gap-3">
            <IoMdLogOut className="w-5 h-5 bg-background text-primary p-1 rounded" />
            <button
              onClick={handleLogout}
              className="text-sm text-background hover:underline"
            >
              LOGOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
