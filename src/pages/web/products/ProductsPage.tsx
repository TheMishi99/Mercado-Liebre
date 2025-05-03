import { Outlet } from "react-router-dom";
import Navbar from "../../../components/NavBar";
import { NavbarItem } from "../../../typings/frontend-types";

const navbarItems: NavbarItem[] = [
  {
    id: 1,
    condition: true,
    url: "/products/create",
    title: "Crear un Producto",
  },
];

export default function ProductsPage() {
  return (
    <div
      id="products"
      className="w-full flex flex-col justify-center items-start bg-zinc-200 p-2 gap-2 rounded-xl"
    >
      <Navbar items={navbarItems} />
      <Outlet />
    </div>
  );
}
