import { formatTemp } from "../helperFunctions";
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

const SmallWeatherInfoItem = ({ title, icon, avgTemp, cityName }) => {
  const sectionStyle = css`
    display: flex;
    align-items: center;
    padding: 2rem 1rem;
    background: rgba(255, 252, 253, 0.5);
    border-radius: 20px;

    animation: fadeInUp 1s;
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
