import React from 'react';
import PageHeading from "../../components/PageHeading";
import {favsMock1} from '../../mocks/favsMock'
import ProductComponent from "../../components/ProductComponent";
import './Favourites.css'
import LabelCustom from "../../components/LabelCustom";

const Favourites = () => {
  return (
    <>
      <PageHeading>Избранное</PageHeading>

      <div className='favourites-page'>
        {favsMock1 && favsMock1.length !== 0 ?
          favsMock1.map((item) =>
            <ProductComponent
              key={item.id}
              id={item.id}
              type='favs'
              imageUrl={item.imagePath}
              price={item.price}
              onDeleteClick={(event, id) => console.log('Убрать элемент ' + id + ' из избранного')}
            />
          )
        : <LabelCustom text='Здесь пока ничего нет' width="400px"/>}
      </div>
    </>
  );
};

export default Favourites;
