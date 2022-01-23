import { NavLink } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdHeart, IoMdSearch } from "react-icons/io";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const Navigation = () => {

  const activeLinkStyleIf = isActive => {
    const activeLink = {
      boxShadow: 'inset 6px 6px 10px 0 rgba(0, 0, 0, 0.2), inset -6px -6px 10px 0 rgba(255, 255, 255, 0.5)'
    }

    return isActive ? activeLink : null
  }

  // === STYLING ===
  const navStyle = css`
    position: fixed;
    bottom: 0;
    width: 100vw;
    padding: .6rem 2.5rem;
    background: #fffcfd;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 15px 15px 0 0;
  `;
  const listStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const itemStyle = css`
    font-size: 1.8rem;
  `;
  const linkStyle = css`
    padding: .6rem;
    display: flex;
    transition: 0.25s;

    border-radius: 15px;
    box-shadow: 12px 12px 24px 0 rgba(0, 0, 0, 0.2),
    -12px -12px 24px 0 rgba(255, 255, 255, 0.5);

    & > svg {
      color: #3b3c3a;
    }
  `;

  return (
    <nav css={navStyle}>
      <ul css={listStyle}>
        <li css={itemStyle}>
          <NavLink to="/favorites" css={linkStyle} style={({ isActive }) => activeLinkStyleIf(isActive)}>
            <IoMdHeart />
          </NavLink>
        </li>
        <li css={itemStyle}>
          <NavLink to="/" css={linkStyle} style={({ isActive }) => activeLinkStyleIf(isActive)}>
            <IoLocationSharp />
          </NavLink>
        </li>
        <li css={itemStyle}>
          <NavLink to="/search" css={linkStyle} style={({ isActive }) => activeLinkStyleIf(isActive)}>
            <IoMdSearch />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
