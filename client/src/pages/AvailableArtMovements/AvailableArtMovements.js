import React, { useState, useContext } from "react";
import axios from "axios";

import "./AvailableArtMovements.css";
import ArtContentContext from "store/art-content-context";

export default function AvailableArtMovements(props) {
  const artContent = useContext(ArtContentContext);
  const [selectedArtMovementId, setSelectedArtMovementId] = useState([]);
  const [images, setImages] = useState([]);
  
  function handleArtMovementClick(artMovementId) {
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
        setSelectedArtMovementId(selectedArtMovementId);
        setImages(displayImages);
        
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <ul className="movements-list">
        {artContent.artMovements.map((item) => (
          <li
            key={"artMovement" + item.id}
            id={"artMovement" + item.id}
            className={
              "movements-list__option" +
              (item.id === selectedArtMovementId ? " selected" : " ")
            }
            onClick={() => handleArtMovementClick(item.id)}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <div className="images-list">{images}</div>
    </div>
  );
}
