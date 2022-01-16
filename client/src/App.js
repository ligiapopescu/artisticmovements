import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import React, { useRef } from "react";
import { Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import MainNavigation from "./components/MainNavigation/MainNavigation";
import AvailableArtMovements from "./pages/AvailableArtMovements/AvailableArtMovements";

export default () => {
  const containerRef = useRef(null);

  return (
    <div className="App">
      <LocomotiveScrollProvider
        options={{
          smooth: true,
        }}
        containerRef={containerRef}
      >
        <MainNavigation />
        <main data-scroll-container ref={containerRef}>
          <Routes>
            <Route path="/" exact element={<LandingPage />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/availableArtMovements" exact element={<AvailableArtMovements />} />
          </Routes>
        </main>
      </LocomotiveScrollProvider>
    </div>
  );
};
