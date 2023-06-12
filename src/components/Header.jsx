import React, { useContext, useEffect, useState } from "react";
import logo from "../images/logo.svg";
import { AppContext } from "../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

export const Header = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogging, setIsLogging] = useState(location.pathname === "/sign-in");

  const register = () => {
    console.log("register",  isLogging, location.pathname);
    navigate("/sign-up", { replace: true });
  };

  useEffect(() => {
    console.log("useEffect", isLogging, location.pathname);
    // setIsLogging(location.pathname === 'sign-in')
  }, [isLogging]);

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Mesto" />
      {!isLogging && !context.loggedIn && (
        <a
          href="#"
          className="link header__link"
          onClick={register}
        >
          Зарегестрироваться
        </a>
      )}
    </header>
  );
};
