import { formatUnixToDate } from "../helperFunctions";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const ForecastList = ({ forecastArray }) => {
  const listContainerStyle = css`
    margin: 2rem 1rem;
  `;
  const listItemStyle = css`
    display: flex;
    margin-bottom: 0.5rem;
  `;
  const timeStyle = css`
    font-size: 14px;
    font-weight: 500;
    flex: 1;
  `;
  const iconStyle = css`
    flex: 1;
    max-width: 24px;

    & > img {
      color: #3b3c3a;
    }
  `;
  const tempContainerStyle = css`
    flex: 1;
    display: flex;
    justify-content: flex-end;

    font-size: 14px;
    font-weight: 500;
  `;
  const maxTempStyle = css`
    width: 1.8rem;
  `;
  const minTempStyle = css`
    width: 1.8rem;
    text-align: end;
    color: rgba(59, 60, 58, 0.5);
  `;

  return (
    <ul css={listContainerStyle}>
      {forecastArray.map(
        (forecast, index) =>
          index !== 0 && (
            <li key={forecast.dt} css={listItemStyle}>
              <h2 css={timeStyle}>
                {formatUnixToDate(forecast.dt).toLocaleString("en-US", {
                  weekday: "long",
                })}
              </h2>
              <div css={iconStyle}>
                <img
                  src={`./weatherIcons/${forecast.weather[0].icon}.svg`}
                  alt="weather icon"
                />
              </div>
              <div css={tempContainerStyle}>
                <span css={maxTempStyle}>
                  {forecast.temp.max.toString().split(".")[0] + "°"}
                </span>
                <span css={minTempStyle}>
                  {forecast.temp.min.toString().split(".")[0] + "°"}
                </span>
              </div>
            </li>
          )
      )}
    </ul>
  );
};

export default ForecastList;
