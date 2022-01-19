/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CenterContainer from "../components/CenterContainer";

const Search = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchInput !== ""
      ? navigate(`/location/${searchInput}`)
      : setErrorMessage("You must enter a city name");
  };

  // === STYLE ===
  const labelStyle = css`
    display: block;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 1rem;
  `;
  const inputStyle = css`
    display: block;
    width: 100%;
    border: none;
    border-radius: 10px;
    outline: none;
    padding: 0.8rem;
    font-size: 14px;
    background: #fffcfd;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;

    &:focus {
      box-shadow: #e0aca3 0px 1px 3px 0px, #e0aca3 0px 0px 0px 1px;
    }
  `;
  const formStyle = css`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
  const submitStyle = css`
    padding: 0.5rem 2rem;
    width: 50%;
    border: 1px solid rgba(59, 60, 58, 0.1);
    border-radius: 10px;
    background: #e0aca3;
    margin: 2rem 0;
    font-size: 20px;
    color: white;
    box-shadow: rgba(50, 50, 93, 0.1) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.2) 0px 3px 7px -3px;
  `;
  const formErrorStyle = css`
    font-size: 15px;
    color: #ff2727;
    margin: 1.5rem 0 0;
  `;
  return (
    <CenterContainer>
      <form onSubmit={handleSubmit} method="post" css={formStyle}>
        <label name="search" id="search" css={labelStyle}>
          Enter a city name
        </label>
        <input
          type="text"
          name="search"
          id="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          css={inputStyle}
          onFocus={() => setErrorMessage(false)}
        />
        {errorMessage && <p css={formErrorStyle}>{errorMessage}</p>}
        <input type="submit" value="Search" css={submitStyle} />
      </form>
    </CenterContainer>
  );
};

export default Search;
