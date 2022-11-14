import React from "react";

import LoginPage from "../LoginPage";
import ResetPasswordForm from "../../components/ResetPasswordForm";

const reset_password = () => {
  return (
    <LoginPage>
      <ResetPasswordForm />
    </LoginPage>
  );
};

export default reset_password;
