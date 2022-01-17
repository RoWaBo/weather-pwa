import { BiCurrentLocation } from "react-icons/bi";
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

const Header = ({ title }) => {
  const headerStyle = css`
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: "Poppins";
  `;
  const textStyle = css`
    font-size: 20px;
    font-weight: 500;
  `;
  const iconStyle = css`
    font-size: 24px;
  `;

  return (
    <header css={headerStyle}>
      <BiCurrentLocation css={iconStyle} />
      <h1 css={textStyle}>{title}</h1>
      <span css={textStyle}>°C</span>
    </header>
  );
};

export default Header;
