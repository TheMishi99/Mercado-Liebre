import { type Product } from "../../Types";

interface ProductsListProps {
  title: string;
  products: Array<Product>;
}

const ProductsList = ({ title, products }: ProductsListProps) => {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-zinc-100 p-2 rounded-xl">
      <h1 className="w-full flex justify-start items-center text-xl text-black">
        {title}
      </h1>
      <ul className="w-full flex flex-wrap flex-row justify-center items-center p-2 gap-4">
        {products.map((product, index) => {
          return (
            <li
              key={product.name + index}
              className="w-[100%] sm:w-[47%] md:w-[23%] flex flex-col justify-center items-center"
            >
              <div
                id="product-img"
                className="w-full flex justify-center items-center"
              >
                <img
                  src={"http://localhost:5678/" + product.image}
                  alt={product.altName}
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
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductsList;
