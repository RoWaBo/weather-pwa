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
import { throttle } from 'lodash';
import { MdDelete } from 'react-icons/md';
// Framer imports
import { motion, AnimatePresence } from 'framer-motion';

const Favorites = () => {
  const [weather, setWeather] = useState();
  const navigate = useNavigate();
  const [favoriteCities, setFavoriteCities] = useState(
    JSON.parse(localStorage.getItem("favoriteCities")) || []
  );

  // === LIST ANIMATION STATES ===
  const [snapToOrigin, setSnapToOrigin] = useState(true);
  const [thirdOfViewWidth] = useState(window.innerWidth / 3);
  const [deleteBtnIsVisible, setDeleteBtnIsVisible] = useState(false);
  const [selectedItemIndex, SetSelectedItemIndex] = useState();

  // === LIST ANIMATION FUNCTIONS
  const onDrag = (e, { offset }) => {
    if (offset.x > thirdOfViewWidth) {
      setSnapToOrigin(false)
      setDeleteBtnIsVisible(true)
    }
    if (offset.x < thirdOfViewWidth) {
      setSnapToOrigin(true)
      setDeleteBtnIsVisible(false)
    }
  }
  const throttleOnDrag = throttle(onDrag, 200, { leading: false })
  // ===

  const deleteSelectedItem = cityName => {
    const filteredWeather = weather.filter(({ data }) => data.name !== cityName)
    const filteredFavoriteCities = favoriteCities.filter(favoriteCityName => favoriteCityName !== cityName)
    setWeather([...filteredWeather])
    setFavoriteCities([...filteredFavoriteCities])
    localStorage.setItem("favoriteCities", JSON.stringify(filteredFavoriteCities));
  }

  useEffect(() => {
    if (!weather && favoriteCities?.length > 0) {
      const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

      Promise.all(
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
    overflow: hidden;
    height: 100vh;
    padding: 1rem;
  `;
  const cityListItemStyle = css`
    margin-bottom: 1.5rem;
  `;
  const deleteBtnStyle = css`
    display: grid;
    place-content: center;
    background: none;
    border: none;
    font-size: 2.5rem;
    /* center on y */
    height: 100%;
    width: 20%;
    margin: auto 0;

    position: absolute;
    left: -${thirdOfViewWidth}px;
  `;

  return (
    <>
      <SimpelHeader heading="Your favorties" icon={<IoMdHeart />} />
      <motion.ul css={cityListStyle}>
        <AnimatePresence>
          {weather?.map((city, index) => (
            <motion.li
              css={cityListItemStyle}
              key={city.data.id}
              initial={{ opacity: 0, y: '50vh' }}
              animate={{ opacity: 1, y: 1 }}
              exit={{ x: '200vw', transition: { duration: 0.3 } }}
              transition={{ duration: 0.7, delay: `0.${index}`, type: 'spring', stiffness: 300, damping: 24 }}
              layout
              drag='x'
              onTapStart={() => SetSelectedItemIndex(index)}
              onDrag={throttleOnDrag}
              dragSnapToOrigin={snapToOrigin}
              dragConstraints={{ left: 0, right: thirdOfViewWidth }}
            >
              <AnimatePresence>
                {deleteBtnIsVisible && index === selectedItemIndex && (
                  <motion.button
                    css={deleteBtnStyle}
                    key={'deleteBtn' + index}
                    onClick={() => deleteSelectedItem(city.data.name)}
                    initial={{ opacity: 0, rotate: 40, y: 10 }}
                    animate={{ opacity: 1, rotate: 0, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, type: 'spring', stiffness: 200 }}
                    whileTap={{ scale: 1.3, rotate: [-20, 20, 0] }}
                  >
                    <MdDelete />
                  </motion.button>
                )}
              </AnimatePresence>
              <Link to={`/location/${city.data.name}`}>
                <SmallWeatherInfoItem
                  title={city.data.name}
                  icon={city.data.weather[0].icon}
                  avgTemp={city.data.main.temp}
                  animationDelay={index}
                />
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {!weather && favoriteCities.length > 0 && <LoadingSpinner />}
      {favoriteCities?.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <CenterContainer>
            <ImHeartBroken css={errorIconStyle} />
            <h2 css={errorMessageStyle}>You have no favorites</h2>
          </CenterContainer>
        </motion.div>
      )}
    </>
  );
};

export default Favorites;
