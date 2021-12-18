import React, { useContext } from "react";
import { InfoForm } from "./InfoForm";
import { CategoryForm } from "./CategoryForm";
import { PriceForm } from "./PriceForm";
import style from "./WizardForm.module.scss";
import { ProductsContext } from "../../contexts/ProductsContext";

export const WizardForm = () => {
  const { wizardStep } = useContext(ProductsContext);
  return (
    <div className={style.wizard}>
      <div className={style.wizardSteps}>
        <ul>
          <li className={wizardStep >= 1 ? style.active : ""}>
            <span>اطلاعات کلی</span>
          </li>
          <li className={wizardStep >= 2 ? style.active : ""}>
            <span>توضیحات و دسته بندی</span>
          </li>
          <li className={wizardStep >= 3 ? style.active : ""}>
            <span>قیمت و مشخصات</span>
          </li>
        </ul>
      </div>
      <div className={style.wizardForm}>
        {wizardStep === 1 && <InfoForm />}
        {wizardStep === 2 && <CategoryForm />}
        {wizardStep === 3 && <PriceForm />}
      </div>
    </div>
  );
};
