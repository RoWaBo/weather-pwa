import { useEffect, useState } from "react";
import axios from "axios";
import { css } from "@emotion/react";
import LoadingSpinner from "../components/LoadingSpinner";
import PopupBox from "../components/PopupBox";
/** @jsxImportSource @emotion/react */

const Home = () => {
  "geolocation" in navigator
    ? console.log("available")
    : console.log("unavailable");

  const [weatherData, setWeatherData] = useState();
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

          const { data } = await axios(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
          );
          setWeatherData(data);
        });
      }
    })();
  }, []);

  if (weatherData)
    return (
      <>
        <h1>this is home</h1>
      </>
    );
  if (!weatherData && !locationNotAllowed) return <LoadingSpinner />;
  if (locationNotAllowed)
    return <PopupBox message="Please allow this site to use your location" />;
};

export default Home;
