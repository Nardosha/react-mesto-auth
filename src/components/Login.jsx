import React from "react";
import { sectionOptions } from "../utils/constants";

export const Login = () => {
  const onChange = (e) => {
    console.log("onChange", e);
  };

  const onSubmit = (e) => {
    console.log("onSubmit", e);
  };

  return (
    <section className="sign-in">
      <h1 className="sign-in__title">Вход</h1>

      <form
        className="sign-in__form form"
        action="#"
        name="sign-in"
        id="sign-in"
        onSubmit={onSubmit}
      >
        <fieldset className="form__inputs" form="sign-in">
          <label htmlFor="user_email" className="form__label" />
          <input
            id="user_email"
            className="form__input form__input_sign-in"
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={onChange}
          />

          <label htmlFor="user_email" className="form__label" />
          <input
            id="user_password"
            className="form__input form__input_sign-in"
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
          Войти
        </button>
      </form>
    </section>
  );
};
