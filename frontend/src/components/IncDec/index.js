import React, {useState, useEffect} from 'react';
import './IncDec.css';

const IncDec = ({onValueChange = () => {}, initialValue = 0}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    onValueChange(value)
  }, [value]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div className='increment-decrement'>
      <button onClick={() => setValue(value + 1)} className='button plus'><i className="fas fa-plus" /></button>

      <div className='value'>{value}</div>

      <button onClick={() => {
        if (value > 0) setValue(value - 1)
      }} className='button minus'><i className="fas fa-minus" /></button>
    </div>
  );
};

export default IncDec;
