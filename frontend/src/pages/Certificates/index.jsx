import React, {useCallback, useEffect, useState} from 'react';
import PageHeading from "../../components/PageHeading";
import Spinner from "../../components/Spinner";
import ProductComponent from "../../components/ProductComponent";
import './Certificates.css'
import {Alert, Snackbar} from "@mui/material";

const Certificates = ({token = null, userId = null}) => {
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [content, setContent] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = useCallback(() => {
    fetch('https://bellissimo-tour-agency.herokuapp.com/bellissimo/certificates')
      .then(res => res.json())
      .then((result) => {
        if (result?.message) {
          setError(result.message);
        } else setContent(result);
        setIsLoaded(true);
        });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData])

  const handleAddToCart = (event, id) => {
    const requestOptions = {
      method: 'POST',
      headers: {"Authorization": "Bearer " + token},
    };

    fetch('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/' + (userId || 1) + '/cart/certificate/' + id + '/1', requestOptions)
      .then(response => response.json())
      .then((response) => setSubmitError(!!response.message));
  };

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
              onAddToCartClick={!!token ? handleAddToCart : null}
            />
          )
        }
      </div>

      <Snackbar open={submitError} autoHideDuration={6000} onClose={() => setSubmitError(false)}>
        <Alert onClose={() => setSubmitError(false)} severity="error" sx={{ width: '100%' }}>
          Ошибка. Пожалуйста, повторите попытку позже
        </Alert>
      </Snackbar>
    </>
  );
};

export default Certificates;
