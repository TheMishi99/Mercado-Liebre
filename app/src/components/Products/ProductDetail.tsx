import { Product } from "../../Types";

interface ProductDetailProps {
  product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  return <div>ProductDetail</div>;
};

export default ProductDetail;
