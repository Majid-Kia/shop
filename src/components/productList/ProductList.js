import React, { useContext, useState } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import Pic from "../../assets/pic.svg";
import Edit from "../../assets/edit.svg";
import Delete from "../../assets/delete.svg";
import Phone from "../../assets/phone.png";
import style from "./ProductList.module.scss";
import Modal from "react-modal";
import { EditProduct } from "./EditProduct";
import { DeleteProduct } from "./DeleteProduct";
import { formatNumber } from "../../utils";
import { navItems } from "../../consts";
import toast, { Toaster } from "react-hot-toast";

Modal.setAppElement("#root");

export const ProductList = () => {
  const { products, findProduct, setActiveItem } = useContext(ProductsContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [deleteItem, setDeleteItem] = useState(null);

  const openEditModal = (id) => {
    setModalType("EDIT");
    setModalIsOpen(true);

    findProduct(id);
  };

  const openDeleteModal = (product) => {
    setDeleteItem(product);
    setModalType("DELETE");
    setModalIsOpen(true);
  };

  const notifyDelete = () =>
    toast.custom(
      <div className="success-toast">
        <h3>پیام موفق</h3>
        <p>حذف با موفقیت انجام شد</p>
      </div>,
      {
        position: "bottom-right",
      }
    );

  const notifyEdit = () =>
    toast.custom(
      <div className="success-toast">
        <h3>پیام موفق</h3>
        <p>ثبت ویرایش با موفقیت انجام شد</p>
      </div>,
      {
        position: "bottom-right",
      }
    );
  return (
    <div className={style.productList}>
      <div className={style.addProduct}>
        <button onClick={() => setActiveItem(navItems[1].value)}>
          افزودن محصول
        </button>
      </div>
      <table className={style.table}>
        <thead className={style.thead}>
          <tr>
            <th className={style.thImg}>
              <img src={Pic} alt="product" />
            </th>
            <th className={style.thName}>نام محصول</th>
            <th className={style.thPrice}> قیمت</th>
            <th className={style.thBrand}> دسته بندی</th>
            <th className={style.thDate}>تاریخ انتشار </th>
            <th className={style.thAction}></th>
          </tr>
        </thead>
        <tbody className={style.tbody}>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td className={style.tdImg}>
                  <img src={Phone} alt="phone" />
                </td>
                <td className={style.tdName}>{product.name}</td>
                <td className="fa-num ">
                  {formatNumber(product.price)}{" "}
                  <span className={style.currency}>تومان</span>
                </td>
                <td>{product.brand[0].label}</td>
                <td className="fa-num ">{product.realaseDate}</td>
                <td className={style.actions}>
                  <div>
                    <img
                      src={Edit}
                      alt="edit icon"
                      onClick={() => openEditModal(product.id)}
                    />
                    <img
                      src={Delete}
                      alt="delete icon"
                      onClick={() => openDeleteModal(product)}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Toaster />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal-body"
        overlayClassName="modal-overlay"
      >
        {modalType === "EDIT" ? (
          <EditProduct closeModal={setModalIsOpen} notifyEdit={notifyEdit} />
        ) : (
          <DeleteProduct
            delteItem={deleteItem}
            notifyDelete={notifyDelete}
            closeModal={setModalIsOpen}
          />
        )}
      </Modal>
    </div>
  );
};
