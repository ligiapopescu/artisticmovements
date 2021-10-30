import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import LandingPage from "./components/LandingPage/LandingPage";
import React, { useRef } from "react";

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
        <main data-scroll-container ref={containerRef}>
          <LandingPage />
        </main>
      </LocomotiveScrollProvider>
    </div>
  );
};
