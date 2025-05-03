import { useState } from "react";
import MercadoLiebreLogo from "../../../assets/images/logo-mercado-liebre.svg";
import { BarsIcon, HandHoldingDollarIcon } from "../../../utils/Icons";
import { NavbarItem } from "../../../typings/frontend-types";
import Navbar from "../../NavBar";
import SearchBar from "./SearchBar";
import { useAuth } from "../../../contexts/AuthContext";

export default function Header() {
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
  const { userLogged } = useAuth();

  const navbarItems: NavbarItem[] = [
    { id: 1, title: "Ofertas", url: "/#ofertas", condition: true },
    {
      id: 2,
      title: "Tiendas Oficiales",
      url: "https://www.mercadolibre.com.ar",
      condition: true,
    },
    { id: 3, title: "Vender", url: "#", condition: true },
    { id: 4, title: "Ayuda", url: "/about", condition: true },
    {
      id: 5,
      condition: userLogged !== null,
      url: "/users/profile",
      title: "Mi Perfil",
    },
    {
      id: 6,
      condition: userLogged !== null,
      title: "Cerrar Sesión",
      url: "/users/logout",
    },
    {
      id: 7,
      condition: userLogged === null,
      url: "/users/login",
      title: "Ingresá",
    },
    {
      id: 8,
      condition: userLogged === null,
      title: "Crea tu cuenta",
      url: "/users/register",
    },
    {
      id: 9,
      condition: userLogged === null,
      url: "/products/cart",
      title: "Mis Compras",
    },
  ];

  return (
    <header
      id="header"
      className="w-full flex flex-col file:justify-center items-center p-2 gap-2"
      style={{ backgroundColor: "#EAC926" }}
    >
      <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-between items-center p-2 gap-2">
        <a href="/" className="flex justify-center items-center">
          <img
            src={MercadoLiebreLogo}
            alt="Logo de MercadoLiebre"
            className="w-52 aspect-video"
          />
        </a>
        <SearchBar />
        <div className="flex justify-center items-center p-2 gap-2">
          <HandHoldingDollarIcon />
          <p className="flex text-center">
            Comprá en cuotas y sin tarjeta de crédito
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center p-2 gap-2">
        <button
          type="button"
          className="sm:hidden cursor-pointer p-2 bg-blue-500 rounded-xl"
          onClick={() => setShowNavbar((prevShowNavbar) => !prevShowNavbar)}
        >
          <BarsIcon className="text-2xl" />
        </button>
        {showNavbar && (
          <div className="w-full flex sm:hidden justify-center items-center">
            <Navbar items={navbarItems} direction="col" />
          </div>
        )}
        <div className="hidden sm:flex">
          <Navbar items={navbarItems} />
        </div>
      </div>
    </header>
  );
}
