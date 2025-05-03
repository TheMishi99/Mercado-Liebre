import { createContext, useContext, useEffect, useState } from "react";
import { ProductType } from "../typings/backend-types";
import { VITE_API_URL } from "../config/app.config";
import {
  ApiErrorResponse,
  ApiProductResponse,
  ApiProductsResponse,
  ApiUpdateProductResponse,
} from "../typings/backend-api-types";

interface ProductsContextInterface {
  isLoading: boolean;
  isError: string | null;
  products: ProductType[];
  getProduct: ({ id }: { id: string }) => ProductType | null;
  addProduct: ({ data }: { data: FormData }) => void;
  editProduct: ({ id, data }: { id: string; data: FormData }) => void;
  removeProduct: ({ id }: { id: string }) => void;
}

const ProductsContext = createContext<ProductsContextInterface>({
  isLoading: true,
  isError: null,
  products: [],
  getProduct: () => null,
  addProduct: () => {},
  editProduct: () => {},
  removeProduct: () => {},
});

export default function ProductsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductType[]>([]);

  const getProduct = ({ id }: { id: string }) => {
    const product = products.find((p) => p.id === Number(id));
    return product || null;
  };

  const addProduct = async ({ data }: { data: FormData }) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${VITE_API_URL}/api/products`, {
        body: data,
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        const apiErrorResponse: ApiErrorResponse = await response.json();
        throw new Error(apiErrorResponse.error);
      }
      const apiProductResponse: ApiProductResponse = await response.json();
      setProducts((products) => [...products, apiProductResponse.product]);
      return true;
    } catch (error) {
      if (error instanceof Error) setIsError(error.message);
      else setIsError("Error creating product");
      return false;
    }
  };

  const editProduct = async ({ id, data }: { id: string; data: FormData }) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${VITE_API_URL}/api/products/${id}`, {
        body: data,
        method: "PATCH",
        credentials: "include",
      });
      if (!response.ok) {
        const apiErrorResponse: ApiErrorResponse = await response.json();
        throw new Error(apiErrorResponse.error);
      }
      const apiUpdateProductResponse: ApiUpdateProductResponse =
        await response.json();
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === Number(id)
            ? apiUpdateProductResponse.updated_product
            : product
        )
      );
      return true;
    } catch (error) {
      if (error instanceof Error) setIsError(error.message);
      else setIsError("Error updating product");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const removeProduct = async ({ id }: { id: string }) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${VITE_API_URL}/api/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        const apiErrorResponse: ApiErrorResponse = await response.json();
        throw new Error(apiErrorResponse.error);
      }
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== Number(id))
      );
      return true;
    } catch (error) {
      if (error instanceof Error) setIsError(error.message);
      else setIsError("Error deleting product");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${VITE_API_URL}/api/products`, {
          credentials: "include",
        });
        if (!response.ok) {
          const apiErrorResponse: ApiErrorResponse = await response.json();
          throw new Error(apiErrorResponse.error);
        }
        const apiProductsResponse: ApiProductsResponse = await response.json();
        setProducts(apiProductsResponse.products);
      } catch (error) {
        if (error instanceof Error) setIsError(error.message);
        else setIsError("Error fetching products");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        isLoading,
        isError,
        products,
        getProduct,
        addProduct,
        editProduct,
        removeProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => useContext(ProductsContext);
