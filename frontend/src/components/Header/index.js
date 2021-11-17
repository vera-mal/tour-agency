import React from 'react';
import './header.css'
import {Button} from "@mui/material";
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { ReactComponent as Logo } from '../../assets/Logo.svg';

const Header = () => {
  return (
    <>
      <div className='header header-upper'>
        <div className='group'>
          <div className='text'>Контакты</div>
          <div className='text'>+453 544 54 45</div>
          <div className='text'>Bellissimo@mail.com</div>
        </div>
        <div className='group'>
          <a className='link'>Сертификаты</a>
          <a className='link'>Помощь</a>
        </div>
      </div>
      <div className='header header-lower'>
        <a className='logo'><Logo/></a>
        <div className='group'>
          <a className='link'>История заказов</a>
          <a className='link'>Избранное</a>
          <a className='link'>Корзина</a>
          <Button variant='outlined' style={{border: '1px solid #FFFFFF', color: '#FFFFFF'}}>Выход</Button>
        </div>
      </div>
    </>
  );
};

export default Header;
