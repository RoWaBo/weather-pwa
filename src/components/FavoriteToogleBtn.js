import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoCheckmarkCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import MessagePopup from "./MessagePopup";

const FavoriteToogleBtn = ({ cityName }) => {
  let favoriteCities = JSON.parse(localStorage.getItem("favoriteCities")) || [];

  const [saveStatus, setSaveStatus] = useState('');

  const [isFavorite, setIsFavorite] = useState(
    favoriteCities.includes(cityName) ? true : false
  );

  const toggleFavoriteToLS = () => {
    if (!favoriteCities.includes(cityName)) {
      favoriteCities.push(cityName);
      setIsFavorite(true);
      setSaveStatus('saved')
    } else {
      favoriteCities = favoriteCities.filter(
        (lsCityName) => lsCityName !== cityName
      );
      setIsFavorite(false);
      setSaveStatus('removed')
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
    
    ${saveStatus !== '' && 'animation: heartBeat 2.5s'}
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
      {saveStatus === 'saved' && (
        <MessagePopup message={`Added to favorites`} icon={<IoCheckmarkCircleOutline />} />
      )}
      {saveStatus === 'removed' && (
        <MessagePopup message={`Removed from favorites`} icon={<IoRemoveCircleOutline />} />
      )}
    </>
  );
};

export default FavoriteToogleBtn;
