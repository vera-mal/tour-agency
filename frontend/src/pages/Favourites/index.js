import React, {useCallback, useEffect, useState} from 'react';
import PageHeading from "../../components/PageHeading";
import ProductComponent from "../../components/ProductComponent";
import './Favourites.css'
import LabelCustom from "../../components/LabelCustom";
import Spinner from "../../components/Spinner";

const Favourites = () => {
  const [error, setError] = useState(null);
  const [content, setContent] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = useCallback(() => {
    fetch('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/1/favorite')
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

  const handleDelete = (id) => {
    setIsLoaded(false);
    let formData = new FormData();
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');

    const requestOptions = {
      method: 'DELETE',
      // mode: 'no-cors',
      // formData
      headers: headers
    };
    fetch('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/1/favorite/' + id, requestOptions)
      .then(response => response.json())
      .then((result) => {
          console.log(1, result);
          // fetchData();
          setIsLoaded(true);
        },
        (error) => {
          console.log(1, error);
          // fetchData();
          setIsLoaded(true);
          // setError(error);
        })
  };

  return (
    <>
      <PageHeading>Избранное</PageHeading>
      <Spinner isVisible={!isLoaded}/>

      <div className='favourites-page'>
        {isLoaded && !error && content.length !== 0 ?
          content.map((item) =>
            <ProductComponent
              key={item.id}
              id={item.id}
              type='favs'
              title={item.name}
              imageUrl={item.images.split(';')[0]}
              price={item.price}
              onDeleteClick={() => handleDelete(item.id)}
            />
          )
        : <LabelCustom text='Здесь пока ничего нет' width="400px"/>}
      </div>
    </>
  );
};

export default Favourites;
