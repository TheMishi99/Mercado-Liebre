import { useState } from "react";
import { VITE_API_URL } from "../../../config/app.config";

export default function CreateProductForm() {
  const [previewImage, setPreviewImage] = useState(
    `${VITE_API_URL}/images/products/default.jpg`
  );
  const handleProductImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPreviewImage(URL.createObjectURL(event.target.files![0]));
  };
  return (
    <form className="w-full flex flex-col justify-center items-center p-2 gap-2">
      <div className="input-group w-full flex flex-col justify-center items-center gap-2">
        <label htmlFor="image" className="w-full text-start">
          Foto del Producto
        </label>
        <img
          src={previewImage}
          alt="Foto de producto"
          id="preview"
          className="w-1/2 rounded-xl"
        />
        <input
          type="file"
          name="image"
          id="image"
          onChange={handleProductImage}
        />
      </div>
      <div className="input-group w-full flex flex-col justify-center items-center gap-2">
        <label htmlFor="name" className="w-full text-start">
          Nombre del Producto
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Nombre del Producto"
          className="w-full p-2 bg-white rounded-xl"
          required
        />
      </div>
      <div className="input-group w-full flex flex-col justify-center items-center gap-2">
        <label htmlFor="price" className="w-full text-start">
          Precio del Producto
        </label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Precio del Producto"
          className="w-full p-2 bg-white rounded-xl"
          required
        />
      </div>
      <button type="submit" className="p-2 bg-yellow-400 rounded-xl">
        Agregar
      </button>
    </form>
  );
}
