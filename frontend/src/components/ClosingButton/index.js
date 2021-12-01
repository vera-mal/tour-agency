import React from 'react';
import './ClosingButton.css';

const ClosingButton = ({onClick = () => {}}) => {
  return (
    <div className='closing-button'>
      <button onClick={onClick} className='close-button'><i class="fas fa-times fa-2x"></i></button>
    </div>
  );
};

export default ClosingButton;
