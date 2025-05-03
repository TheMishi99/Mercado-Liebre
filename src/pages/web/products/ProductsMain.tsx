import Loader from "../../../components/Loader";
import ProductsList from "../../../components/web/products/ProductsList";
import { useProducts } from "../../../contexts/ProductsContext";

export default function ProductsMain() {
  const { isLoading: productsLoading, isError: productsError, products } = useProducts();
  return (
    <div
      id="products-main"
      className="w-full flex flex-col justify-center items-center p-2 gap-2"
    >
      {productsLoading ? (
        <Loader />
      ) : productsError ? (
        <p>{productsError}</p>
      ) : (
        <>
          <h2 className="w-full flex text-start font-bold text-2xl">
            Todos los productos
          </h2>
          <ProductsList products={products} />
        </>
      )}
    </div>
  );
}
