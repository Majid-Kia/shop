import React from "react";
import { LoginForm } from "./LoginForm";
import style from "./LoginPage.module.scss";
export const LoginPage = () => {
  return (
    <div className={style.main}>
      <LoginForm />
    </div>
  );
};
