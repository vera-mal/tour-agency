import React, {useState} from 'react';
import './ProductComponent.css'
import image from '../../mocks/image1.png'
import IncDec from "../IncDec";

const ProductComponent = ({
    id = 0,
    title = 'Название',
    price = 10,
    imageUrl = image,
    date = '25.12.21',
    type = 'catalogue',
    categories = [
      {category: 'full', amount: 0, price: 0},
      {category: 'seniors', amount: 0, price: 0},
      {category: 'minors', amount: 0, price: 0}
    ],
    onDeleteClick = () => {},
    onAddToCartClick = () => {}
  }) => {
  // todo: add history and cart types

  const [certificateAmount, setCertificateAmount] = useState(0);

  return (
    <div className='product-item'>
      <div className={'product-item-content ' + type}>
        {type === 'catalogue' ? (
            <>
              <img src={image} alt="" className="product-image"/>
              <div className="product-title">{title}</div>
              <div className="product-date">Ближайшая экскурсия: {date}</div>
              <div className="product-price">&#8381;{price}</div>
            </>
          ) : (
            <>
              <div className='product-item-left'>
                <img src={image} alt="" className="product-image"/>
                {type === 'favs' ?
                  <button onClick={(event) => onDeleteClick(event, id)} className='product-item-delete-button'>Удалить</button>
                  : type === 'certificate' && !!certificateAmount && (
                    <button
                      onClick={(event) => {
                        onAddToCartClick(event, id, certificateAmount);
                        setCertificateAmount(0);
                      }}
                      className='product-item-delete-button'
                    >
                      Добавить в корзину
                    </button>
                  )
                }
              </div>
              <div className='product-item-text'>
                <div className="product-title">{title}</div>
                {type === 'certificate' || type === 'history' ?
                  <>
                    {type === 'certificate' &&
                      <div className="product-item-inc-dec">
                        <div className="product-item-label">Количество</div>
                        <IncDec onValueChange={setCertificateAmount} initialValue={certificateAmount}/>
                      </div>
                    }
                    {!!certificateAmount && <div className="product-price">Итого: &#8381;{price * certificateAmount}</div>}
                  </>
                  : <div className="product-price">&#8381;{price}</div>
                }
              </div>
            </>
        )}
      </div>
    </div>
  );
};

export default ProductComponent;
