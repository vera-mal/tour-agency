import React, {useState} from 'react';
import './ProductComponent.css'
import image from '../../mocks/image1.png'
import IncDec from "../IncDec";
import IncDecGroup from "../IncDecGroup";

const ProductComponent = ({
    id,
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
    prices = {full: 1000, seniors: 500, minors: 500},
    amounts = {full: 1, seniors: 0, minors: 2},
    onAmountChange = null,
    onDeleteClick = null,
    onAddToCartClick = null
  }) => {

  return (
    <div className={'product-item product-item-' + type}>
      <div className={'product-item-content ' + type}>
        {type === 'catalogue' ? (
            <>
              <img src={imageUrl} alt="" className="product-image"/>
              <div className="product-title">{title}</div>
              <div className="product-date">Ближайшая экскурсия: {date}</div>
              <div className="product-price">&#8381;{price}</div>
            </>
          ) : (
            <>
              <div className='product-item-left'>
                <img src={imageUrl} alt="" className="product-image"/>
                {type === 'favs' || type === 'cart' || type === 'certificate' && !!onDeleteClick ? (
                    <button
                      onClick={(event) => onDeleteClick(event, id)}
                      className='product-item-delete-button'
                    >
                      Удалить
                    </button>
                  ) : type === 'certificate' ? !!onAddToCartClick && (
                    <button
                      onClick={(event) => {
                        onAddToCartClick(event, id);
                      }}
                      className='product-item-delete-button'
                    >
                      Добавить в корзину
                    </button>
                ) : <>

                </>
                }
              </div>
              <div className='product-item-text'>
                <div className="product-title">{title}</div>
                {type === 'certificate' || type === 'history' || type === 'cart' ?
                  <>
                    {type === 'history' ?
                      <>
                        <div className="product-date product-date-no-indent">{date}</div>
                        <div className="product-item-inc-dec-group">
                          <IncDecGroup isReadOnly prices={prices} initialValues={amounts}/>
                        </div>
                        <div className="product-price">Итого: &#8381;{price}</div>
                      </> : type === 'cart' &&
                        <>
                          <div className="product-date product-date-no-indent">{date}</div>
                          <div className="product-item-inc-dec-group">
                            <IncDecGroup prices={prices} initialValues={amounts} onValueChange={onAmountChange}/>
                          </div>
                          <div className="product-price">Итого: &#8381;{price}</div>
                        </>
                    }
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
