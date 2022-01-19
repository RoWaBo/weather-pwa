/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const CenterContainer = ({ children }) => {
  const containerStyle = css`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  `;
  return <div css={containerStyle}>{children}</div>;
};

export default CenterContainer;
