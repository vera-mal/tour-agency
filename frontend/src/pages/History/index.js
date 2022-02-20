import React, {useCallback, useEffect, useState} from 'react';
import PageHeading from "../../components/PageHeading";
import ProductComponent from "../../components/ProductComponent";
import LabelCustom from "../../components/LabelCustom";
import './History.css';
import moment from 'moment';
import 'moment/locale/ru'

const History = ({token = null, userId = null}) => {
  const [error, setError] = useState(null);
  const [content, setContent] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = useCallback(() => {
    const requestOptions = {
      method: 'GET',
      headers: {"Authorization": "Bearer " + token},
    };

    fetch('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/' + (userId || 1) + '/history', requestOptions)
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

  return (
    <div>
      <PageHeading>История</PageHeading>

      <div className='history-page'>
      {isLoaded && !error && (content.length !== 0 ?
        content.map((order, id) =>
          <div key={id} className='history-page-flex-box'>
            <div className='history-page-label'><LabelCustom text={'Заказ №' + order.id} /></div>
            <div className='history-page-date'>
              {moment(order.date).locale('ru').format('LLL')}
            </div>

            <div>{order.order.cartItems.map((item) =>
              item.type === 'tour' ?
              <ProductComponent
                id={item.cartItemId}
                key={item.cartItemId}
                type='history'
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
              />
                :
                <ProductComponent
                  key={item.cartItemId}
                  id={item.cartItemId}
                  title={item.name}
                  type='certificate'
                  imageUrl={item.linksToImages}
                  price={item.fullPrice}
                />
            )}</div>

            <div>{!!order.order.certificateDiscount &&
              <LabelCustom
                text={'Применен промокод на сумму ' + order.order.certificateDiscount + ' рублей'}
                width="50%"
              />}</div>

            <div className='history-page-total-price'>Сумма заказа: &#8381;{order.order.totalPrice}</div>
          </div>
        )
      : <div className='history-page-label'><LabelCustom text='История заказов пуста' width="400px"/></div>)}
      </div>      
    </div>
  );
};

export default History;
