import React from 'react';
import './LabelCustom.css';

const LabelCustom = ({text = "", width = "252px"}) => {
  return (
    <div className='label-custom' style={{width: width}}>{text}</div>
  );
};

export default LabelCustom;
