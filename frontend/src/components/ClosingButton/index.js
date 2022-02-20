import React from 'react';
import './ClosingButton.css';

const ClosingButton = ({onClick = () => {}}) => {
  return (
    <div className='closing-button'>
      <button title="closing button title" onClick={onClick} className='close-button'><i className="fas fa-times fa-2x" /></button>
    </div>
  );
};

export default ClosingButton;
