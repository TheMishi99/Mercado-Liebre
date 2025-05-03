import Footer from "../components/web/partials/Footer";
import Header from "../components/web/partials/Header";
import HomeBanner from "../assets/images/img-home-banner.jpg";
import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import { NavbarItem } from "../typings/frontend-types";

const navbarItems: NavbarItem[] = [
  {
    id: 1,
    condition: true,
    url: "/",
    title: "Home",
  },
  {
    id: 2,
    condition: true,
    url: "/products",
    title: "Productos",
  },
  {
    id: 3,
    condition: true,
    url: "/users",
    title: "Usuarios",
  },
];

export default function Web() {
  return (
    <>
      <Header />
      <section id="banners" className="w-full flex justify-center items-center">
        <img src={HomeBanner} alt="Banner de ofertas" />
      </section>
      <div
        id="main-nav-bar"
        className="w-full flex justify-center itmes-center p-2"
      >
        <Navbar items={navbarItems} />
      </div>
      <Outlet />
      <Footer />
    </>
  );
}
