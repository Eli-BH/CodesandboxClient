import React from "react";
import Image from "next/image";
import logo from "../../utils/Logo-Orange.svg";
import LoginPage from "../LoginPage";
import ForgotPasswordForm from "../../components/ForgotPasswordForm";

const forgot_password = () => {
  return (
    <LoginPage>
      <ForgotPasswordForm />
    </LoginPage>
  );
};

export default forgot_password;
