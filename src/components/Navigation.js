import { NavLink } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdHeart, IoMdSearch } from "react-icons/io";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const Navigation = () => {

  const activeLinkStyleIf = isActive => {
    const activeLink = {
      boxShadow: 'inset 20px 20px 60px rgba(0, 0, 0, .07), inset -20px -20px 60px #fffcfd'
    }

    return isActive ? activeLink : null
  }

  // === STYLING ===
  const navStyle = css`
    position: fixed;
    bottom: 0;
    width: 100vw;
    padding: .5rem 2rem;
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
  /* padding: 1rem 2rem; */
    padding: .5rem;
    display: flex;
    border-radius: 50%;
    background: #FFF;
    transition: 0.25s;
    box-shadow: 20px 20px 60px rgba(0, 0, 0, .3), -20px -20px 60px #fffcfd;

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
