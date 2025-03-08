import { useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import { VITE_API_URL } from "../../../config/app.config";
import { useProductsContext } from "../../../contexts/ProductsContext";
import { useMemo } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const { productsLoading, productsError, products } = useProductsContext();
  const productFound = useMemo(
    () => products.find((product) => product.id === Number(id)),
    [products, id]
  );

  return (
    <>
      {productsLoading ? (
        <Loader />
      ) : productsError ? (
        <p>{productsError}</p>
      ) : (
        productFound && (
          <div
            id="product-detail"
            className="w-full flex flex-col md:flex-row justify-center items-center p-2 gap-2"
          >
            <div
              id="product-img"
              className="w-full md:w-[49%] flex justify-center items-center p-2 gap-2"
            >
              <img
                src={`${VITE_API_URL}/${productFound.image}`}
                alt={productFound.alt_name}
                className="w-[70%] rounded-xl"
              />
            </div>
            <div
              id="product-info"
              className="w-full md:w-[49%] flex flex-col justify-start items-start p-2 gap-2"
            >
              <p>
                <strong>Nombre del Producto</strong>: {productFound.name}
              </p>
              <p>
                <strong>Precio</strong>: ${productFound.price}
              </p>
            </div>
          </div>
        )
      )}
    </>
  );
}
