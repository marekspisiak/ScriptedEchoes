import React from "react";

import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const LinkButton = (props) => {
  const { to } = props;
  const { children } = props;
  return (
    <Link to={to}>
      <Button>{children}</Button>
    </Link>
  );
};

export default LinkButton;
