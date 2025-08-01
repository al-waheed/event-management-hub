import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => (
  <div className="flex h-screen">
    <Sidebar />
    <div className="flex-1 p-12 bg-background overflow-auto">
      <Outlet />
    </div>
  </div>
);

export default DashboardLayout;
