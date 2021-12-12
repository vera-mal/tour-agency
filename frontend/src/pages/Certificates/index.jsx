import React, {useCallback, useEffect, useState} from 'react';
import PageHeading from "../../components/PageHeading";
import Spinner from "../../components/Spinner";
import ProductComponent from "../../components/ProductComponent";
import './Certificates.css'

const Certificates = () => {
  const [error, setError] = useState(null);
  const [content, setContent] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = useCallback(() => {
    fetch('https://bellissimo-tour-agency.herokuapp.com/bellissimo/certificates')
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
    <>
      <PageHeading>Сертификаты</PageHeading>
      <Spinner isVisible={!isLoaded}/>

      <div className='certificates-page'>
        {!error && isLoaded &&
          content.map((certificate) =>
            <ProductComponent
              key={certificate.id}
              id={certificate.id}
              type='certificate'
              title={'Сертификат на сумму '+ certificate.price + ' рублей'}
              price={certificate.price}
              imageUrl={certificate.imagePath}
              onAddToCartClick={(event, id, certificateAmount) => {
                console.log('Добавить в корзину сертификат с id ' + id + ', ' + certificateAmount + ' шт.')
              }}
            />
          )
        }
      </div>
    </>
  );
};

export default Certificates;
