import ProductsList from "../../components/web/products/ProductsList";
import Loader from "../../components/Loader";
import { useProducts } from "../../contexts/ProductsContext";

export default function HomePage() {
  const { isLoading, isError, products } = useProducts();

  return (
    <div
      id="home"
      className="w-full flex flex-wrap justify-center items-start bg-zinc-200 p-2 gap-2"
    >
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p>{isError}</p>
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
