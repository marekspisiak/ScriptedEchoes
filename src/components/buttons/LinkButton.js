import React from "react";

import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const LinkButton = ({ to, children, ...rest }) => {
  return (
    <Link to={to}>
      <Button {...rest}>{children}</Button>
    </Link>
  );
};

export default LinkButton;
