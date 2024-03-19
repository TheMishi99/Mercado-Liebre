import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import ProductsList from "./ProductsList";

import { Routes, Route } from "react-router-dom";

import { Product } from "../Types";

function App() {
  const [allProducts, setAllProducts] = useState<Array<Product>>([]);

  useEffect(() => {
    setAllProducts([
      { name: "Gato Barato", price: 15000 },
      { name: "Gato Medio", price: 20000 },
      { name: "Gato Caro", price: 25000 },
    ]);
  }, []);

  return (
    <React.Fragment>
      <div
        id="app"
        className="w-full flex flex-col justify-center items-center"
      >
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products"
            element={
              <ProductsList title="All Products" products={allProducts} />
            }
          />
        </Routes>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default App;
