import React, { useContext } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { productCategory } from "../../consts";
import { ProductsContext } from "../../contexts/ProductsContext";
import CreatableSelect from "react-select/creatable";

export const CategoryForm = () => {
  const { setWizardStep, setNewProductCategory } = useContext(ProductsContext);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setNewProductCategory({
      brand: data.productCategory,
      tags: data.productTags,
      description: data.productDescription,
    });
    setWizardStep(3);
  };

  const formatCreateLabel = (inputValue) => ` ساخت تگ... ${inputValue}`;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`field ${errors.productCategory ? "error" : ""}`}>
        <label className="label">دسته بندی</label>
        <Controller
          name="productCategory"
          control={control}
          rules={{ required: "پر کردن این فیلد الزامی است" }}
          render={({ field }) => (
            <Select
              {...field}
              className="basic-single-select"
              classNamePrefix="select"
              isClearable={true}
              isRtl={true}
              isMulti={true}
              options={productCategory}
              placeholder="دسته بندی محصول را انتخاب کنید ..."
              noOptionsMessage={() => "موردی یافت نشد"}
            />
          )}
        />
        {errors.productCategory && (
          <span>{errors.productCategory.message}</span>
        )}
      </div>
      <div className={`field ${errors.productChips ? "error" : ""}`}>
        <label className="label">برچسب </label>
        <Controller
          name="productChips"
          render={({ field }) => (
            <CreatableSelect
              {...field}
              className="basic-single-select"
              classNamePrefix="select"
              isMulti
              placeholder="برچسب ها را انتخاب کنید"
              formatCreateLabel={formatCreateLabel}
              noOptionsMessage={() => "برای ساخت برچسب تایپ کنید"}
            />
          )}
          control={control}
          rules={{ required: "پر کردن این فیلد الزامی است" }}
        />
        {errors.productChips && <span>{errors.productChips.message}</span>}
      </div>
      <div className={`field ${errors.productDescription ? "error" : ""}`}>
        <label className="label">توضیحات </label>
        <textarea
          placeholder="توضیحات محصول را وارد کنید"
          {...register("productDescription", {
            required: "پر کردن این فیلد الزامی است",
          })}
        />
        {errors.productDescription && (
          <span>{errors.productDescription.message}</span>
        )}
      </div>
      <div className=" mt-30 d-flex j-end">
        <button className="btn-fill">ادامه</button>
      </div>
    </form>
  );
};
