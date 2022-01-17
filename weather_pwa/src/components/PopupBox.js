import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

const PopupBox = ({ message }) => {
  const overlay = css`
    position: fixed;
    background: rgba(0, 0, 0, 0.2);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  `;
  const popup = css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 80%;
    height: 50%;
    background-color: white;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 20px;
  `;

  return (
    <div css={overlay}>
      <div css={popup}>
        <h1>{message}</h1>
      </div>
    </div>
  );
};

export default PopupBox;
