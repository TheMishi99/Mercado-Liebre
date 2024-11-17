import { useMemo } from "react";
import ProductsList from "../../../components/web/products/ProductsList";
import { useProductsContext } from "../../../contexts/ProductsContext";
import Loader from "../../../components/Loader";

export default function SearchProducts() {
  const { productsLoading, productsError, products } = useProductsContext();
  const results = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes("a".toLowerCase())
      ),
    [products]
  );

  return (
    <div
      id="products-search"
      className="w-full flex flex-col justify-center items-center p-2 gap-2"
    >
      <div
        id="products-search-form-container"
        className="w-full max-w-[500px] flex justify-center items-center p-2 gap-2"
      >
        <form className="w-full flex justify-center items-center p-2 gap-2">
          <div className="input-group w-full flex flex-col justify-center items-center p-2 gap-2">
            <label htmlFor="term" className="w-full text-start">
              Buscar
            </label>
            <input
              type="text"
              name="term"
              id="term"
              placeholder="Buscar por nombre o descripción..."
              className="w-full p-2 bg-white rounded-xl"
            />
            <button type="submit" className="p-2 bg-blue-400 rounded-xl">
              Buscar
            </button>
          </div>
        </form>
      </div>
      {productsLoading ? (
        <Loader />
      ) : productsError ? (
        <p>{productsError}</p>
      ) : results.length === 0 ? (
        <p className="w-full flex justify-center items-center p-2 gap-2">
          No se encontraron resultados
        </p>
      ) : (
        <ProductsList products={results} />
      )}
    </div>
  );
}
