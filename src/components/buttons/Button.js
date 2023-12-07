import React from "react";
import styles from "./Button.module.css";

const Button = ({ variant, children, className, ...props }) => {
  const buttonClass = `${styles.button} ${
    styles[`button-${variant}`]
  } ${className}`;
  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
