import { useState } from "react";
import MercadoLiebreLogo from "../../../assets/images/logo-mercado-liebre.svg";
import {
  BarsIcon,
  HandHoldingDollarIcon,
  SearchIcon,
} from "../../../utils/Icons";
import { NavBarItem } from "../../../typings/frontend-types";
import { useUserContext } from "../../../contexts/UserContext";
import NavBar from "../../NavBar";

export default function Header() {
  const [showNavBar, setShowNavBar] = useState<boolean>(true);
  const { user } = useUserContext();

  const navBarItems: NavBarItem[] = [
    { title: "Ofertas", url: "/#ofertas", condition: true },
    {
      title: "Tiendas Oficiales",
      url: "https://www.mercadolibre.com.ar",
      condition: true,
    },
    { title: "Vender", url: "#", condition: true },
    { title: "Ayuda", url: "/about", condition: true },
  ];

  const navBarItems2: NavBarItem[] = [
    { title: "Mi Perfil", url: "/users/profile", condition: user !== null },
    { title: "Cerrar Sesión", url: "/users/logout", condition: user !== null },
    { title: "Ingresá", url: "/users/login", condition: user === null },
    {
      title: "Crea tu cuenta",
      url: "/users/register",
      condition: user === null,
    },
    { title: "Mis Compras", url: "/products/cart", condition: true },
  ];

  const handleSearchFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <header
      id="header"
      className="w-full flex flex-wrap justify-between items-center p-2 gap-2"
      style={{ backgroundColor: "#EAC926" }}
    >
      <a
        href="/"
        className="w-full sm:w-[39%] md:w-[32%] flex justify-center items-center p-2 gap-2"
      >
        <img
          src={MercadoLiebreLogo}
          alt="Logo de MercadoLiebre"
          className="w-[60%] sm:w-[70%]"
        />
      </a>
      <form
        className="w-full sm:w-[59%] md:w-[32%] flex justify-center items-center p-2 gap-2"
        onSubmit={handleSearchFormSubmit}
      >
        <input
          type="search"
          name="keywords"
          id="keywords"
          placeholder="Buscar productos, marcas..."
          autoComplete="off"
          autoCapitalize="off"
          className="w-full p-2 bg-white rounded-xl"
        />
        <button type="submit" className="p-3 rounded-xl bg-yellow-500">
          <SearchIcon />
        </button>
      </form>
      <div className="w-full md:w-[32%] flex justify-center items-center p-2 gap-2">
        <HandHoldingDollarIcon />
        <p className="flex text-center">
          Comprá en cuotas y sin tarjeta de crédito
        </p>
      </div>
      <div className="w-full flex justify-center items-center">
        <button
          className="lg:hidden cursor-pointer p-2 bg-blue-500 rounded-xl"
          onClick={() => setShowNavBar(!showNavBar)}
        >
          <BarsIcon className="text-2xl" />
        </button>
      </div>
      {showNavBar && (
        <div className="w-full flex flex-col md:flex-row justify-center items-center p-2 gap-2">
          <NavBar items={navBarItems} />
          <NavBar items={navBarItems2} />
        </div>
      )}
    </header>
  );
}
