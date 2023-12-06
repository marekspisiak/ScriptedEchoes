import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Button from "react-bootstrap/Button";
import useHandleLogin from "../../hooks/useHandleLogin";

const LoginButton = () => {
  const handleLogin = useHandleLogin();

  return (
    <Button onClick={() => handleLogin()} variant="outline-primary">
      Log In / Register
    </Button>
  );
};

export default LoginButton;
