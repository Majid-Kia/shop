import React, { useContext } from "react";
import { Navbar } from "../navbar/Navbar";
import { ProductList } from "../productList/ProductList";
import { AddProduct } from "../addProduct/AddProduct";
import style from "./Layout.module.scss";
import { ProductsContext } from "../../contexts/ProductsContext";
import { navItems } from "../../consts";

export const Layout = () => {
  const { activeItem } = useContext(ProductsContext);

  return (
    <div className={style.layout}>
      <Navbar />
      {activeItem === navItems[0].value && <ProductList />}
      {activeItem === navItems[1].value && <AddProduct />}
    </div>
  );
};
