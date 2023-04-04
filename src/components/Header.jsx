import React from "react";
import logo from "../images/virittämö.png";
import { Link } from "react-router-dom";
import "../styles/Header.scss";

const Header = () => {
  return (
    <div className="header-main">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <Link to="login">
        <h2>Käyttäjä tähän</h2>
      </Link>
    </div>
  );
};

export default Header;
