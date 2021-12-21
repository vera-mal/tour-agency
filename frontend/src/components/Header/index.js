import React from 'react';
import './Header.css'
import {Button} from "@mui/material";
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import {Link} from "react-router-dom";

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
          <Link to='/certificates' className='link'>Сертификаты</Link>
          <Link to='/help' className='link'>Помощь</Link>
        </div>
      </div>
      <div className='header header-lower'>
        <Link to='/' className='logo'><Logo/></Link>
        <div className='group'>
          <Link to='/history' className='link'>История заказов</Link>
          <Link to='/favourites' className='link'>Избранное</Link>
          <Link to='/cart' className='link'>Корзина</Link>
          <Button variant='outlined' style={{border: '1px solid #FFFFFF', color: '#FFFFFF'}}>Выход</Button>
        </div>
      </div>
    </>
  );
};

export default Header;
