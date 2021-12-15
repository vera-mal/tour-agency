import React, {useCallback, useEffect, useState} from 'react';
import Spinner from "../../components/Spinner";
import ProductComponent from "../../components/ProductComponent";
import './Main.css';
import { Link, useParams } from "react-router-dom";

const Main = () => {
  const { alias } = useParams();
  const [error, setError] = useState(null);
  const [content, setContent] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [alias])

  const fetchData = useCallback(() => {
    fetch('https://bellissimo-tour-agency.herokuapp.com/bellissimo/tours' + (alias ? '/' + alias : ''))
      .then(res => res.json())
      .then((result) => {
          setContent(result);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        })
  }, [alias]);

  useEffect(() => {
    fetchData();
  }, [fetchData])

  return (
    <div>
      <Spinner isVisible={!isLoaded}/>

      <div className='main-page'>
        {!error && isLoaded &&
          content.map((tour) =>
            <Link to={'/tour/' + tour.id} key={tour.id}>
              <ProductComponent
                type='catalogue'
                title={tour.name}
                price={tour.price}
                imageUrl={tour.images.split(';')[0]}
              />
            </Link>
          )
        }
      </div>
    </div>
  );
};

export default Main;
