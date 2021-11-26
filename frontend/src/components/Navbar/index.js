import React from 'react';
import './Navbar.css'
import {categories} from '../../mocks/categories'
import {Link} from "react-router-dom";

const getIcon = (name) => {
  switch (name) {
    case 'boat-trips': return 'fa-ship';
    case 'walking-tours': return 'fa-walking';
    case 'bus-tours': return 'fa-bus';
    case 'museums': return 'fa-landmark';
    case 'mystical-tours': return 'fa-magic';
    default: return 'fa-map-marker-alt';
  }
}

const Navbar = () => {
  return (
    <div className='navbar'>
      <Link to='/' className='category'><i className="icon fas fa-camera-retro"></i><div className='name'>Все экскурсии</div></Link>
      {categories.map((category) =>
        <Link to={'/' + category.englishName} className='category'><i className={'icon fas ' + getIcon(category.englishName)}></i><div className='name'>{category.russianName}</div></Link>
      )}
      <Link to='/certificates' className='category'><i className="icon fas fa-percent"></i><div className='name'>Сертификаты</div></Link>
    </div>
  );
};

export default Navbar;
