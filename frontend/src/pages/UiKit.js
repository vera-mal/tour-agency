import React, {useEffect, useState} from 'react';
import IncDec from '../components/IncDec'

const UiKit = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log(value)
  }, [value]);

  return (
    <div>
      <IncDec onValueChange={setValue} initialValue={value}/>
    </div>
  );
};

export default UiKit;
