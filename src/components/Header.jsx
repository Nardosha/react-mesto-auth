import React from 'react';
import logo from '../images/logo.svg';

export const Header = () => {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Mesto" />
    </header>
  );
};
