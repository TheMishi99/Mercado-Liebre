import { useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import { VITE_API_URL } from "../../../config/app.config";
import { useProductsContext } from "../../../contexts/ProductsContext";
import { useMemo } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const { productsLoading, productsError, products } = useProductsContext();
  const productFound = useMemo(
    () => products.find((product) => product.id === id),
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
          <div id="product-detail">
            <div id="product-img">
              <img
                src={`${VITE_API_URL}/${productFound.image}`}
                alt={productFound.alt_name}
              />
            </div>
            <div id="product-info">
              <p>{productFound.image}</p>
              <p>{productFound.price}</p>
            </div>
          </div>
        )
      )}
    </>
  );
}
