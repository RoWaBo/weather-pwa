import { IoLocationSharp } from "react-icons/io5";
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

const Header = ({ locationName, country }) => {
  const headerStyle = css`
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;
  const textStyle = css`
    font-size: 20px;
    font-weight: 500;
  `;
  const iconStyle = css`
    font-size: 24px;
    margin-right: 0.3rem;
    color: #3b3c3a;
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
        <IoLocationSharp css={iconStyle} />
        <h1 css={textStyle}>{locationName}</h1>
      </div>
      <span css={textStyle}>°C</span>
    </header>
  );
};

export default Header;
