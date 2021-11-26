import React, {useEffect, useState} from 'react';
import './FavouritesButton.css'

const FavouritesButton = ({isLikedDefault = false, onSelect = () => {}}) => {
  const [isLiked, setIsLiked] = useState(isLikedDefault);

  useEffect(() => {
    onSelect(isLiked);
  }, [isLiked]);

  return (
    <div className='favourites-button' onClick={() => setIsLiked(!isLiked)}>
      <i className={`${isLiked ? 'fas' : 'far'} fa-heart`}></i>
    </div>
  );
};

export default FavouritesButton;
