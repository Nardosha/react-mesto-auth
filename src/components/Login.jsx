import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import * as auth from "../utils/auth";

export const Login = () => {
  const [formValue, setFormValue] = useState({
    email: "lalabumlala@gmail.com",
    password: "Nardosha2345",
  });

  const navigate = useNavigate();
  const context = useContext(AppContext);
  const onChange = ({ target }) => {
    setFormValue({ ...formValue, [target.name]: target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    auth
      .authorize(formValue.email, formValue.password)
      .then((res) => {
        console.log(res);

        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setFormValue({ email: "", password: "" });
          context.handleLogin(formValue);
          navigate("/", { replace: true });
        }
      })
      .catch(console.error);
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
            value={formValue.email}
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
            value={formValue.password}
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
          id="sign-in_form_button_submit"
        >
          Войти
        </button>
      </form>
    </section>
  );
};
