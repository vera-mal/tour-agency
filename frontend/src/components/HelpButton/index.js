import React from 'react';
import './HelpButton.css';

const HelpButton = ({onClick = () => {}}) => {
  return (
    <div className='helping-button'>
      <button onClick={onClick} className='help-button'><i class="fas fa-exclamation fa-3x"></i></button>
    </div>
  );
};

export default HelpButton;