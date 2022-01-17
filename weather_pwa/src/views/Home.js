import { useEffect, useState } from "react";
import axios from "axios";
import { css } from "@emotion/react";
import LoadingSpinner from "../components/LoadingSpinner";
import PopupBox from "../components/PopupBox";
import Header from "../components/Header";
/** @jsxImportSource @emotion/react */

const Home = () => {
  "geolocation" in navigator
    ? console.log("available")
    : console.log("unavailable");

  const [weather, setWeather] = useState();
  const [locationNotAllowed, setLocationNotAllowed] = useState(false);

  useEffect(() => {
    (async () => {
      // Check if location is allowed
      const { state: permission } = await navigator.permissions.query({
        name: "geolocation",
      });
      if (permission === "denied") return setLocationNotAllowed(true);

      // Fetch current position OpenWeatherMap data
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
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
        });
      }
    })();
  }, []);

  if (weather)
    return (
      <>
        <Header
          locationName={weather.current.name}
          country={weather.current.sys.country}
        />
      </>
    );
  if (!weather && !locationNotAllowed) return <LoadingSpinner />;
  if (locationNotAllowed)
    return <PopupBox message="Please allow this site to use your location" />;
};

export default Home;
