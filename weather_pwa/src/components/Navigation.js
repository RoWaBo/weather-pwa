import { Link } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdHeart, IoMdSearch } from "react-icons/io";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const Navigation = () => {
  const navStyle = css`
    position: fixed;
    bottom: 0;
    width: 100vw;
    background: #fffcfd;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 20px 20px 0 0;
  `;
  const listStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const itemStyle = css`
    font-size: 1.5rem;
  `;
  const linkStyle = css`
    padding: 1rem 2rem;
    display: flex;

    & > svg {
      color: #3b3c3a;
    }
  `;

  return (
    <nav css={navStyle}>
      <ul css={listStyle}>
        <li css={itemStyle}>
          <Link to="/favorites" css={linkStyle}>
            <IoMdHeart />
          </Link>
        </li>
        <li css={itemStyle}>
          <Link to="/" css={linkStyle}>
            <IoLocationSharp />
          </Link>
        </li>
        <li css={itemStyle}>
          <Link to="/search/searching" css={linkStyle}>
            <IoMdSearch />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
