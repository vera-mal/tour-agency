import React, {useCallback, useEffect, useState} from 'react';
import PageHeading from "../../components/PageHeading";
import ProductComponent from "../../components/ProductComponent";
import LabelCustom from "../../components/LabelCustom";

const History = () => {
  const [error, setError] = useState(null);
  const [content, setContent] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = useCallback(() => {
    fetch('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/1/history')
      .then(res => res.json())
      .then((result) => {
          setContent(result);
          console.log(result);
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
        {content.map((order) =>
          <div className='order-page-item'>
            <LabelCustom text={'Заказ №' + order.id} />
            <div className='order-page-date'>
              {order.date}
            </div>

            {order.order.cartItems.map((item) =>
              item.type === 'tour' ?
              <ProductComponent
                id={item.cartItemId}
                key={item.cartItemId}
                type='history'
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
            )}


            {!!order.order.certificateDiscount &&
              <LabelCustom
                text={'Применен промокод на сумму ' + order.order.certificateDiscount + ' рублей'}
                width="50%"
              />}
            <div>Итого: &#8381;{order.order.totalPrice}</div>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default History;
