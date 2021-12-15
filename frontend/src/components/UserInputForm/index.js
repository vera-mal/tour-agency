import React, { useState } from "react";
import "./UserInputForm.css";
import ClosingButton from "../ClosingButton";

const UserInputForm = ({OnCloseButtonClick = () => {}}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    login: "",
    password: ""
  });

  const updateFormData = event =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  const { firstName, lastName, login, password, password_again } = formData;

  return (
    <div className="user-input-form">
      <div className="user-input-form-closing-button"><ClosingButton onClick={OnCloseButtonClick}/></div>
      <form className="user-input-form">
        <div className="user-input-form-text">Имя</div>
        <input className="user-input-form-input"
          value={firstName}
          onChange={e => updateFormData(e)}
          placeholder="Имя"
          type="text"
          name="firstName"
          required
        />
        <div className="user-input-form-text">Фамилия</div>
        <input className="user-input-form-input"
          value={lastName}
          onChange={e => updateFormData(e)}
          placeholder="Фамилия"
          type="text"
          name="lastName"
          required
        />
        <div className="user-input-form-text">Логин</div>
        <input className="user-input-form-input"
          value={login}
          onChange={e => updateFormData(e)}
          placeholder="Логин"
          type="text"
          name="login"
          required
        />
        <div className="user-input-form-text">Пароль</div>
        <input className="user-input-form-input"
          value={password}
          onChange={e => updateFormData(e)}
          placeholder="Пароль"
          type="password"
          name="password"
          required
        />
        <div className="user-input-form-text">Повторный ввод пароля</div>
        <input className="user-input-form-input"
          value={password_again}
          onChange={e => updateFormData(e)}
          placeholder="Пароль"
          type="password"
          name="password_again"
          required
        />

        <button className="user-input-form-button" type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default UserInputForm;
