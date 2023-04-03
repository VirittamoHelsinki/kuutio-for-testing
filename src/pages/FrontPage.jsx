import React from "react";
import { Link } from "react-router-dom";
import "../styles/FrontPage.scss";

const FrontPage = () => {
  return (
    <div className="frontpage-main">
      <div className="frontpage-content">
        <Link to="booking">
          <button className="frontpage-button">Varaa uusi aika</button>
        </Link>
        <button className="frontpage-button">Hallinnoi ajanvarauksia</button>
        <button className="frontpage-button">Kirjaudu ulos</button>
      </div>
    </div>
  );
};

export default FrontPage;
