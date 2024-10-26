import React, { useEffect, useState } from "react";

import SideBar from "./SideBar";
import Header from "./Partials/Header";
import Footer from "./Partials/Footer";

import { Routes, Route } from "react-router-dom";

import { NavItem } from "../../../app/src/Types";
import Home from "./Home";
import Products from "./Products/Products";
import CreateProduct from "./Products/CreateProduct";

function App() {
  const [navItems, setNavItems] = useState<Array<NavItem>>([]);

  useEffect(() => {
    setNavItems([
      { title: "Home", url: "/" },
      { title: "Products", url: "/products" },
      { title: "Create Product", url: "/products/create" },
    ]);
  }, []);

  return (
    <React.Fragment>
      <div
        id="app"
        className="w-full flex flex-row justify-center items-center p-2 gap-2"
      >
        <SideBar navItems={navItems} />
        <div
          id="main"
          className="w-[85%] h-[98vh] flex flex-col justify-center items-center rounded-xl gap-2"
        >
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/create" element={<CreateProduct />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
