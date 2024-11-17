import { Link } from "react-router-dom";
import { VITE_API_URL } from "../../../config/app.config";
import { ProductType } from "../../../typings/backend-types";

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/products/${product.id}`}
      id="product-card"
      className="w-full flex flex-col justify-center items-center p-2 gap-2 bg-zinc-300 rounded-xl"
    >
      <div
        id="product-img"
        className="w-full flex justify-center items-center p-2 gap-2"
      >
        <img
          src={`${VITE_API_URL}/${product.image}`}
          alt={product.alt_name}
          className="text-black"
        />
      </div>
      <div
        id="product-info"
        className="w-full flex flex-col justify-center items-center"
      >
        <p
          id="product-name"
          className="w-full flex justify-center items-center text-black"
        >
          {product.name}
        </p>
        <p
          id="product-price"
          className="w-full flex justify-center items-center text-black"
        >
          ${product.price}
        </p>
      </div>
    </Link>
  );
}
