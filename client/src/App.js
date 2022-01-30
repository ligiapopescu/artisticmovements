import React, { useRef } from "react";
import { Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import MainNavigation from "./components/MainNavigation/MainNavigation";
import AvailableArtMovements from "./pages/AvailableArtMovements/AvailableArtMovements";

export default () => {
  return (
    <div className="App">
        <MainNavigation />
        <main>
          <Routes>
            <Route path="/" exact element={<LandingPage />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/availableArtMovements" exact element={<AvailableArtMovements />} />
          </Routes>
        </main>
    </div>
  );
};
