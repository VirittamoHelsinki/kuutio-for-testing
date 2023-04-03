import React from 'react';
import logo from "../images/virittämö.png";
import '../styles/Header.scss'

const Header = () => {
  
  return (
    <div className='header-main'>
      <img src={logo} alt="logo" />
      <h2>Käyttäjä tähän</h2>
    </div>
  );

}

export default Header;