import React from "react";
import Image from "next/image";
import logo from "../../utils/Logo-Orange.svg";
import LoginPage from "../LoginPage";
import LoginForm from "../../components/LoginForm";
const login = () => {
  return (
    <LoginPage>
      <LoginForm />
    </LoginPage>
  );
};

export default login;
