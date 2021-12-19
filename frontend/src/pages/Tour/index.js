import React, {useCallback, useEffect, useState} from 'react';
import PageHeading from "../../components/PageHeading";
import Spinner from "../../components/Spinner";
import {useParams} from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import FavouritesButton from "../../components/FavouritesButton";
import './Tour.css';
import IncDecGroup from "../../components/IncDecGroup";

const Tour = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [content, setContent] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [id])

  const fetchData = useCallback(() => {
    fetch('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/1/tours' + (id ? '/' + id : ''))
      .then(res => res.json())
      .then((result) => {
          setContent(result);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        })
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData])

  const handleLike = (value) => {
    // setIsLoaded(false);
    const requestOptions = {
      method: value ? 'POST' : 'DELETE',
    };
    fetch('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/1/favorite/' + id, requestOptions)
      .then(response => response.json())
      .then((result) => {
          console.log(1, result);
          fetchData();
          // setIsLoaded(true);
        },
        (error) => {
          console.log(1, error);
          fetchData();
          // setIsLoaded(true);
          // setError(error);
        })
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
            </div>            
            <div>
              <div className='tour-page-heading'><PageHeading >{content.name}</PageHeading></div>              
              <div className='tour-description'>{content.description}</div>
              <div className='tour-form-control-flash-box'>  
                <div className='tour-form-control'>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Дата</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Time"
                    >
                      {content.dates.map((date) => <MenuItem>{date}</MenuItem>)}
                    </Select>
                  </FormControl>  
                </div>   
                <div className='tour-time'>{content.time}</div>
              </div>
              <div className='tour-inc-dec'>
                <IncDecGroup prices={content.prices}/>
              </div>
            </div>
            <div className='tour-favourite-button'><FavouritesButton isLikedDefault={content.isLiked} onSelect={handleLike}/></div>
          </div>
        }
      </div>
    </div>
  );
};

export default Tour;