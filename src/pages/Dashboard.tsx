import { Outlet } from "react-router-dom";
import SideBar from "../components/dashboard/SideBar";
export default function Dashboard() {
  return (
    <div id="dashboard" className="w-full h-dvh grid grid-cols-[1fr_3fr]">
      <SideBar />
      <Outlet />
    </div>
  );
}
