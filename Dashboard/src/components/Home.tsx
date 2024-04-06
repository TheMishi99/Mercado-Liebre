import { useEffect, useState } from "react";
import ProductsList from "./Products/ProductsList";

import { type Product } from "../Types";

const Home = () => {
  const [recentProducts, setRecentProducts] = useState<Array<Product>>([]);
  const [onOfferProducts, setOnOfferProducts] = useState<Array<Product>>([]);

  useEffect(() => {
    setRecentProducts([
      {
        id: 1,
        name: "Cafetera Moulinex",
        altName: "Cafetera",
        price: "6.770",
        image: "/images/products/img-cafetera-moulinex.jpg",
      },
      {
        id: 2,
        name: "MacBook Pro 2019",
        altName: "MacBook",
        price: "230.000",
        image: "/images/products/img-macbook-pro-2019.jpg",
      },
      {
        id: 3,
        name: "Samsung Galaxy S10",
        altName: "Samsung S10",
        price: "70.500",
        image: "/images/products/img-samsung-galaxy-s10.jpg",
      },
      {
        id: 4,
        name: "SmartTv Samsung 43",
        altName: "SmartTv 43",
        price: "23.200",
        image: "/images/products/img-tv-samsung-smart.jpg",
      },
    ]);
    setOnOfferProducts([
      {
        id: 1,
        name: "Cafetera Moulinex",
        altName: "Cafetera",
        price: "6.770",
        image: "/images/products/img-cafetera-moulinex.jpg",
      },
      {
        id: 2,
        name: "MacBook Pro 2019",
        altName: "MacBook",
        price: "230.000",
        image: "/images/products/img-macbook-pro-2019.jpg",
      },
      {
        id: 3,
        name: "Samsung Galaxy S10",
        altName: "Samsung S10",
        price: "70.500",
        image: "/images/products/img-samsung-galaxy-s10.jpg",
      },
      {
        id: 4,
        name: "SmartTv Samsung 43",
        altName: "SmartTv 43",
        price: "23.200",
        image: "/images/products/img-tv-samsung-smart.jpg",
      },
    ]);
  }, []);

  return (
    <div
      id="home"
      className="w-full h-[80%] flex flex-col justify-center items-center bg-zinc-200 p-2 gap-3 overflow-auto"
    >
      <ProductsList title="Recent Products" products={recentProducts} />
      <ProductsList title="On Offer Products" products={recentProducts} />
    </div>
  );
};

export default Home;