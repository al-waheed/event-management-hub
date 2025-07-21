import { NavLink } from "react-router-dom";
import { handleLogout } from "../Auth/SIgnOut";
import Logo from "./Logo";
import {
  MdOutlineDashboardCustomize,
  MdEvent,
  MdOutlineEventNote,
} from "react-icons/md";
import { RiPhoneFindLine } from "react-icons/ri";
import { ImProfile } from "react-icons/im";
import { IoMdLogOut } from "react-icons/io";

const sidebarLinks = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: <MdOutlineDashboardCustomize />,
  },
  { path: "/dashboard/my-events", label: "My Events", icon: <MdEvent /> },
  {
    path: "/dashboard/find-events",
    label: "Find Events",
    icon: <RiPhoneFindLine />,
  },
  {
    path: "/dashboard/create-event",
    label: "Create Event",
    icon: <MdOutlineEventNote />,
  },
  { path: "/dashboard/profile", label: "Profile", icon: <ImProfile /> },
];

const Sidebar = () => (
  <div className="h-full bg-primary-700 text-white flex flex-col w-72">
    <div className="pl-6 py-7">
      <Logo />
    </div>
    {sidebarLinks.map(({ path, label, icon }) => (
      <NavLink
        to={path}
        end
        className={({ isActive }) =>
          `flex items-center mb-1 mt-2 gap-3 pl-6 py-5 ${
            isActive ? "bg-primary-600 font-bold mx-3 shadow-md rounded-xl" : ""
          }`
        }
      >
        <div className="text-2xl">{icon}</div>
        <p className="text-base"> {label}</p>
      </NavLink>
    ))}
    <div className="mt-auto px-6 py-4 flex items-center text-primary-600 font-semibold gap-3">
      <IoMdLogOut className="w-8 h-8 rounded-lg bg-primary-600 text-white" />
      <button onClick={() => handleLogout()} className="text-xl text-gray-900 hover:font-bold">
        LogOut
      </button>
    </div>
  </div>
);

export default Sidebar;
