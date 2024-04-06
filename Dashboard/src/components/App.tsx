import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import ProductsList from "./Products/ProductsList";

import { Routes, Route } from "react-router-dom";

import { NavItem, Product } from "../Types";
import SideBar from "./SideBar";
import CreateProduct from "./CreateProduct";

function App() {
  const [navItems, setNavItems] = useState<Array<NavItem>>([]);

  useEffect(() => {
    setAllProducts([
      {
        id: 1,
        name: "Gato Barato",
        altName: "Gato Barato",
        price: "15000",
        image: "",
      },
      {
        id: 1,
        name: "Gato Medio",
        altName: "Gato Medio",
        price: "20000",
        image: "",
      },
      {
        id: 1,
        name: "Gato Caro",
        altName: "Gato Caro",
        price: "25000",
        image: "",
      },
    ]);
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
            <Route
              path="/products"
              element={
              }
            />
            <Route path="/products/create" element={<CreateProduct />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
