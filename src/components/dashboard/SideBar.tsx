import MercadoLiebreLogo from "../../assets/images/logo-mercado-liebre.svg";
import { NavbarItem } from "../../typings/frontend-types";
import Navbar from "../NavBar";

const navbarItems: NavbarItem[] = [
  { id: 1, condition: true, url: "/", title: "Volver a la tienda" },
  { id: 2, condition: true, url: "/dashboard", title: "Home" },
  { id: 3, condition: true, url: "/dashboard/products", title: "Products" },
  {
    id: 4,
    condition: true,
    url: "/dashboard/products/create",
    title: "Create Product",
  },
];

export default function SideBar() {
  return (
    <div
      id="side-bar"
      className="flex flex-col justify-start items-center p-2 gap-2 bg-yellow-300"
    >
      <div id="logo" className="w-full flex justify-center items-center p-4">
        <a href="/dashboard">
          <img src={MercadoLiebreLogo} alt="Logo" className="w-full" />
        </a>
      </div>
      <Navbar items={navbarItems} direction="col" />
    </div>
  );
}
