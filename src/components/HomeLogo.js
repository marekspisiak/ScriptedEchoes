import React from "react";
import { Link } from "react-router-dom";

function HomeLogo() {
  return (
    <Link to="/">
      <img className="home-logo" src="/favicon.ico" alt="Home Logo" />
    </Link>
  );
}

export default HomeLogo;
