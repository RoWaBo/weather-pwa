import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */
import { MdOutlineLocationOff } from "react-icons/md";

const PopupBox = ({ message }) => {
  const overlay = css`
    position: fixed;
    background: rgba(0, 0, 0, 0.1);
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
    padding: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 20px;
  `;

  const textStyle = css`
    font-size: 20px;
    font-weight: 500;
  `;
  const iconStyle = css`
    font-size: 60px;
    margin-bottom: 2rem;
    color: #3b3c3a;
  `;

  return (
    <div css={overlay}>
      <div css={popup}>
        <MdOutlineLocationOff css={iconStyle} />
        <h1 css={textStyle}>{message}</h1>
      </div>
    </div>
  );
};

export default PopupBox;
