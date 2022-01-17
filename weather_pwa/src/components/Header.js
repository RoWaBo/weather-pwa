import { BiCurrentLocation } from "react-icons/bi";
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

const Header = ({ locationName, country }) => {
  const headerStyle = css`
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #3b3c3a;
  `;
  const textStyle = css`
    font-size: 20px;
    font-weight: 500;
  `;
  const iconStyle = css`
    font-size: 24px;
    margin-right: 0.3rem;
  `;
  const containerStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  return (
    <header css={headerStyle}>
      <span css={textStyle}>{country}</span>
      <div css={containerStyle}>
        <BiCurrentLocation css={iconStyle} />
        <h1 css={textStyle}>{locationName}</h1>
      </div>
      <span css={textStyle}>°C</span>
    </header>
  );
};

export default Header;
