import { Link } from "react-router-dom";
import mercadoLiebreLogo from "../assets/images/logo-mercado-liebre.svg";
import { useRef } from "react";

const Header = () => {
  const burgerMenu = useRef<HTMLButtonElement>();

  const handleBurgerButton = () => {
    if (burgerMenu.current != undefined) {
      if (burgerMenu.current.classList.contains("flex")) {
        burgerMenu.current.classList.remove("flex");
        burgerMenu.current.classList.add("hidden");
      } else {
        burgerMenu.current.classList.remove("hidden");
        burgerMenu.current.classList.add("flex");
      }
    }
  };
  return (
    <div
      id="header"
      className="w-full flex flex-col flex-wrap justify-center items-center bg-yellow-400 gap-4 p-2 sm:flex-row"
    >
      <div id="logo" className="w-full max-w-[426px] flex flex-row sm:w-[38%]">
        <a href="/" className="w-full">
          <img src={mercadoLiebreLogo} alt="logo" className="w-full" />
        </a>
      </div>
      <div
        id="burger"
        className="w-full flex flex-col justify-center items-center gap-4 sm:hidden"
      >
        <button id="burger-button" onClick={handleBurgerButton}>
          <i className="fa fa-bars w-[50px] aspect-square rounded-xl bg-blue-700 flex justify-center items-center text-4xl"></i>
        </button>
        <nav
          id="burger-menu"
          ref={burgerMenu}
          className="w-full hidden justify-center items-center"
        >
          <ul className="w-full flex flex-col justify-center items-center gap-4">
            <li className="w-full flex flex-wrap justify-center items-center bg-yellow-500">
              <Link
                to="/"
                className="w-full flex justify-center items-center p-2"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="w-full flex justify-center items-center p-2  border-t-2 border-yellow-600"
              >
                Products
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div
        id="navbar"
        className="w-full hidden justify-center items-center sm:flex sm:w-[58%]"
      >
        <nav className="w-full flex flex-col justify-center items-center">
          <ul className="w-full flex flex-row justify-center items-center gap-4">
            <li>
              <Link
                to="/"
                className="p-2 rounded-xl bg-yellow-500 hover:bg-yellow-600  transition-all duration-500"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="p-2 rounded-xl bg-yellow-500 hover:bg-yellow-600  transition-all duration-500"
              >
                Products
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
