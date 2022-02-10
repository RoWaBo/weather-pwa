import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

const MessagePopup = ({ message, icon }) => {

    const containerStyle = css`
        padding: 1rem;
        border-radius: 20px;
        position: absolute;
        bottom: 15%;
        background: #fffcfd;
        box-shadow: rgba(17, 12, 46, 0.1) 0px 10px 20px 0px;
        display: flex;
        align-items: center;

        animation: fadeInUp 1s, fadeOutDown 1s 4s forwards;

        & > svg {
            font-size: 1.5rem;
            color: #3b3c3a;
        }

    `
    const messageStyle = css`
        font-size: 18px;
        text-align: center;
        margin-left: .5rem;
        margin-top: 0.1rem;
    `

    return (
        <div css={containerStyle}>
            {icon}
            <p css={messageStyle}>{message}</p>
        </div>
    );
}

export default MessagePopup;