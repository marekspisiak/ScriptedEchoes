import React from "react";

import useHandleLogin from "../../hooks/useHandleLogin";
import Button from "./Button";

const LoginButton = ({ variant }) => {
  const handleLogin = useHandleLogin();

  return (
    <Button variant={variant} onClick={() => handleLogin()}>
      Log In / Register
    </Button>
  );
};

export default LoginButton;
