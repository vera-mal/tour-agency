import React, {useEffect, useState} from 'react';
import './IncDecGroup.css'
import IncDec from "../IncDec";

const IncDecGroup = ({
    isReadOnly = false,
    initialValues = {full: 0, seniors: 0, minors: 0},
    prices = {full: 0, seniors: 0, minors: 0},
    onValueChange = () => {},
    hideAmount = false
  }) => {

  const [amount, setAmount] = useState(initialValues);

  const handleChange = (value, type) => {
    setAmount({...amount, [type]: value});
    onValueChange({...amount, [type]: value}, {ticketCategory: type, quantity: value});
  }

  return (
    <div className='increment-decrement-group'>
      <div className="increment-decrement-group-label">Взрослый</div>
      {isReadOnly ?
        <div
          className={"increment-decrement-group-amount" + (hideAmount ? " increment-decrement-group-amount-hidden" : "")}
        >
          {amount.full}
        </div>
        : <IncDec onValueChange={(value) => handleChange(value, 'full')} initialValue={amount.full}/>
      }
      <div className="increment-decrement-group-price">&#8381;{prices.full}</div>

      <div className="increment-decrement-group-label">Пенсионер</div>
      {isReadOnly ?
        <div
          className={"increment-decrement-group-amount" + (hideAmount ? " increment-decrement-group-amount-hidden" : "")}
        >
          {amount.seniors}
        </div>
        : <IncDec onValueChange={(value) => handleChange(value, 'seniors')} initialValue={amount.seniors}/>
      }
      <div className="increment-decrement-group-price">&#8381;{prices.seniors}</div>

      <div className="increment-decrement-group-label">Ребенок</div>
      {isReadOnly ?
        <div
          className={"increment-decrement-group-amount" + (hideAmount ? " increment-decrement-group-amount-hidden" : "")}
        >
          {amount.minors}
        </div>
        : <IncDec onValueChange={(value) => handleChange(value, 'minors')} initialValue={amount.minors}/>
      }
      <div className="increment-decrement-group-price">&#8381;{prices.minors}</div>
    </div>
  );
};

export default IncDecGroup;
