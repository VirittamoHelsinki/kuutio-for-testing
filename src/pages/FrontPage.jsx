import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "../styles/FrontPage.scss";

const FrontPage = () => {
  const { logout } = UserAuth();

  const onLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="frontpage-main">
      <div className="frontpage-content">
        <Link to="booking" className="frontpage-button">
          Varaa uusi aika
        </Link>
        <Link to="manage-booking" className="frontpage-button">
          Hallinnoi ajanvarauksia
        </Link>
        <button className="frontpage-button" onClick={onLogout}>
          Kirjaudu ulos
        </button>
      </div>
    </div>
  );
};

export default FrontPage;
