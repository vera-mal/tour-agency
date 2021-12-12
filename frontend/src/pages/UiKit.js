import React, {useEffect, useState} from 'react';
import ClosingButton from '../components/ClosingButton';
import HelpButton from '../components/HelpButton';
import LabelCustom from '../components/LabelCustom';
import IncDec from '../components/IncDec'
import ProductComponent from "../components/ProductComponent";

const UiKit = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log(value)
  }, [value]);

  return (
    <div>
      <IncDec onValueChange={setValue} initialValue={value}/>
      <ClosingButton/>
      <HelpButton/>
      <LabelCustom text='Вы успешно зарегистрированы, можете авторизоваться' width="400px"/>
      <ProductComponent />
      <ProductComponent type='favs'/>
      <ProductComponent type='certificate'/>
    </div>
  );
};

export default UiKit;
