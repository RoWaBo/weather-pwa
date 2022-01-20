/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const CenterContainer = ({ children }) => {
  const containerStyle = css`
    /* width: 100vw;
    height: 100%; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
  `;
  return <div css={containerStyle}>{children}</div>;
};

export default CenterContainer;
