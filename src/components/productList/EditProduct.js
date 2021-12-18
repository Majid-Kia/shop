import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ProductsContext } from "../../contexts/ProductsContext";
import NumberFormat from "react-number-format";

import "./EditProduct.scss";

export const EditProduct = (props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { editProduct, editItem } = useContext(ProductsContext);

  const editForm = (data) => {
    props.closeModal();
    props.notifyEdit();
    let price = data.productPrice.split(",").join("");
    editProduct({ ...data, productPrice: price }, editItem.id);
  };
  return (
    <div className="modal-edit">
      <div className="modal-edit__title">
        <h3>ویرایش محصول</h3>
      </div>

      <div className="modal-edit__body">
        {editItem && (
          <form onSubmit={handleSubmit(editForm)}>
            <div className={`field ${errors.userName ? "error" : ""}`}>
              <label>نام محصول</label>
              <input
                id="productName"
                type="text"
                defaultValue={editItem.name}
                {...register("productName", {
                  required: "پر کردن فیلد این الزامی است",
                })}
              />
              {errors.productName && <span>{errors.productName.message}</span>}
            </div>
            <div
              className={`field  price-field ${
                errors.productPrice ? "error" : ""
              }`}
            >
              <label> قیمت</label>

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
              {errors.productPrice && (
                <span>{errors.productPrice.message}</span>
              )}
            </div>
            <div className="editSubmit">
              <button className="" onClick={handleSubmit(editForm)}>
                ثبت ویرایش
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
