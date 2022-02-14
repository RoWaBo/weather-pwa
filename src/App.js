import React, { useEffect, useState } from "react";
import Home from "./views/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import Search from "./views/Search";
import Favorites from "./views/Favorites";
import Navigation from "./components/Navigation";
import MainLayout from "./components/MainLayout";
import Location from "./views/Location";
import Fallback from "./views/Fallback";
import PWAPrompt from "react-ios-pwa-prompt";
import { motion } from "framer-motion";

function App() {

  const { pathname: currentPathname } = useLocation();
  const [prevPathname, setPrevPathname] = useState();
  const [animateDirection, setAnimateDirection] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    if (prevPathname === currentPathname) return
    if (!prevPathname) return setPrevPathname(currentPathname)

    setIsLoading(true)

    const pageArray = ['/favorites', '/', '/search']
    const prevPathIndex = pageArray.indexOf(prevPathname)
    const currentPathIndex = pageArray.indexOf(currentPathname)

    console.log('current: ', currentPathIndex, currentPathname);
    console.log('prev: ', prevPathIndex, prevPathname);

    if (currentPathIndex < prevPathIndex) setAnimateDirection('left')
    if (currentPathIndex > prevPathIndex) setAnimateDirection('right')

    setPrevPathname(currentPathname)

    setIsLoading(false)
  }, [currentPathname, prevPathname]);

  return (
    <>
      <motion.div
        key={currentPathname}
        variants={{
          left: { x: '100vw' },
          right: { x: '-100vw' }
        }}
        initial={!isLoading && animateDirection}
        animate={{ x: 0 }}
        // exit={{ x: '100vw' }}
        transition={{ duration: 2 }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="location/:cityName" element={<Location />} />
          <Route path="*" element={<Fallback />} />
        </Routes>
      </motion.div>
      <Navigation />
      <PWAPrompt />
    </>
  );
}

export default App;
