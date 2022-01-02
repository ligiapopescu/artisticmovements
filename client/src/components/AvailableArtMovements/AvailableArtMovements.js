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
    this.handleArtMovementClick = this.handleArtMovementClick.bind(this);
  }

  componentDidMount() {
    this.refreshImages();
  }

  handleArtMovementClick(artMovementId) {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_API}/api/artisticmovements/${artMovementId}/`
      )
      .then((res) => {
        let displayImages = res.data.artwork_list;
        displayImages = displayImages.map(function (img) {
          return (
            <img
              key={img.id}
              src={
                process.env.REACT_APP_BACKEND_API + "/data/" + img.artwork_image
              }
              className="images-list__img"
            />
          );
        });
        return this.setState({
          images: displayImages,
          selectedArtMovementId: artMovementId,
        });
      })
      .catch((err) => console.log(err));
  }

  refreshImages = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/api/artisticmovements/`)
      .then((res) => {
        return this.setState({ artMovements: res.data });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <ul className="movements-list">
          {this.state.artMovements.map((item) => (
            <li
              id={"artMovement" + item.id}
              className={
                "movements-list__option" +
                (item.id === this.state.selectedArtMovementId ? " selected" : " ")
              }
              onClick={() => this.handleArtMovementClick(item.id)}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <div className="images-list">{this.state.images}</div>
      </div>
    );
  }
}

export default AvailableArtMovements;
