import React, { Component } from "react";

import axios from "axios";
import Section from "components/UI/Section";
import TileScrollRotated from "components/TileScrolls/TileScrollRotated";
import UploadSection from "components/UploadSection/UploadSection";

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
      .then((res) => {
        return this.setState({ images: res.data });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <Section
          title="Artistic Movements"
          description="Using Deep Convolutional Neural Networks for Artistic Movements Recognition"
        >
          <TileScrollRotated images={this.state.images} />
        </Section>
        <UploadSection images={this.state.images} />
        <Section
          title="Available currents"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        ></Section>
      </div>
    );
  }
}

export default LandingPage;
