import Loader from "../../../components/Loader";
import ProductsList from "../../../components/web/products/ProductsList";
import { useProductsContext } from "../../../contexts/ProductsContext";

export default function DashboardProductsPage() {
  const { productsLoading, productsError, products } = useProductsContext();
  return (
    <div
      id="dashboard-products"
      className="flex flex-col justify-start items-center p-2 gap-2"
    >
      {productsLoading ? (
        <Loader />
      ) : productsError ? (
        <p>{productsError}</p>
      ) : (
        <>
          <h2 className="w-full flex text-start font-bold text-2xl">
            Todos los Productos
          </h2>
          <ProductsList products={products} />
        </>
      )}
    </div>
  );
}
