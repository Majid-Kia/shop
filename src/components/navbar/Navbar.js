import React, { useContext } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import { navItems } from "../../consts";
import style from "./Navbar.module.scss";

export const Navbar = () => {
  const { activeItem, setActiveItem } = useContext(ProductsContext);
  return (
    <div className={style.navbar}>
      <h2>محصولات</h2>
      <ul>
        {navItems.map((item) => {
          return (
            <li
              key={item.value}
              className={activeItem === item.value ? style.active : ""}
              onClick={() => setActiveItem(item.value)}
            >
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
