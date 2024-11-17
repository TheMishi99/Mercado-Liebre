import { Link } from "react-router-dom";
import { NavBarItem } from "../typings/frontend-types";

interface NavBarProps {
  items: NavBarItem[];
  order?: "column" | "row";
}
export default function NavBar({ items, order = "row" }: NavBarProps) {
  return (
    <nav className="w-full flex justify-center items-center">
      <ul
        className="w-full flex flex-col sm:flex-row justify-center items-center gap-2"
        style={{ flexDirection: order }}
      >
        {items
          .filter((item) => item.condition)
          .map((item, index) => (
            <li
              key={item.title + index}
              className="w-full sm:flex-1 flex justify-center items-center sm:rounded-xl bg-blue-700 text-white font-bold hover:bg-blue-600"
            >
              <Link
                to={item.url}
                className="w-full flex justify-center items-center p-2"
              >
                {item.title}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}
