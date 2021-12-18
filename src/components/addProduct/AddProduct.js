import React from "react";
import { WizardForm } from "./WizardForm";
import style from "./AddProduct.module.scss";
export const AddProduct = () => {
  return (
    <div className={style.addProduct}>
      <WizardForm />
    </div>
  );
};
