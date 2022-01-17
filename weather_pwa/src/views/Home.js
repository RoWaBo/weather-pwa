import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
        axios(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
        ).then((response) => setWeatherData(response.data));
      });
    }
  }, []);

  return (
    <>
      <h1>this is home</h1>
    </>
  );
};

export default Home;
