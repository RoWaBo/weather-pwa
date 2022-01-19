import { formatUnixToDate } from "../helperFunctions";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const CurrentWeather = ({ unixTimestamp, description, temp, icon }) => {
  const date = formatUnixToDate(unixTimestamp);
  const oneHourBehind = `${date.getHours() - 1}:00`;
  const currentTime = `${date.getHours()}:00`;
  const OneHourAhead = `${date.getHours() + 1}:00`;
  const day = date.toLocaleString("en-US", { weekday: "long" });
  const tempNoDecimals = temp.toString().split(".")[0];

  const containerStyle = css`
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    margin-bottom: 4rem;

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
        <span css={passiveTimeStyle}>{OneHourAhead}</span>
      </div>
      <h2 css={descriptionStyle}>
        {day}, {description}
      </h2>
      <span css={tempStyle}>{tempNoDecimals}</span>
      <div
        css={css`
          mask: url(${`./weatherIcons/${icon}.svg`}) no-repeat center;
          /* mask: url(${`./weatherIcons/01d.svg`}) no-repeat center; */
          width: 360px;
          height: 360px;
          mask-size: contain;
          background: #fff;
          margin-top: -233px;
          z-index: -1;
          opacity: 0.6;
        `}
      ></div>
    </div>
  );
};

export default CurrentWeather;
