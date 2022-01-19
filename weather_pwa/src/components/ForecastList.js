import { formatUnixToDate } from "../helperFunctions";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const ForecastList = ({ forecastArray }) => {
  const formatTemp = (temp) => temp.toString().split(".")[0] + "°";

  const ifPlusTempAddPadding = (temp) => {
    if (!temp.toString().includes("-"))
      return css`
        padding-left: 0.55rem;
      `;
  };

  // === STYLE ===
  const listContainerStyle = css`
    margin: 2rem 1rem;
  `;
  const listItemStyle = css`
    display: flex;
    /* margin-bottom: 0.5rem; */
  `;
  const timeStyle = css`
    font-size: 14px;
    font-weight: 500;
    flex: 1;
  `;
  const tempContainerStyle = css`
    flex: 1;
    display: flex;
    justify-content: flex-end;

    font-size: 14px;
    font-weight: 500;
  `;
  const maxTempStyle = css`
    width: 1.9rem;
  `;
  const minTempStyle = css`
    width: 1.9rem;
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
              <div
                css={css`
                  flex: 1;
                  mask: url(${`./weatherIcons/${forecast.weather[0].icon}.svg`})
                    no-repeat center;
                  width: 20px;
                  height: 20px;
                  mask-size: contain;
                  background: #3b3c3a;
                `}
              ></div>
              <div css={tempContainerStyle}>
                <span
                  css={[maxTempStyle, ifPlusTempAddPadding(forecast.temp.max)]}
                >
                  {formatTemp(forecast.temp.max)}
                </span>
                <span css={minTempStyle}>{formatTemp(forecast.temp.min)}</span>
              </div>
            </li>
          )
      )}
    </ul>
  );
};

export default ForecastList;
