import React from 'react';
import './HelpButton.css';
import {Link} from "react-router-dom";

const HelpButton = () => {
  return (
    <Link to='/help' className='helping-button'>
      <div title="help button title" className='help-button'><i className="fas fa-exclamation fa-3x" /></div>
    </Link>
  );
};

export default HelpButton;