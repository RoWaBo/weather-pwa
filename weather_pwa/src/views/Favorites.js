import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [weather, setWeather] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const favoriteCities =
      JSON.parse(localStorage.getItem("favoriteCities")) || [];

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
      setWeather(cityWeather);
    }
  }, []);

  return <h1>this is the favorites view</h1>;
};

export default Favorites;
