import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  "geolocation" in navigator
    ? console.log("available")
    : console.log("unavailable");

  const [weatherData, setWeatherData] = useState();
  const [locationNotAllowed, setLocationNotAllowed] = useState();

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

  return (
    <>
      <h1>this is home</h1>
    </>
  );
};

export default Home;
