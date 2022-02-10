import { formatUnixToDate } from "../helperFunctions";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import FavoriteToogleBtn from "./FavoriteToogleBtn";

const CurrentWeather = ({
  unixTimestamp,
  description,
  temp,
  icon,
  includeFavoriteBtn,
  cityName,
}) => {
  const date = formatUnixToDate(unixTimestamp);
  const oneHourBehind = `${date.getHours() - 1}:00`;
  const currentTime = `${date.getHours()}:00`;
  const oneHourAhead = `${date.getHours() + 1}:00`;
  const day = date.toLocaleString("en-US", { weekday: "long" });
  const tempRounded = Math.round(temp);

  const animationPicker = (icon) => {
    switch (icon) {
      case '01d': return 'rollIn 1s .5s backwards'
      case '01n': return 'rollIn 1s .5s backwards'
      case '09d': return 'shakeY 2s .5s'
      case '09n': return 'shakeY 2s .5s'
      case '10d': return 'headShake 3s .5s'
      case '10n': return 'headShake 3s .5s'
      case '11d': return 'tada 2s .5s'
      case '11n': return 'tada 2s .5s'
      case '13d': return 'rotateIn 1s .5s'
      case '13n': return 'rotateIn 1s .5s'
      default: return 'fadeInRight 1s';
    }
  }

  // === STYLING ===
  const containerStyle = css`
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;

    animation: fadeIn 1s;
  `;
  const tempStyle = css`
    font-weight: 500;
    font-size: 72px;
    text-shadow: 1px 2px 8px rgba(0, 0, 0, 0.1);
  `;
  const activeTimeStyle = css`
    color: #3b3c3a;
  `;
  const passiveTimeStyle = css`
    color: rgba(59, 60, 58, 0.5);
  `;
  const timeContainerStyle = css`
    width: 100%;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5rem;

    font-weight: 500;
    font-size: 14px;
  `;
  const descriptionStyle = css`
    font-weight: 500;
    font-size: 22px;
    margin-bottom: 0.5rem;
    text-shadow: 1px 2px 8px rgba(0, 0, 0, 0.1);
  `;
  return (
    <div css={containerStyle}>
      <div css={timeContainerStyle}>
        <span css={passiveTimeStyle}>{oneHourBehind}</span>
        <span css={activeTimeStyle}>{currentTime}</span>
        <span css={passiveTimeStyle}>{oneHourAhead}</span>
      </div>
      {includeFavoriteBtn && <FavoriteToogleBtn cityName={cityName} />}
      <h2 css={descriptionStyle}>
        {day}, {description}
      </h2>
      <span css={tempStyle}>{tempRounded}</span>
      <div
        css={css`
          mask: url(${`./weatherIcons/${icon}.svg`}) no-repeat center;
          width: 360px;
          height: 360px;
          mask-size: contain;
          background: rgba(255, 255, 255, .6);
          margin-top: -233px;
          z-index: -1;
          animation: ${animationPicker(icon)};
        `}
      ></div>
    </div>
  );
};

export default CurrentWeather;
