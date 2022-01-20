/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const MainLayout = ({ children }) => {
  const mainStyle = css`
    margin-bottom: 80px;
  `;

  return <main css={mainStyle}>{children}</main>;
};

export default MainLayout;
