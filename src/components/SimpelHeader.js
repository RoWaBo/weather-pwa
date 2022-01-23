import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

const SimpelHeader = ({ heading, icon }) => {

  const headerStyle = css`
    padding: 1.5rem 1rem 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    animation: fadeIn 1s;

    & > svg {
        font-size: 24px;
        margin-right: 0.3rem;
        color: #3b3c3a;    
    }
  `;
  const headingStyle = css`
    font-size: 20px;
    font-weight: 500;
    text-transform: capitalize;
    margin-left: 0.3rem;

  `;

  return (
    <header css={headerStyle}>
      {icon}
      <h1 css={headingStyle}>{heading}</h1>
    </header>
  );
}

export default SimpelHeader;