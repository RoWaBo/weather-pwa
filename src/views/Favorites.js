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
    // console.log(thirdOfViewWidth);
    // console.log('event: ', e);
    // console.log('info: ', info);
    // console.log('position: ', info.offset.x);
  }
  const throttleOnDrag = throttle(onDrag, 200, { leading: false })

  // === ANIMATION VARIANTS ===
  const cityListAnimations = {
    hidden: {
      opacity: 0,
      y: '50vh'
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        staggerChildren: 0.1
      }
    },
    exit: {
      x: '200vw'
    }
  }
  // ===

  const deleteSelectedItem = cityName => {
    const filteredCities = favoriteCities.filter(favoriteCityName => favoriteCityName != cityName)
    setFavoriteCities([...filteredCities])
    // localStorage.setItem("favoriteCities", JSON.stringify(filteredCities));
  }

  useEffect(() => {
    if (favoriteCities.length > 0) {
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
    margin: auto 0;

    position: absolute;
    left: -${thirdOfViewWidth}px;
  `;

  return (
    <>
      <SimpelHeader heading="Your favorties" icon={<IoMdHeart />} />
      {weather && weather.length > 0 && (
        <motion.ul css={cityListStyle}
          variants={cityListAnimations}
          initial={'hidden'}
          animate={'visible'}
        >
          <AnimatePresence>
            {weather.map((city, index) => (
              <motion.li css={cityListItemStyle}
                key={city.data.id}
                variants={cityListAnimations}
                exit={'exit'}
                onTapStart={() => SetSelectedItemIndex(index)}
                drag='x'
                onDrag={throttleOnDrag}
                dragSnapToOrigin={snapToOrigin}
                dragConstraints={{ left: 0, right: thirdOfViewWidth }}
              >
                <AnimatePresence>
                  {deleteBtnIsVisible && index === selectedItemIndex && (
                    <motion.button css={deleteBtnStyle}
                      key={'deleteBtn' + index}
                      onClick={() => deleteSelectedItem(city.data.name)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
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
