import React, { useRef } from 'react';
import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

export const Header = React.memo(({ isLoggedIn, handleSignOut }) => {
  const location = useLocation();

  const setLocation = () => {
    return !!(location.pathname === '/signin' || location.pathname === '/');
  };

  const isLogging = useRef(setLocation());

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Mesto" />

      {isLogging && !isLoggedIn && (
        <Link to="/signup" className="link header__link">
          Зарегестрироваться
        </Link>
      )}

      {!isLogging && !isLoggedIn && (
        <Link to="/signin" className="link header__link">
          Войти
        </Link>
      )}

      {isLoggedIn && (
        <Link to="/signin" className="link header__link" onClick={handleSignOut}>
          Выйти
        </Link>
      )}
    </header>
  );
});
