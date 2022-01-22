import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */
import LoadingSpinner from "../components/LoadingSpinner";
import CenterContainer from "../components/CenterContainer";
import { ImHeartBroken } from "react-icons/im";
import SmallWeatherInfoItem from "../components/SmallWeatherInfoItem";
import SimpelHeader from "../components/SimpelHeader";
import { IoMdHeart } from "react-icons/io";


const Favorites = () => {
  const [weather, setWeather] = useState();
  const navigate = useNavigate();
  const [favoriteCities] = useState(
    JSON.parse(localStorage.getItem("favoriteCities")) || []
  );

  useEffect(() => {
    if (favoriteCities.length > 0) {
      const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

      axios
        .all(
          favoriteCities.map((cityName) => {
            return axios.get(
              `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
            );
          })
        )
        .then((data) => setWeather(data))
        .catch(() => navigate("/Fallback"));
    }
  }, [navigate, favoriteCities]);

  // === STYLE ===
  const errorMessageStyle = css`
    font-size: 20px;
  `;
  const errorIconStyle = css`
    font-size: 60px;
    margin-bottom: 2rem;
    color: #3b3c3a;
  `;
  const cityListStyle = css`
    padding: 1rem;
  `;
  const cityListItemStyle = css`
    margin-bottom: 1.5rem;
  `;

  return (
    <>
      <SimpelHeader heading="Your favorties" icon={<IoMdHeart />} />
      {weather && weather.length > 0 && (
        <ul css={cityListStyle}>
          {weather.map((city) => (
            <li key={city.data.id} css={cityListItemStyle}>
              <Link to={`/location/${city.data.name}`}>
                <SmallWeatherInfoItem
                  title={city.data.name}
                  icon={city.data.weather[0].icon}
                  avgTemp={city.data.main.temp}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
      {!weather && favoriteCities.length > 0 && <LoadingSpinner />}
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
