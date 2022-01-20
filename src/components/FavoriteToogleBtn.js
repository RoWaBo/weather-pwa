import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

const FavoriteToogleBtn = ({ cityName }) => {
  let favoriteCities = JSON.parse(localStorage.getItem("favoriteCities")) || [];

  const [isFavorite, setIsFavorite] = useState(
    favoriteCities.includes(cityName) ? true : false
  );

  const toggleFavoriteToLS = () => {
    if (!favoriteCities.includes(cityName)) {
      favoriteCities.push(cityName);
      setIsFavorite(true);
    } else {
      favoriteCities = favoriteCities.filter(
        (lsCityName) => lsCityName !== cityName
      );
      setIsFavorite(false);
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
  `;
  return (
    <button css={btnStyle} onClick={toggleFavoriteToLS}>
      {isFavorite ? (
        <IoMdHeart css={iconStyle} />
      ) : (
        <IoMdHeartEmpty css={iconStyle} />
      )}
    </button>
  );
};

export default FavoriteToogleBtn;
