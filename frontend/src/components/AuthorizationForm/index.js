import React, { useState } from "react";
import "./AuthorizationForm.css";
import ClosingButton from "../ClosingButton";

const AuthorizationForm = ({OnCloseButtonClick = () => {}}) => {
  const [formData, setFormData] = useState({
    login: "",
    password: ""
  });

  const updateFormData = event =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  const { login, password } = formData;

  return (
    <div className="authorization-form">
      <div className="authorization-form-closing-button"><ClosingButton onClick={OnCloseButtonClick}/></div>
      <form className="authorization-form">
        <div className="authorization-form-text">Логин</div>
        <input className="authorization-form-input"
          value={login}
          onChange={e => updateFormData(e)}
          placeholder="Логин"
          type="text"
          name="login"
          required
        />
        <div className="authorization-form-text">Пароль</div>
        <input className="authorization-form-input"
          value={password}
          onChange={e => updateFormData(e)}
          placeholder="Пароль"
          type="password"
          name="password"
          required
        />
        <button className="authorization-form-button" type="submit">Войти</button>
        <div>или</div>
        <button className="authorization-form-button-registration">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default AuthorizationForm;
