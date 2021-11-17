import React from 'react';
import './navbar.css'
import {categories} from '../../mocks/categories'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='category'><i className="icon fas fa-camera-retro"></i><div className='name'>Все экскурсии</div></div>
      {categories.map((category) =>
        <div className='category'><i className={'icon fas ' + category.icon}></i><div className='name'>{category.russianName}</div></div>
      )}
    </div>
  );
};

export default Navbar;
