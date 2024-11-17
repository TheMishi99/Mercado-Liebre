import Footer from "../components/web/partials/Footer";
import Header from "../components/web/partials/Header";
import HomeBanner from "../assets/images/img-home-banner.jpg";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { NavBarItem } from "../typings/frontend-types";

const navBarItems: NavBarItem[] = [
  { title: "Home", url: "/", condition: true },
  { title: "Productos", url: "/products", condition: true },
  { title: "Usuarios", url: "/users", condition: true },
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
        <NavBar items={navBarItems} />
      </div>
      <Outlet />
      <Footer />
    </>
  );
}
