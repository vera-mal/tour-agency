import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import PageHeading from "../../components/PageHeading";
import Spinner from "../../components/Spinner";
import ProductComponent from "../../components/ProductComponent";
import LabelCustom from "../../components/LabelCustom";
import './Cart.css'

const Cart = (props) => {
  const [error, setError] = useState(null);
  const [content, setContent] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [code, setCode] = useState('');

  const fetchData = useCallback(() => {
    fetch('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/1/cart')
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
  }, [fetchData]);

  const handleDelete = (cartItemId) => {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');

    const requestOptions = {
      method: 'DELETE',
      headers: headers
    };
    fetch('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/1/cart/' + cartItemId, requestOptions)
      .then(response => response.json())
      .then((result) => {
          setContent(content.cartItems.filter(product => product.cartItemId !== cartItemId));
          fetchData();
        },
        (error) => {
          fetchData();
        })
  };

  const handleValueChange = (cartItemId, value) => {
    const requestOptions = {
      method: 'PUT',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ ...value, cartItemId })
    };

    fetch('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/1/cart', requestOptions)
      .then(response => response.json())
      .then((result) => {
          setContent({...content, totalPrice: result.totalPrice})
        },
        (error) => {
        })
  };

  const handleSubmit = () => {
    const requestOptions = {
      method: 'POST',
    };

    fetch('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/1/cart/submit', requestOptions)
      .then(response => response.json())
      .then((result) => {
        console.log('code', result)
        setContent(null)
        },
        (error) => {
        })
  };

  const applyCode = () => {
    const requestOptions = {
      method: 'PUT',
    };

    fetch('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/1/cart/promocode/' + code, requestOptions)
      .then(response => response.json())
      .then((result) => {
        setContent({...content, certificateDiscount: result.certificateDiscount, totalPrice: result.totalPrice})
        },
        (error) => {
        })
  };

  return (
    <>
      <PageHeading>Корзина</PageHeading>
      <Spinner isVisible={!isLoaded}/>

      <div className='favourites-page'>
        {isLoaded && !error && (!!content && content.cartItems.length !== 0 ?
          <>
            {content.cartItems.map((item) =>
              item.type === 'tour' ?
                <ProductComponent
                  key={item.cartItemId}
                  id={item.cartItemId}
                  type='cart'
                  title={item.name}
                  date={item.date}
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
            {!content.certificateDiscount ? <div className="cart-page-promocode">
              <input
                className="authorization-form-input cart-page-promocode-input"
                onChange={e => setCode(e.target.value)}
                placeholder="Промокод"
                type="text"
              />
              <button className="cart-page-promocode-button" onClick={applyCode}>Применить</button>
            </div> :
              <LabelCustom text={'Применен промокод на сумму ' + content.certificateDiscount + ' рублей'} width="50%"/>}
            <button onClick={handleSubmit} className="authorization-form-button" type="submit">Оформить заказ</button>
            <div className="cart-total-price">Итого: &#8381;{content.totalPrice}</div>
          </>

          : <LabelCustom text='Здесь пока ничего нет' width="400px"/>)}
      </div>
    </>
  );
};

export default Cart;
