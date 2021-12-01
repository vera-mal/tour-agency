import React from 'react';
import './Footer.css';
import { ReactComponent as Logo } from '../../assets/white-logo.svg';
import {Link} from "react-router-dom";
import {categories} from '../../mocks/categories'

const Footer = () => {
  return (
    <>
      <div className='footer'>
          <div className='footer-logo-text'>
            <Link to='/' className='footer-logo'><Logo/></Link>
            <div className='footer-heading footer-description'>Fusce ut elit aliquet, fermentum leo vel, tempus nunc. Fusce eu rhoncus augue. Fusce vel metus pharetra, fermentum</div>
          </div>

          <div className='footer-block'>
            <div className='footer-heading footer-text'>Категории</div>
            {categories.map((category) =>
              <Link to={'/' + category.englishName} className='footer-category footer-text'>{category.russianName}</Link>
            )}
            <Link to='/certificates' className='footer-category footer-text'>Сертификаты</Link>
            <Link to='/help' className='footer-category footer-text'>Помощь</Link>
          </div>

          <div className='footer-block'>
            <div className='footer-heading footer-text'>Контакты</div>
            <div className='footer-text'>+453 544 54 45</div>
            <div className='footer-text'>Bellissimo@mail.com</div>
          </div>

          <div className='footer-icons'>
            <a href='https://www.google.ru/' className='footer-icon'><i class="fab fa-google-plus-g"></i></a>
            <a href='https://ru-ru.facebook.com/' className='footer-icon'><i class="fab fa-facebook-f"></i></a>
            <a href='https://twitter.com/home' className='footer-icon'><i class="fab fa-twitter"></i></a>
            <a href='https://www.instagram.com/' className='footer-icon'><i class="fab fa-instagram"></i></a>
          </div>

      </div>
    </>
  );
};

export default Footer;
