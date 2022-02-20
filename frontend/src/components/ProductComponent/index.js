import React, {useState} from 'react';
import './ProductComponent.css'
import IncDec from "../IncDec";
import IncDecGroup from "../IncDecGroup";
import defaultImage from '../../assets/defaultImage.jpg'
import Button from "@mui/material/Button";

const ProductComponent = ({
    id,
    title = 'Название',
    price = 10,
    imageUrl = '',
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
    <div data-testid='product' className={'product-item product-item-' + type}>
      <div className={'product-item-content ' + type}>
        {type === 'catalogue' ? (
            <>
              <img src={imageUrl || defaultImage} alt="" className="product-image"/>
              <div className="product-title">{title}</div>
              <div className="product-date">Ближайшая экскурсия: {date}</div>
              <div className="product-price">&#8381;{price}</div>
            </>
          ) : (
            <>
              <div className='product-item-left'>
                <img src={imageUrl || defaultImage} alt="" className="product-image"/>
                {type === 'favs' || type === 'cart' || type === 'certificate' && !!onDeleteClick ? (
                  <div
                    className='product-item-delete-button'
                  >
                    <Button
                      onClick={(event) => onDeleteClick(event, id)}
                    >
                      Удалить
                    </Button>
                  </div>
                  ) : type === 'certificate' ? !!onAddToCartClick && (
                    <div
                      className='product-item-delete-button'
                    >
                      <Button
                        onClick={(event) => {
                          onAddToCartClick(event, id);
                        }}
                      >
                        Добавить в корзину
                      </Button>
                    </div>
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
