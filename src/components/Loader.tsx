import { BiLoader } from "react-icons/bi";

export default function Loader() {
  return (
    <div
      id="loader"
      className="h-screen w-screen flex justify-center items-center"
    >
      <BiLoader className="size-8 animate-spin" />
    </div>
  );
}
