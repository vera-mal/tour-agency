import React, {useEffect, useState} from 'react';
import './FavouritesButton.css'

const FavouritesButton = ({isLikedDefault = false, onSelect = () => {}}) => {
  const [isLiked, setIsLiked] = useState(isLikedDefault);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onSelect(!isLiked);
  }

  return (
    <div className='favourites-button' onClick={handleLike}>
      <i title="favourites button title" className={`${isLiked ? 'fas' : 'far'} fa-heart fa-lg`} />
    </div>
  );
};

export default FavouritesButton;
