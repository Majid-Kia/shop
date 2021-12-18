import React, { useContext } from "react";
import { LoginPage } from "./login/LoginPage";
import { LoginContext } from "../contexts/LoginContext";
import { Layout } from "./layout/Layout";
import { ProductsContextProvider } from "../contexts/ProductsContext";

import "../styles/main.scss";

export const App = () => {
  const { logedIn } = useContext(LoginContext);

  const renderContent = () => {
    if (logedIn) {
      return (
        <ProductsContextProvider>
          <Layout />
        </ProductsContextProvider>
      );
    } else {
      return <LoginPage />;
    }
  };
  return <div>{renderContent()}</div>;
};
