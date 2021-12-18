import React, { useContext } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { productColors } from "../../consts";
import { ProductsContext } from "../../contexts/ProductsContext";
import NumberFormat from "react-number-format";

export const PriceForm = () => {
  const { newProductInfo, setNewProductPrice } = useContext(ProductsContext);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setNewProductPrice({
      price: data.productPrice,
      color: data.productColor,
      inventory: data.productInventory ? data.productInventory : null,
    });
    // addNewProduct(data);
  };

  const showInventoryField = () => {
    if (
      newProductInfo &&
      newProductInfo.type &&
      newProductInfo.type.value === "physical"
    ) {
      return true;
    }
    return false;
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className={`field price-field ${errors.productPrice ? "error" : ""}`}
      >
        <label className="label"> قیمت</label>

        <Controller
          rules={{ required: "پر کردن این فیلد الزامی است" }}
          render={({ field }) => (
            <NumberFormat
              {...field}
              thousandSeparator={true}
              placeholder="قیمت محصول را وارد کنید"
              isNumericString={true}
            />
          )}
          name="productPrice"
          variant="outlined"
          control={control}
        />
        {errors.productPrice && <span>{errors.productPrice.message}</span>}
      </div>
      <div className={`field ${errors.productColor ? "error" : ""}`}>
        <label className="label"> رنگ</label>
        <Controller
          name="productColor"
          control={control}
          rules={{ required: "پر کردن این فیلد الزامی است" }}
          render={({ field }) => (
            <Select
              {...field}
              className="basic-single-select"
              classNamePrefix="select"
              isClearable={true}
              isRtl={true}
              options={productColors}
              placeholder="رنگ های محصول را انتخاب کنید ..."
              noOptionsMessage={() => "موردی یافت نشد"}
            />
          )}
        />
        {errors.productColor && <span>{errors.productColor.message}</span>}
      </div>
      {showInventoryField() && (
        <div className={`field ${errors.productInventory ? "error" : ""}`}>
          <label className="label">موجودی انبار </label>
          <input
            type="number"
            placeholder="موجودی انبار را وارد کنید"
            {...register("productInventory", {
              required: "پر کردن این فیلد الزامی است",
            })}
          />
          {errors.productInventory && (
            <span>{errors.productInventory.message}</span>
          )}
        </div>
      )}

      <div className=" mt-30 d-flex j-end">
        <button className="btn-fill">ثبت محصول</button>
      </div>
    </form>
  );
};
