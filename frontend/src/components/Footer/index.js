import React from 'react';
import './Footer.css';
import { ReactComponent as Logo } from '../../assets/white-logo.svg';
import {Link} from "react-router-dom";

const Footer = ({categories = []}) => {
  return (
    <>
      <div className='footer'>
        {categories && categories?.length !== 0 &&
          <>
          <div className='footer-logo-text'>
            <Link to='/' className='footer-logo'><Logo/></Link>
            <div className='footer-heading footer-description'>
              Присоединяйтесь к нашей дружной компании и исследуйте тайны Петербурга вместе с нами!
            </div>
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
          <a href='https://www.google.ru/' className='footer-icon'><i className="fab fa-google-plus-g" /></a>
          <a href='https://ru-ru.facebook.com/' className='footer-icon'><i className="fab fa-facebook-f" /></a>
          <a href='https://twitter.com/home' className='footer-icon'><i className="fab fa-twitter" /></a>
          <a href='https://www.instagram.com/' className='footer-icon'><i className="fab fa-instagram" /></a>
          </div>
          </>
        }
      </div>
    </>
  );
};

export default Footer;
