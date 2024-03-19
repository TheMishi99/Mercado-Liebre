import { type Product } from "../Types";

interface ProductsListProps {
  title: string;
  products: Array<Product>;
}

const ProductsList = ({ title, products }: ProductsListProps) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1>{title}</h1>
      <ul className="w-full flex flex-row justify-center items-center gap-4">
        {products.map((product, index) => {
          return (
            <li key={product.name + index}>
              {product.name}, {product.price}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductsList;
