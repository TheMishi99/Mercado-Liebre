import { Link } from "react-router-dom";
import { NavbarItem } from "../typings/frontend-types";

export default function Navbar({
  items,
  direction = "row",
}: Readonly<{
  items: NavbarItem[];
  direction?: "col" | "row";
}>) {
  return (
    <nav className="w-full flex justify-center items-center">
      <ul
        className={`w-full flex flex-${direction} ${
          direction === "row" ? "flex-wrap" : ""
        } justify-center items-center gap-2`}
      >
        {items.map(
          (item) =>
            item.condition && (
              <li
                key={item.id}
                className={`${
                  direction === "col" ? "w-full" : ""
                } flex justify-center items-center`}
              >
                <Link
                  to={item.url}
                  className="w-full p-2 text-center bg-blue-700 text-white font-bold hover:bg-blue-600 rounded-xl"
                >
                  {item.title}
                </Link>
              </li>
            )
        )}
      </ul>
    </nav>
  );
}
