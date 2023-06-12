import React from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();

  const onChange = (e) => {
    console.log("onChange", e);
  };

  const onSubmit = (e) => {
    console.log("onSubmit", e);
  };

  const login = (e) => {
    console.log("login", e);
    navigate("/login", { replace: true });
  };

  return (
    <section className="sign">
      <h1 className="sign__title">Регистрация</h1>

      <form
        className="sign__form form"
        action="#"
        name="sign_up"
        id="sign_up"
        onSubmit={onSubmit}
      >
        <fieldset className="form__inputs" form="sign_up">
          <label htmlFor="user_email" className="form__label" />
          <input
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

      <a className="link" onClick={login}>
        Уже зарегистрированы? Войти{" "}
      </a>
    </section>
  );
};
