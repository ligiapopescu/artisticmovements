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
import ArtContentContext from "store/art-content-context";

export default function ArtworksList(props) {
  const authContext = useContext(AuthenticationContext);
  const artContentContext = useContext(ArtContentContext);

  return (
    <CardGroup className="artwork-list">
      {props.artworks.map((artwork) => {
        return (
          <Card key={artwork.id}>
            <Card.Header>
              {artwork.title}
              {props.hasOwnerRights && (
                <CloseButton onClick={() => artContentContext.deleteArtwork(artwork.id, authContext.authenticationToken)} />
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
                onClick={() => artContentContext.reviewArtwork(artwork.id, authContext.authenticationToken)}
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
