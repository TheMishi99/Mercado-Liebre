import MercadoLiebreLogo from "../../assets/images/logo-mercado-liebre.svg";
import NavBar from "../NavBar";

const navBarItems = [
  { title: "Volver a la tienda", url: "/", condition: true },
  { title: "Home", url: "/dashboard", condition: true },
  { title: "Products", url: "/dashboard/products", condition: true },
  {
    title: "Create Product",
    url: "/dashboard/products/create",
    condition: true,
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
      <NavBar items={navBarItems} order="column" />
    </div>
  );
}
