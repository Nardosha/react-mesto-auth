import React from "react";

export const Login = () => {
  const onChange = (e) => {
    console.log("onChange", e);
  };

  const onSubmit = (e) => {
    console.log("onSubmit", e);
  };

  return (
    <form
      className="form"
      action="#"
      name="login"
      id="login"
      onSubmit={onSubmit}
    >
      <h1 className="form__title">Вход</h1>

      <fieldset className="form__inputs" form="login">
        <label htmlFor="user_email" className="form__label" />
        <input
          id="user_email"
          className="form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={onChange}
        />

        <label htmlFor="user_email" className="form__label" />
        <input
          id="user_password"
          className="form__input"
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={onChange}
        />
      </fieldset>

      <button
        className="form__button-submit"
        type="submit"
        id="form_button_submit"
      >
        Войти
      </button>
    </form>
  );
};
