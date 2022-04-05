import React, { useState, useContext } from "react";
import AuthenticationContext from "store/authentication-context";
import {
  CardGroup,
  Card,
  Button,
  CloseButton,
} from "react-bootstrap";
import "./ArtworksList.css";
import axios from "axios";

export default function ArtworksList(props) {
  const authContext = useContext(AuthenticationContext);
  function deleteArtwork(id) {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_API}/api/artworks/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authContext.authenticationToken}`,
        },
      })
      .then((res) => {
        authContext.updateUserInformation();
      })
      .catch((err) => console.log(err));
  }

  function reviewArtwork(id) {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/api/artwork-review/${id}/`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authContext.authenticationToken}`,
          },
        }
      )
      .then((res) => {
        authContext.updateUserInformation();
      })
      .catch((err) => console.log(err));
  }

  return (
    <CardGroup className="artwork-list">
      {props.artworks.map((artwork) => {
        return (
          <Card key={artwork.id}>
            <Card.Header>
              {artwork.title}
              {props.hasOwnerRights && (
                <CloseButton onClick={() => deleteArtwork(artwork.id)} />
              )}
            </Card.Header>
            <Card.Img
              variant="top"
              src={
                process.env.REACT_APP_BACKEND_API +
                "/data/" +
                artwork.artwork_image
              }
            />

            <Card.Footer>
            <small className="text-muted">Number of likes: {artwork.appreciated_by.length}</small>
              {authContext.userIsAuthenticated && <Button
                className="like-button"
                onClick={() => reviewArtwork(artwork.id)}
                variant={artwork.appreciated_by.includes(authContext.userInformation.username) ? "info": "outline-info"}
              >
                Like
              </Button>}
            </Card.Footer>
          </Card>
        );
      })}
    </CardGroup>
  );
}
