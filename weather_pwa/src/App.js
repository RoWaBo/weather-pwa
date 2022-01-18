import React from "react";
import Home from "./views/Home";
import { Routes, Route } from "react-router-dom";
import Search from "./views/Search";
import Favorites from "./views/Favorites";
import Navigation from "./components/Navigation";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="favorites" element={<Favorites />} />
        </Routes>
      </MainLayout>
      <Navigation />
    </>
  );
}

export default App;
