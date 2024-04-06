import { useEffect, useState } from "react";
import ProductsList from "./ProductsList";
import { Product } from "../../Types";

const Products = () => {
  const [allProducts, setAllProducts] = useState<Array<Product>>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await fetch("http://localhost:5678/api/products").then(
        (response) => response.json()
      );
      setAllProducts(products);
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full h-[80%] flex justify-center items-center">
      <ProductsList title="All Products" products={allProducts} />
    </div>
  );
};

export default Products;
