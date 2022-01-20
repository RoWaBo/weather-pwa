import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */
import LoadingSpinner from "../components/LoadingSpinner";
import CenterContainer from "../components/CenterContainer";
import { ImHeartBroken } from "react-icons/im";

const Favorites = () => {
  const [weather, setWeather] = useState();
  const navigate = useNavigate();
  const [favoriteCities, setFavoriteCities] = useState(
    JSON.parse(localStorage.getItem("favoriteCities")) || []
  );

  useEffect(() => {
    if (favoriteCities.length > 0) {
      let cityWeather = [];
      favoriteCities.forEach(async (cityName) => {
        try {
          const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
          const { data } = await axios(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
          );
          cityWeather.push(data);
        } catch (err) {
          navigate("/Fallback");
        }
      });
      setWeather(cityWeather, favoriteCities);
    }
  }, [navigate]);

  // === STYLE ===
  const headingStyle = css`
    font-size: 20px;
    text-align: center;
  `;
  const headerStyle = css`
    padding: 1rem;
  `;
  const errorMessageStyle = css`
    font-size: 20px;
  `;
  const errorIconStyle = css`
    font-size: 60px;
    margin-bottom: 2rem;
    color: #3b3c3a;
  `;

  return (
    <>
      <header css={headerStyle}>
        <h1 css={headingStyle}>Your favorites</h1>
      </header>
      {weather && <ul>{}</ul>}
      {!weather && favoriteCities && <LoadingSpinner />}
      {favoriteCities.length === 0 && (
        <CenterContainer>
          <ImHeartBroken css={errorIconStyle} />
          <h2 css={errorMessageStyle}>You have no favorites</h2>
        </CenterContainer>
      )}
    </>
  );
};

export default Favorites;
