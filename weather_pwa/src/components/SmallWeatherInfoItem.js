import { formatTemp } from "../helperFunctions";
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

const SmallWeatherInfoItem = ({ title, icon, avgTemp }) => {
  return (
    <section>
      <h2>{title}</h2>
      <div
        css={css`
          mask: url(${`./weatherIcons/${icon}.svg`}) no-repeat center;
          width: 20px;
          height: 20px;
          mask-size: contain;
          background: #3b3c3a;
        `}
      ></div>
      <span>{formatTemp(avgTemp)}</span>
    </section>
  );
};

export default SmallWeatherInfoItem;
