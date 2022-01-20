import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */
import PuffLoader from "react-spinners/PuffLoader";

const LoadingSpinner = () => {
  const centerLoader = css`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  return (
    <div css={centerLoader}>
      <PuffLoader size={150} />
    </div>
  );
};

export default LoadingSpinner;
