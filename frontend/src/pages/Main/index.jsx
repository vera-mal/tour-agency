import React, {useCallback, useEffect, useState} from 'react';
import Spinner from "../../components/Spinner";
import ProductComponent from "../../components/ProductComponent";
import './Main.css';

const Main = () => {
  const [error, setError] = useState(null);
  const [content, setContent] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = useCallback(() => {
    fetch('https://bellissimo-tour-agency.herokuapp.com/bellissimo/tours')
      .then(res => res.json())
      .then((result) => {
          setContent(result);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        })
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData])

  return (
    <div>
      <Spinner isVisible={!isLoaded}/>

      <div className='main-page'>
        {!error && isLoaded &&
          content.map((certificate) =>
            <ProductComponent
              key={certificate.id}
              type='catalogue'
              title={certificate.name}
              price={certificate.price}
              imageUrl={certificate.images.split(';')[0]}
            />
          )
        }
      </div>
    </div>
  );
};

export default Main;
