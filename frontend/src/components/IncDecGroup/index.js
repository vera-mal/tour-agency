import React, {useEffect, useState} from 'react';
import './IncDecGroup.css'
import IncDec from "../IncDec";

const IncDecGroup = ({
    isReadOnly = false,
    initialValues = {full: 0, seniors: 0, minors: 0},
    prices = {full: 0, seniors: 0, minors: 0},
    onValueChange = () => {}
  }) => {

  const [amount, setAmount] = useState(initialValues);

  const handleChange = (value, type) => {
    setAmount({...amount, [type]: value});
    onValueChange({...amount, [type]: value});
  }

  return (
    <div className='increment-decrement-group'>
      <div className="increment-decrement-group-label">Взрослый</div>
      {isReadOnly ?
        <div className="increment-decrement-group-amount">{amount.full}</div>
        : <IncDec onValueChange={(value) => handleChange(value, 'full')} initialValue={amount.full}/>
      }
      <div className="increment-decrement-group-price">&#8381;{isReadOnly ? prices.full : (prices.full * amount.full)}</div>

      <div className="increment-decrement-group-label">Пенсионер</div>
      {isReadOnly ?
        <div className="increment-decrement-group-amount">{amount.seniors}</div>
        : <IncDec onValueChange={(value) => handleChange(value, 'seniors')} initialValue={amount.seniors}/>
      }
      <div className="increment-decrement-group-price">&#8381;{isReadOnly ? prices.seniors : (prices.seniors * amount.seniors)}</div>

      <div className="increment-decrement-group-label">Ребенок</div>
      {isReadOnly ?
        <div className="increment-decrement-group-amount">{amount.minors}</div>
        : <IncDec onValueChange={(value) => handleChange(value, 'minors')} initialValue={amount.minors}/>
      }
      <div className="increment-decrement-group-price">&#8381;{isReadOnly ? prices.minors : (prices.minors * amount.minors)}</div>
    </div>
  );
};

export default IncDecGroup;
