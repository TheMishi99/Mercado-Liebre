import CreateProductForm from "../../../components/web/products/CreateProductForm";

export default function CreateProduct() {
  return (
    <div
      id="products-create"
      className="w-full flex justify-center items-center p-2 gap-2"
    >
      <div
        id="products-create-form-container"
        className="w-full max-w-[500px] flex flex-col justify-center items-center p-2 gap-2 bg-zinc-300 rounded-xl"
      >
        <h2 className="w-full font-bold text-center text-xl">
          Agregar un Producto
        </h2>
        <CreateProductForm />
      </div>
    </div>
  );
}
