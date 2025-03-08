import { createContext, useContext, useEffect, useState } from "react";
import { ProductType } from "../typings/backend-types";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../services/product.services";

interface ProductsContextInterface {
  productsLoading: boolean;
  productsError: string | null;
  products: ProductType[];
  getProducts: () => void;
  addProduct: ({ data }: { data: FormData }) => void;
  editProduct: ({ id, data }: { id: string; data: FormData }) => void;
  removeProduct: ({ id }: { id: string }) => void;
}

const ProductsContext = createContext<ProductsContextInterface>({
  productsLoading: true,
  productsError: null,
  products: [],
  getProducts: () => {},
  addProduct: () => {},
  editProduct: () => {},
  removeProduct: () => {},
});

export default function ProductsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [productsLoading, setProductsLoading] = useState<boolean>(true);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const [error, products] = await fetchProducts();
    setProductsError(error);
    setProducts(products);
    setProductsLoading(false);
  };

  const addProduct = async ({ data }: { data: FormData }) => {
    const [error, newProduct] = await createProduct({ data });
    setProductsError(error);
    if (newProduct) setProducts((products) => [...products, newProduct]);
  };

  const editProduct = async ({ id, data }: { id: string; data: FormData }) => {
    const [error, newProduct] = await updateProduct({ id, data });
    setProductsError(error);
    if (newProduct)
      setProducts((products) =>
        products.map((prod) => (prod.id === Number(id) ? newProduct : prod))
      );
  };

  const removeProduct = async ({ id }: { id: string }) => {
    const [error, ok] = await deleteProduct({ id });
    setProductsError(error);
    if (ok)
      setProducts((products) =>
        products.filter((product) => product.id !== Number(id))
      );
  };

  return (
    <ProductsContext.Provider
      value={{
        productsLoading,
        productsError,
        products,
        getProducts,
        addProduct,
        editProduct,
        removeProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProductsContext() {
  return useContext(ProductsContext);
}
