import { useState } from "react";
import { NavItem } from "../../../app/src/Types";

import Logo from "../assets/images/logo-mercado-liebre.svg";
import { Link } from "react-router-dom";

interface SideBarProps {
  navItems: Array<NavItem>;
}

const SideBar = ({ navItems }: SideBarProps) => {
  return (
    <div
      id="sideBar"
      className="w-[15%] h-[98vh] flex flex-col justify-start items-center bg-yellow-300 rounded-xl"
    >
      <div id="logo" className="w-full flex justify-center items-center p-4">
        <img src={Logo} alt="Logo" className="w-full" />
      </div>
      <nav>
        <ul>
          {navItems.map((navItem, index) => {
            return (
              <li key={navItem.title + index}>
                <Link
                  to={navItem.url}
                  className="flex justify-center items-center text-black"
                >
                  {navItem.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
