import React, { useContext } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";

import "./DeleteProduct.scss";
export const DeleteProduct = (props) => {
  const { deleteProduct } = useContext(ProductsContext);
  const handleDeleteProduct = () => {
    deleteProduct(props.delteItem.id);
    props.closeModal(false);
    props.notifyDelete();
  };
  return (
    <div className="modal-delete">
      <div>
        <h3>{`آیا ${props.delteItem.name}   را میخواهید حذف کنید؟`}</h3>
        <div className="modal-delete__actions">
          <button
            className="btn-outline"
            onClick={() => props.closeModal(false)}
          >
            انصراف
          </button>
          <button className="btn-fill" onClick={handleDeleteProduct}>
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};
