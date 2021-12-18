import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { LoginContext } from "../../contexts/LoginContext";

import style from "./LoginForm.module.scss";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setLogedIn } = useContext(LoginContext);

  const notify = () =>
    toast.custom(
      <div className="success-toast">
        <h3>پیام موفق</h3>
        <p>با موفقیت وارد داشبورد شدید</p>
      </div>,
      {
        position: "bottom-right",
      }
    );

  const submitForm = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    notify();
    setLogedIn(true);
  };
  return (
    <div className={style.formBody}>
      <h2 className={style.title}>ورود به حساب کاربری</h2>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className={`field ${errors.userName ? style.error : ""}`}>
          <label>ایمیل</label>
          <input
            id="userName"
            type="text"
            placeholder="لطفا ایمیل خود را وارد کنید ..."
            {...register("userName", {
              required: "ایمیل را وارد کنید",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "فرمت ایمیل اشتباه است",
              },
            })}
          />
          {errors.userName && <span>{errors.userName.message}</span>}
        </div>
        <div className={`field ${errors.password ? style.error : ""}`}>
          <label>رمز عبور</label>
          <input
            id="password"
            type="password"
            placeholder="لطفا رمز عبور خود را وارد کنید ..."
            {...register("password", {
              required: "رمز عبور را وارد کنید",
              minLength: {
                value: 8,
                message: "رمز عبور باید حداقل 8 کاراکتر باشد",
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button className={style.submit} onClick={handleSubmit(submitForm)}>
          ورود به حساب کاربری
        </button>

        <div className={style.forgot}>
          <span> رمز عبور خود را فراموش کرده اید؟ </span>
          <a href="#">بازیابی رمز عبور</a>
        </div>
      </form>
      <Toaster />
    </div>
  );
};
