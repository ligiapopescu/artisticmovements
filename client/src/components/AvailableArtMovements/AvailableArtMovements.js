import React, { Component } from "react";
import axios from "axios";

import "./AvailableArtMovements.css";

class AvailableArtMovements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedArtMovement: [],
      images: [],
      artMovements: [],
    };
  }

  componentDidMount() {
    this.refreshImages();
  }

  refreshImages = () => {
    axios
      .get("api/artisticmovements/")
      .then((res) => {
        console.log(res);
        return this.setState({ artMovements: res.data });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <ul className="movements-list">
          {this.state.artMovements.map((item) => (
            <li id={"artMovement" + item.id} className="movements-list__option">
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AvailableArtMovements;
