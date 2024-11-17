import { Outlet } from "react-router-dom";
import NavBar from "../../../components/NavBar";
import { NavBarItem } from "../../../typings/frontend-types";

const navBarItems: NavBarItem[] = [];
export default function UsersPage() {
  return (
    <div
      id="users"
      className="w-full flex flex-col justify-center items-start bg-zinc-200 p-2 gap-2 rounded-xl"
    >
      <NavBar items={navBarItems} />
      <Outlet />
    </div>
  );
}
