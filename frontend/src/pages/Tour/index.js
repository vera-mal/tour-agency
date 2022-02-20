import React, {useCallback, useEffect, useState} from 'react';
import PageHeading from "../../components/PageHeading";
import Spinner from "../../components/Spinner";
import {useParams} from "react-router-dom";
import {FormControl, InputLabel, Select, MenuItem, Alert} from '@mui/material';
import FavouritesButton from "../../components/FavouritesButton";
import './Tour.css';
import IncDecGroup from "../../components/IncDecGroup";
import moment from "moment";
import Button from "@mui/material/Button";

const totalPrice = (values, prices = { full: 1, minor: 1, senior: 1 }) => Object.values(values).reduce((accumulator, currentValue, index) => {
  return accumulator + currentValue * Object.values(prices)[index];
}, 0)

const Tour = ({token = null, userId = null}) => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState(false);
  const [content, setContent] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [values, setValues] = useState(null);
  const [selectedDate, setDate] = useState('');

  useEffect(() => {
    setIsLoaded(false);
  }, [id]);

  const fetchData = useCallback(() => {
    fetch('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/' + (userId || 1) + '/tours' + (id ? '/' + id : ''))
      .then(res => res.json())
      .then((result) => {
          if (result?.message) {
            setError(result.message);
          } else {
            setContent(result);
            setValues(null);
          }

          setIsLoaded(true);
        });
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLike = (value) => {
    const requestOptions = {
      method: value ? 'POST' : 'DELETE',
      headers: {"Authorization": "Bearer " + token},
    };
    fetch('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/' + (userId || 1) + '/favorite/' + id, requestOptions)
      .then(response => response.json())
      .then((result) => {
        if (!result?.message) setContent({...content, isLiked: !content.isLiked});
      });
  };

  const handleValueChange = (value) => {
    setValues(value);
  };

  const handleDate = (event) => {
    setDate(event.target.value)
  };

  const handleAddToCart = () => {
    if (totalPrice(values) <= content.dates.find(({date}) => date === selectedDate).ticketAmount) {
      setSubmitError(false);
      const requestOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token},
        body: JSON.stringify({tourId: id, date: selectedDate, amounts: values})
      };

      fetch('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/' + (userId || 1) + '/cart', requestOptions)
        .then(response => response.json())
        .then((result) => {
            setValues(null);
            setDate('');
          },
          (error) => {
          })
    } else setSubmitError(true);
  };

  return (
    <div>
      <Spinner isVisible={!isLoaded}/>
      <div className='tour-page'>
        {!error && isLoaded &&
          <div className='tour-flash-box'>
            <div className='tour-images'>
              <img src={content.imagesPath.split(';')[0]} alt="" className="tour-image"/>
              <img src={content.imagesPath.split(';')[1]} alt="" className="tour-image"/>
              {submitError &&
                <Alert severity="warning">
                  Пожалуйста, выберите другое количество билетов
                </Alert>
              }
            </div>            
            <div>
              <div className='tour-page-heading'><PageHeading >{content.name}</PageHeading></div>              
              <div className='tour-description'>{content.description}</div>
              <div className='tour-form-control-flash-box'>  
                <div className='tour-form-control'>
                  <FormControl variant='standard' fullWidth>
                    <InputLabel id="demo-simple-select-label">Дата</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Time"
                      value={selectedDate}
                      onChange={handleDate}
                    >
                      {content.dates.map(({date}, id) => <MenuItem key={id} value={date}>{date}</MenuItem>)}
                    </Select>
                  </FormControl>  
                </div>   
                <div className='tour-time'>{moment(content.time, 'HH:mm:ss').format('HH:mm')}</div>
              </div>
              <div className='tour-inc-dec'>
                <IncDecGroup
                  key={!!values}
                  isReadOnly={!token}
                  hideAmount={!token}
                  prices={content.prices}
                  onValueChange={handleValueChange}
                />
              </div>
              {!!values && Object.values(values).some((elem) => elem > 0) &&
                <div className='tour-sum'>
                  Итого: {totalPrice(values, content.prices)}
                </div>
              }
                <div className='tour-add-button'>
                  <Button
                    disabled={!token || !selectedDate || !values || !Object.values(values).some((elem) => elem > 0)}
                    onClick={handleAddToCart}
                    data-testid='add-button'
                  >
                    <i className="fas fa-shopping-cart"/>
                    Добавить в корзину
                  </Button>
                </div>
            </div>

            {!!token &&
              <div className='tour-favourite-button'>
                <FavouritesButton isLikedDefault={content.isLiked} onSelect={handleLike}/>
              </div>
            }
          </div>
        }
      </div>
    </div>
  );
};

export default Tour;
