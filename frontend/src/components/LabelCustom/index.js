import React from 'react';
import './LabelCustom.css';

const LabelCustom = ({text = "", width = "252px"}) => {
  return (
    <div title="custom label title" className='label-custom' style={{width: width}}>{text}</div>
  );
};

export default LabelCustom;
