/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const MainLayout = ({ children }) => {
  const mainStyle = css`
    width: 100%;
    height: 100vh;
    margin-bottom: 80px;
    max-width: 500px;
    margin: 0 auto;
    background: #ded2d7;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  `;

  return <main css={mainStyle}>{children}</main>;
};

export default MainLayout;
