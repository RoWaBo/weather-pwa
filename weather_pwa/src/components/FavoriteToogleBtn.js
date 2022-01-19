import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

const FavoriteToogleBtn = ({ cityName }) => {
  const getLsFavoriteCities = JSON.parse(
    localStorage.getItem("favoriteCities")
  );
  let favoriteCities = getLsFavoriteCities ? getLsFavoriteCities : [];

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
    top: 3.3rem;
    right: 0.5rem;

    & > * {
      pointer-events: none;
    }
  `;
  const iconStyle = css`
    font-size: 2.5rem;
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
