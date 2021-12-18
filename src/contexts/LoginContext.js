import React, { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginContextProvider = (props) => {
  const initialLogedIn = JSON.parse(localStorage.getItem("user")) || false;
  const [logedIn, setLogedIn] = useState(initialLogedIn);
  return (
    <LoginContext.Provider
      value={{
        logedIn,
        setLogedIn,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
