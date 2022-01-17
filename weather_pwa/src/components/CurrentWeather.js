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

  const mainStyle = css`
    margin: 2rem auto;
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
    color: #aaa3b2;
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
  const iconStyle = css`
    margin-top: -233px;
    z-index: -1;
    opacity: 0.5;
  `;

  return (
    <main css={mainStyle}>
      <div css={timeContainerStyle}>
        <span css={passiveTimeStyle}>{oneHourBehind}</span>
        <span css={activeTimeStyle}>{currentTime}</span>
        <span css={passiveTimeStyle}>{OneHourAhead}</span>
      </div>
      <h2 css={descriptionStyle}>
        {day}, {description}
      </h2>
      <span css={tempStyle}>{tempNoDecimals}</span>
      <img
        css={iconStyle}
        src={`./weatherIcons/${icon}.svg`}
        // src={`./weatherIcons/01d.svg`}
        alt={`${description} weather icon`}
      />
    </main>
  );
};

export default CurrentWeather;
