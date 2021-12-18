import React, { useContext } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { productTypes } from "../../consts";
import { ProductsContext } from "../../contexts/ProductsContext";

export const InfoForm = () => {
  const { setWizardStep, setNewProductInfo } = useContext(ProductsContext);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setNewProductInfo({
      name: data.productName,
      type: data.productType,
    });
    setWizardStep(2);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`field ${errors.productName ? "error" : ""}`}>
        <label className="label">نام محصول</label>
        <input
          id="productName"
          type="text"
          {...register("productName", {
            required: "نام محصول را وارد کنید ",
          })}
          placeholder="نام محصول را وارد کنید ..."
        />
        {errors.productName && <span>{errors.productName.message}</span>}
      </div>
      <div className={`field ${errors.productType ? "error" : ""}`}>
        <label className="label">نوع محصول</label>
        <Controller
          name="productType"
          control={control}
          rules={{ required: "پر کردن این فیلد الزامی است" }}
          render={({ field }) => (
            <Select
              {...field}
              className="basic-single-select"
              classNamePrefix="select"
              isClearable={true}
              isRtl={true}
              options={productTypes}
              placeholder="نوع محصول را انتخاب کنید ..."
            />
          )}
        />
        {errors.productType && <span>{errors.productType.message}</span>}
      </div>
      <div className=" mt-30 d-flex j-end">
        <button className="btn-fill">ادامه</button>
      </div>
    </form>
  );
};
