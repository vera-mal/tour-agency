import React from 'react';
import './FormBackdrop.css'

const FormBackdrop = ({children}) => {
  return (
    <div className='form-backdrop'>
      {children}
    </div>
  );
};

export default FormBackdrop;
