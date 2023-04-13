import React from "react";
import logo from "../images/virittämö.png";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "../styles/Header.scss";

const Header = () => {
  const { user } = UserAuth();

  return (
    <div className="header-main">
      <Link to="/" role="button">
        <img src={logo} alt="logo" />
      </Link>
      {user ? <h2>{user.email}</h2> : <h2>Ei käyttäjää</h2>}
    </div>
  );
};

export default Header;
