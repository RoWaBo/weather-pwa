import { formatTemp } from "../helperFunctions";
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */
import FavoriteToggleBtn from "../components/FavoriteToogleBtn";

const SmallWeatherInfoItem = ({ title, icon, avgTemp, cityName }) => {
  const sectionStyle = css`
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(59, 60, 58, 0.15);
    padding: 2rem 0;
  `;
  const tempStyle = css`
    font-size: 16px;
    font-weight: 500;
    width: 2.2rem;
    text-align: end;
  `;
  const titleStyle = css`
    font-size: 18px;
    margin-right: auto;
  `;

  return (
    <section css={sectionStyle}>
      <h2 css={titleStyle}>{title}</h2>
      <div
        css={css`
          mask: url(${`./weatherIcons/${icon}.svg`}) no-repeat center;
          width: 20px;
          height: 20px;
          mask-size: contain;
          background: #3b3c3a;
        `}
      ></div>
      <span css={tempStyle}>{formatTemp(avgTemp)}</span>
    </section>
  );
};

export default SmallWeatherInfoItem;
