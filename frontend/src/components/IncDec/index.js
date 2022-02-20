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
      <button title="button plus title" data-testid='button-plus' onClick={() => setValue(value + 1)} className='button plus'><i className="fas fa-plus" /></button>

      <div title='incdec value title' className='value'>{value}</div>

      <button title='button minus title' onClick={() => {
        if (value > 0) setValue(value - 1)
      }} className='button minus'><i className="fas fa-minus" /></button>
    </div>
  );
};

export default IncDec;
