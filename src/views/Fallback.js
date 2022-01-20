import CenterContainer from "../components/CenterContainer";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { VscDebugDisconnect } from "react-icons/vsc";

const errorMessageStyle = css`
  font-size: 20px;
`;
const iconStyle = css`
  font-size: 60px;
  margin-bottom: 2rem;
  color: #3b3c3a;
`;

const Fallback = () => {
  return (
    <CenterContainer>
      <VscDebugDisconnect css={iconStyle} />
      <h1 css={errorMessageStyle}>Ops... something went wrong</h1>
    </CenterContainer>
  );
};

export default Fallback;
