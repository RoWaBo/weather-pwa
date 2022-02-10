import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import PopupBox from "../components/PopupBox";
import Header from "../components/Header";
import CurrentWeather from "../components/CurrentWeather";
import ForecastList from "../components/ForecastList";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [weather, setWeather] = useState();
  const [locationErrorMessage, setLocationErrorMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current position OpenWeatherMap data
    if ("geolocation" in navigator) {

      const geolocationError = error => {
        switch (error.code) {
          case 1: setLocationErrorMessage('Please allow this site to use your location')
            break;
          case 2: setLocationErrorMessage('Your location is unavailable')
            break;
          case 3: setLocationErrorMessage('Location acquisition timed out')
            break;
        }
      }

      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

          const { data: forecast } = await axios(
            `https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`
          );
          const { data: current } = await axios(
            `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`
          );
          setWeather({ forecast, current });
        } catch (err) {
          navigate("/Fallback");
        }
      }, geolocationError);
    }
  }, [navigate]);

  if (weather) return (
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
      />
      <ForecastList forecastArray={weather.forecast.daily} />
    </main>
  );
  if (!weather && !locationErrorMessage) return <LoadingSpinner />;
  if (locationErrorMessage) return <PopupBox message={locationErrorMessage} />;
};

export default Home;
