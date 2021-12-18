import React, { createContext, useState, useEffect } from "react";
import { navItems } from "../consts";
import { v4 as uuidv4 } from "uuid";
import moment from "moment-jalaali";

moment.loadPersian();
export const ProductsContext = createContext();

export const ProductsContextProvider = (props) => {
  const initialProducts = JSON.parse(localStorage.getItem("products")) || [
    {
      name: "گوشی موبایل iPhone 13 Pro Max",
      price: "46000000",
      brand: [{ value: "Apple", label: "اپل" }],
      realaseDate: "27 آذر 1400 ",
      id: uuidv4(),
    },
    {
      name: "گوشی موبایل iPhone 13 Pro Max",
      price: "46000000",
      brand: [{ value: "Apple", label: "اپل" }],
      realaseDate: "27 آذر 1400 ",
      id: uuidv4(),
    },
  ];

  const [activeItem, setActiveItem] = useState(navItems[0].value);
  const [products, setProducts] = useState(initialProducts);
  const [editItem, setEditItem] = useState(null);
  const [wizardStep, setWizardStep] = useState(1);
  const [newProductInfo, setNewProductInfo] = useState({});
  const [newProductCategory, setNewProductCategory] = useState({});
  const [newProductPrice, setNewProductPrice] = useState({});

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    if (newProductPrice.price && newProductPrice.color) {
      createProduct();
    }
  }, [newProductPrice]);

  // Find product by id
  const findProduct = (id) => {
    const product = products.find((product) => product.id === id);
    setEditItem(product);
  };

  // Edit product
  const editProduct = (data, id) => {
    const newProducts = products.map((product) =>
      product.id === id
        ? {
            name: data.productName,
            price: data.productPrice,
            brand: product.brand,
            realaseDate: product.realaseDate,
            id: product.id,
          }
        : product
    );

    setProducts(newProducts);

    setEditItem(null);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const createProduct = () => {
    setActiveItem(navItems[0].value);
    setWizardStep(1);
    let price = newProductPrice.price.split(",").join("");
    setProducts([
      ...products,
      {
        ...newProductInfo,
        ...newProductCategory,
        ...newProductPrice,
        price,
        id: uuidv4(),
        realaseDate: moment().format("jDD jMMM jYYYY "),
      },
    ]);
    setNewProductInfo({});
    setNewProductCategory({});
    setNewProductPrice({});
  };

  return (
    <ProductsContext.Provider
      value={{
        activeItem,
        setActiveItem,
        products,
        findProduct,
        editProduct,
        editItem,
        deleteProduct,
        wizardStep,
        setWizardStep,
        newProductInfo,
        createProduct,
        setNewProductInfo,
        setNewProductCategory,
        setNewProductPrice,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};
