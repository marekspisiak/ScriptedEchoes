import React from "react";

import Button from "./Button";
import { Link } from "react-router-dom";

const LinkButton = ({ to, children, variant, ...props }) => {
  return (
    <Link to={to}>
      <Button variant={variant} {...props}>
        {children}
      </Button>
    </Link>
  );
};

export default LinkButton;
