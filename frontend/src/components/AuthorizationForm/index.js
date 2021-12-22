import React, { useState } from "react";
import "./AuthorizationForm.css";
import ClosingButton from "../ClosingButton";
import {Alert} from "@mui/material";

const AuthorizationForm = ({OnCloseButtonClick = () => {}, onSubmit = () => {}, onRegClick = () => {}}) => {
  const [formData, setFormData] = useState({
    login: "",
    password: ""
  });
  const [token, setToken] = useState();
  const { login, password } = formData;
  const [error, setError] = useState('');

  const updateFormData = event =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  const handleLogin = () => {
    var details = {
      username: login,
      password: password,
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/x-www-form-urlencoded", 'origin': 'http://localhost:3000'},
      body: formBody
    };

    fetch('https://enigmatic-journey-19735.herokuapp.com/https://bellissimo-tour-agency.herokuapp.com/bellissimo/login', requestOptions)
      .then(response => response.json())
      .then((result) => {
        console.log(result);
        if (result.access_token) {
          onSubmit(result.access_token, result.id);
          OnCloseButtonClick();
        }
        else if (result.error) {
            setError('Неверный логин и/или пароль');
            setFormData({...formData, password: ''})
          }
        },
        (error) => {
          console.log(2, error);
        })
  };

  return (
    <div className="authorization-form">
      {token}
      <div className="authorization-form-closing-button">
        <ClosingButton onClick={OnCloseButtonClick}/>
      </div>
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
        {error && <Alert severity="error">{error}</Alert>}
        <button
          disabled={Object.values(formData).some((elem) => !elem)}
          onClick={handleLogin}
          className="authorization-form-button authorization-form-button-center"
          type='button'
        >
          Войти
        </button>
        <div>или</div>
        <button onClick={onRegClick} className="authorization-form-button-registration" type='button'>Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default AuthorizationForm;
