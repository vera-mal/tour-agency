import React, {useCallback, useEffect, useState} from 'react';
import PageHeading from "../../components/PageHeading";
import Spinner from "../../components/Spinner";
import ProductComponent from "../../components/ProductComponent";
import LabelCustom from "../../components/LabelCustom";
import './Cart.css'
import moment from 'moment';
import 'moment/locale/ru'
import {Alert} from "@mui/material";
import FormBackdrop from "../../components/FormBackdrop";
import ClosingButton from "../../components/ClosingButton";

const Cart = ({token = null, userId = null}) => {
  const [error, setError] = useState(null);
  const [content, setContent] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [windowValues, setWindowValues] = useState(null);
  const [code, setCode] = useState('');

  const fetchData = useCallback(() => {
    const requestOptions = {
      method: 'GET',
      headers: {"Authorization": "Bearer " + token},
    };

    fetch('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/' + (userId || 1) + '/cart', requestOptions)
      .then(res => res.json())
      .then((result) => {
        if (result?.message) {
          setError(result.message);
        } else setContent(result);
        setIsLoaded(true);
      })
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = (cartItemId) => {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    headers.append('Authorization', 'Bearer ' + token);

    const requestOptions = {
      method: 'DELETE',
      headers: headers
    };
    fetch('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/' + (userId || 1) + '/cart/' + cartItemId, requestOptions)
      .then(response => response.json())
      .then((result) => {
          if (!result?.message)
            setContent({cartItems: content.cartItems.filter(product => product.cartItemId !== cartItemId)});
        });
  };

  const handleValueChange = (cartItemId, value) => {
    const requestOptions = {
      method: 'PUT',
      headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token},
      body: JSON.stringify({ ...value, cartItemId })
    };

    fetch('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/' + (userId || 1) + '/cart', requestOptions)
      .then(response => response.json())
      .then((result) => {
          setContent({...content, totalPrice: result.totalPrice});
        },
        (error) => {})
  };

  const handleSubmit = () => {
    const requestOptions = {
      method: 'POST',
      headers: {"Authorization": "Bearer " + token},
    };

    fetch('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/' + (userId || 1) + '/cart/submit', requestOptions)
      .then(response => response.json())
      .then((result) => {
          console.log(result);
          if (!result?.message) {
            setContent(null);
            setWindowValues(result);
          }
        });
  };

  const applyCode = () => {
    const requestOptions = {
      method: 'PUT',
      headers: {"Authorization": "Bearer " + token},
    };

    fetch('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/' + (userId || 1) + '/cart/promocode/' + code, requestOptions)
      .then(response => response.json())
      .then((result) => {
        setContent({...content, certificateDiscount: result.certificateDiscount, totalPrice: result.totalPrice})
        },
        (error) => {})
  };

  return (
    <>
      <PageHeading>Корзина</PageHeading>
      <Spinner isVisible={!isLoaded}/>

      {!!windowValues && windowValues?.length !== 0 &&
        <FormBackdrop>
          <div className='cart-page-panel'>
            <div className='cart-page-panel-button'>
              <ClosingButton onClick={() => setWindowValues(null)} />
            </div>
            <PageHeading>Промокоды</PageHeading>
            <div className='cart-page-panel-text'>
              {windowValues.map((item, index) =>
                <div key={index}>
                  Промокод на сумму {item.nominal} рублей:{' '}
                  <span className='cart-page-panel-text cart-page-panel-text-blue'>
                    {item.promocode}
                  </span>
                </div>
              )}
            </div>
          </div>
        </FormBackdrop>
      }

      <div className='cart-page'>
        {isLoaded && !error && (!!content && content.cartItems.length !== 0 ?
          <>
            {content.cartItems.map((item) =>
              item.type === 'tour' ?
                <ProductComponent
                  key={item.cartItemId}
                  id={item.cartItemId}
                  type='cart'
                  title={item.name}
                  date={moment(item.date).locale('ru').format('LLL')}    
                  imageUrl={item.linksToImages.split(';')[0]}
                  price={item.fullPrice}
                  amounts={item.items.reduce((acc, curr) => {
                    return {...acc, [curr.ticketCategory]: curr.quantity}
                  }, {})}
                  prices={item.items.reduce((acc, curr) => {
                    return {...acc, [curr.ticketCategory]: curr.price}
                  }, {})}
                  onDeleteClick={() => handleDelete(item.cartItemId)}
                  onAmountChange={(categoriesValues, newValue) => {
                    const sum = Object.values(categoriesValues).reduce((accumulator, currentValue) => {
                      return accumulator + currentValue;
                    }, 0);
                    if (sum > 0) handleValueChange(item.cartItemId, newValue);
                    else handleDelete(item.cartItemId);
                  }}
                />
                :
                <ProductComponent
                  key={item.cartItemId}
                  id={item.cartItemId}
                  title={item.name}
                  type='certificate'
                  imageUrl={item.linksToImages}
                  price={item.fullPrice}
                  onDeleteClick={() => handleDelete(item.cartItemId)}
                />
            )}
            {!content.certificateDiscount ?
              <div className="cart-page-promocode">
                <input
                  className="authorization-form-input cart-page-promocode-input"
                  onChange={e => setCode(e.target.value)}
                  placeholder="Промокод"
                  type="text"
                />
                <button className="cart-page-promocode-button" onClick={applyCode}>Применить</button>
              </div>
              : <>
                  <div className='cart-page-label'>
                    <LabelCustom text={'Применен промокод на сумму ' + content.certificateDiscount + ' рублей'} width="50%"/>
                  </div>
                  {content.certificateDiscount > content.totalPrice &&
                    <Alert severity="warning">
                      Сумма сертификата превышает сумму заказа. Неиспользованная часть сертификата сгорит.
                    </Alert>
                  }
                </>
              }
            <div className="cart-total-price">Сумма заказа: &#8381;{content.totalPrice}</div>
            <button onClick={handleSubmit} className="authorization-form-button" type="submit">Оформить заказ</button>
          </>
          : <LabelCustom text='Корзина пуста' width="400px"/>)}
      </div>
    </>
  );
};

export default Cart;
