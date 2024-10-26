import { useEffect, useState } from "react";
import ProductsList from "./ProductsList";
import { Product } from "../../../../app/src/Types";

const Products = () => {
  const [allProducts, setAllProducts] = useState<Array<Product>>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await fetch("http://localhost:5678/api/products").then(
        (response) => response.json()
      );
      setAllProducts(products.data);
    };
    fetchProducts();
  }, []);

  return (
    <div
      id="products"
      className="w-full h-[78%] flex flex-wrap justify-center items-start bg-zinc-200 p-2 gap-3 rounded-xl overflow-auto"
    >
      <ProductsList title="All Products" products={allProducts} />
    </div>
  );
};

export default Products;
