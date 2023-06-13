import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import * as auth from "../utils/auth";

export const Register = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const onChange = ({ target }) => {
    setFormValue({ ...formValue, [target.name]: target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    auth
      .register(formValue.email, formValue.password)
      .then((res) => {
        context.handleRegister(formValue.email, formValue.password);
        navigate("/sign-in", { replace: true });
      })
      .catch(console.error);
  };

  return (
    <section className="sign-up">
      <h1 className="sign-up__title">Регистрация</h1>

      <form
        className="sign-up__form form"
        action="#"
        name="sign_up"
        id="sign_up"
        onSubmit={onSubmit}
      >
        <fieldset className="form__inputs" form="sign_up">
          <label htmlFor="user_email" className="form__label" />
          <input
            value={formValue.email}
            id="user_email"
            className="form__input form__input_sign-up"
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={onChange}
          />

          <label htmlFor="user_email" className="form__label" />
          <input
            value={formValue.password}
            id="user_password"
            className="form__input form__input_sign-up"
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={onChange}
          />
        </fieldset>

        <button
          className="form__button-submit form__button-submit_color_white"
          type="submit"
          id="form_button_submit"
        >
          Зарегистрироваться
        </button>
      </form>

      <Link to="/sign-in" className="link">
        Уже зарегистрированы? Войти
      </Link>
    </section>
  );
};
