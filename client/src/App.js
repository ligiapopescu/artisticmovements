import React, { Component } from "react";
import { useRef } from "react";
import axios from "axios";

import './App.css';
import Section from './components/UI/Section';
import TileScrollRotated from './components/TileScrolls/TileScrollRotated';
import TileScrollOneLine from './components/TileScrolls/TileScrollOneLine';

import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      images: [],
    };
  }

  componentDidMount() {
    this.refreshImages();
  }

  refreshImages = () => {
    axios
      .get("api/artworks/")
      .then((res) => { console.log(res); return this.setState({ images: res.data }) })
      .catch((err) => console.log(err));
  };

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }

    return this.setState({ viewCompleted: false });
  };

  render() {
    return (
      <div>
        <Section title="Artistic Movements" description="Using Deep Convolutional Neural Networks for Artistic Movements Recognition">
          <TileScrollRotated images={this.state.images} />
        </Section>
        <Section title="Upload your own" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit">
          <TileScrollOneLine images={this.state.images} />
        </Section>
        <Section title="Available currents" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit">
        </Section>
      </div>
    );
  }
}

function App() {
  const containerRef = useRef(null)

  return (
    <div className="App">
      <LocomotiveScrollProvider
        options={
          {
            smooth: true
          }
        }
        containerRef={containerRef}
      >
        <main data-scroll-container ref={containerRef}>
          <LandingPage></LandingPage>
        </main>
      </LocomotiveScrollProvider>

    </div>
  )
}

export default App;
