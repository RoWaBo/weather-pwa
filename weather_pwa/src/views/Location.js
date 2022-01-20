import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import Header from "../components/Header";
import CurrentWeather from "../components/CurrentWeather";
import ForecastList from "../components/ForecastList";
import LoadingSpinner from "../components/LoadingSpinner";
import CenterContainer from "../components/CenterContainer";
import { useNavigate } from "react-router-dom";

const Location = () => {
  const navigate = useNavigate();
  const { cityName } = useParams();
  const [weather, setWeather] = useState();
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

        const { data: current } = await axios(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
        );

        const lon = current.coord.lon;
        const lat = current.coord.lat;

        const { data: forecast } = await axios(
          `https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`
        );

        setWeather({ forecast, current });
      } catch (err) {
        if (err.response.status === 404) {
          setErrorMessage("The city could not be found");
        } else {
          navigate("/Fallback");
        }
      }
    })();
  }, [cityName]);

  // === STYLE ===
  const errorMessageStyle = css`
    font-size: 20px;
  `;
  const buttonStyle = css`
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

  if (weather)
    return (
      <main>
        <Header
          locationName={weather.current.name}
          country={weather.current.sys.country}
        />
        <CurrentWeather
          unixTimestamp={weather.current.dt}
          description={weather.current.weather[0].description}
          temp={weather.current.main.temp}
          icon={weather.current.weather[0].icon}
          includeFavoriteBtn={true}
          cityName={weather.current.name}
        />
        <ForecastList forecastArray={weather.forecast.daily} />
      </main>
    );
  if (!weather && !errorMessage) return <LoadingSpinner />;
  if (errorMessage)
    return (
      <CenterContainer>
        <h1 css={errorMessageStyle}>{errorMessage}</h1>
        <button css={buttonStyle} onClick={() => navigate("/search")}>
          Try again
        </button>
      </CenterContainer>
    );
};

export default Location;
