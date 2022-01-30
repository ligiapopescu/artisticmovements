import React, { useRef } from "react";
import Section from "components/UI/Section";
import TileScroll from "components/TileScrolls/TileScroll";
import UploadSection from "components/UploadSection/UploadSection";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";

export default function LandingPage() {
  const containerRef = useRef(null);
  return (
    <div>
      <LocomotiveScrollProvider
        options={{
          smooth: true,
        }}
        containerRef={containerRef}
      >
        <main data-scroll-container ref={containerRef}>
          <Section
            title="Artistic Movements and Artworks"
            description="Using Deep Convolutional Neural Networks for Artistic Movements Recognition"
          >
            <TileScroll tileScrollType="rotated" />
          </Section>
          <UploadSection />
        </main>
      </LocomotiveScrollProvider>
    </div>
  );
}
