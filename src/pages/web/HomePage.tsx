import ProductsList from "../../components/web/products/ProductsList";
import Loader from "../../components/Loader";
import { useProductsContext } from "../../contexts/ProductsContext";

export default function HomePage() {
  const { productsLoading, productsError, products } = useProductsContext();

  return (
    <div
      id="home"
      className="w-full flex flex-wrap justify-center items-start bg-zinc-200 p-2 gap-2"
    >
      {productsLoading ? (
        <Loader />
      ) : productsError ? (
        <p>{productsError}</p>
      ) : (
        <>
          <h2 className="w-full flex text-start font-bold text-2xl">
            Produtos Recientes
          </h2>
          <ProductsList products={products} />
        </>
      )}
    </div>
  );
}
