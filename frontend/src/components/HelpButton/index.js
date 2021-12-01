import React from 'react';
import './HelpButton.css';
import {Link} from "react-router-dom";

const HelpButton = () => {
  return (
    <Link to='/help' className='helping-button'>
      <div className='help-button'><i class="fas fa-exclamation fa-3x" /></div>
    </Link>
  );
};

export default HelpButton;