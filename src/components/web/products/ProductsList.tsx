import { ProductType } from "../../../typings/backend-types";
import ProductCard from "./ProductCard";

interface ProductsListProps {
  products: ProductType[];
}

export default function ProductsList({ products }: ProductsListProps) {
  return (
    <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-2 gap-2">
      {products.map((product, index) => {
        return (
          <li
            key={product.name + index}
            className="flex justify-center items-cente p-2 gap-2"
          >
            <ProductCard product={product} />
          </li>
        );
      })}
    </ul>
  );
}
