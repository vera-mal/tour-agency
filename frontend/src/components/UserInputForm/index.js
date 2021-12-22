import React, {useEffect, useState} from "react";
import "./UserInputForm.css";
import ClosingButton from "../ClosingButton";
import {Alert} from "@mui/material";

const UserInputForm = ({OnCloseButtonClick = () => {}, onAuth = () => {}}) => {
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    login: "",
    password: "",
    password_again: ""
  });

  const [passwordIsBlurred, setPasswordIsBlurred] = useState(false);
  const [password2IsBlurred, setPassword2IsBlurred] = useState(false);

  const updateFormData = event =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  useEffect(() => {
    if ((passwordIsBlurred || !!formData.password) && (password2IsBlurred || formData.password) && formData.password !== formData.password_again)
      setError('Пароли не совпадают')
    else if (passwordIsBlurred && formData.password.length < 6)
      setError('Длина пароля должна быть не менее 6 символов')
      else setError('')
  }, [passwordIsBlurred, password2IsBlurred, formData.password, formData.password_again, formData.login])

  const { firstName, lastName, login, password, password_again } = formData;

  const handleAdd = () => {
    const requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: firstName,
        surname: lastName,
        login: login,
        password: password,
        repeatedPassword: password_again
      })
    };

    fetch('https://bellissimo-tour-agency.herokuapp.com/bellissimo/user', requestOptions)
      .then(response => response.json())
      .then((result) => {
          console.log(1, result)
          if (result.message) setError('Логин уже занят');
          else {
            setIsSuccess(true);
            setTimeout(OnCloseButtonClick, 5000);
          }
        },
        (error) => {
          console.log(2, error);
        })
  };

  return (
    <div className="user-input-form">
      <div className="user-input-form-closing-button">
        <ClosingButton onClick={OnCloseButtonClick}/>
      </div>
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
          onBlur={() => setPasswordIsBlurred(true)}
          placeholder="Пароль"
          type="password"
          name="password"
          required
        />
        <div className="user-input-form-text">Повторный ввод пароля</div>
        <input className="user-input-form-input"
          value={password_again}
          onChange={e => updateFormData(e)}
          onBlur={() => setPassword2IsBlurred(true)}
          placeholder="Пароль"
          type="password"
          name="password_again"
          required
        />

        {isSuccess ?
          <Alert severity="success">
            Вы успешно зарегистрированы, можете авторизоваться”
          </Alert>
        : <>
            <button
              disabled={error || Object.values(formData).some((elem) => !elem)}
              onClick={handleAdd} className="user-input-form-button" type='button'
            >
              Зарегистрироваться
            </button>
            {error && <Alert severity="error">{error}</Alert>}
          </>
        }
      </form>
    </div>
  );
};

export default UserInputForm;
