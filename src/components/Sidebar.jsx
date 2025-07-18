import { NavLink } from "react-router-dom";

const sidebarLinks = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/dashboard/my-events", label: "My Events" },
  { path: "/dashboard/find-events", label: "Find Events" },
  { path: "/dashboard/create-event", label: "Create Event" },
  { path: "/dashboard/profile", label: "Profile" },
];

const Sidebar = () => (
  <div className="w-64 h-full bg-primary-600 text-white flex flex-col p-4">
    {sidebarLinks.map(({ path, label }) => (
      <NavLink
        to={path}
        end
        className={({ isActive }) => (isActive ? "mb-4 font-bold" : "mb-4")}
      >
        {label}
      </NavLink>
    ))}
  </div>
);

export default Sidebar;
