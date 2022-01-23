import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoCheckmarkCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import MessagePopup from "./MessagePopup";

const FavoriteToogleBtn = ({ cityName }) => {
  let favoriteCities = JSON.parse(localStorage.getItem("favoriteCities")) || [];

  const [popupStatus, setPopupStatus] = useState('');

  const [isFavorite, setIsFavorite] = useState(
    favoriteCities.includes(cityName) ? true : false
  );

  const toggleFavoriteToLS = () => {
    if (!favoriteCities.includes(cityName)) {
      favoriteCities.push(cityName);
      setIsFavorite(true);
      setPopupStatus('saved')
    } else {
      favoriteCities = favoriteCities.filter(
        (lsCityName) => lsCityName !== cityName
      );
      setIsFavorite(false);
      setPopupStatus('removed')
    }
    localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
  };

  // === STYLE ===
  const btnStyle = css`
    outline: none;
    border: none;
    padding: 0.5rem;
    background: none;
    position: absolute;
    top: 2.65rem;
    right: 0.3rem;

    & > * {
      pointer-events: none;
    }
  `;
  const iconStyle = css`
    font-size: 2.5rem;
    color: #3b3c3a;
    filter: drop-shadow(3px 3px 5px rgb(0 0 0 / 0.4));
    
    ${popupStatus !== '' && 'animation: heartBeat 2.5s'}
  `;
  return (
    <>
      <button css={btnStyle} onClick={toggleFavoriteToLS}>
        {isFavorite ? (
          <IoMdHeart css={iconStyle} />
        ) : (
          <IoMdHeartEmpty css={iconStyle} />
        )}
      </button>
      {popupStatus === 'saved' && (
        <MessagePopup message={`Added to favorites`} icon={<IoCheckmarkCircleOutline />} />
      )}
      {popupStatus === 'removed' && (
        <MessagePopup message={`Removed from favorites`} icon={<IoRemoveCircleOutline />} />
      )}
    </>
  );
};

export default FavoriteToogleBtn;
