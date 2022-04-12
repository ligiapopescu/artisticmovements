import React, { useState, useContext } from "react";
import "./ArtistDetails.css";
import AuthenticationContext from "store/authentication-context";
import { Button, Container, Row, Col, Badge } from "react-bootstrap";
import axios from "axios";
import AddNewArtwork from "components/AddNewArtwork/AddNewArtwork";
import ArtworksList from "components/ArtworksList/ArtworksList";

export default function ArtistDetails(props) {
  const authContext = useContext(AuthenticationContext);

  function removeArtist(id) {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_API}/api/artists/${id}/`, {
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
  return (
    <Container className="artist-details" id={props.id}>
      <Row>
        <Col className="artist-details__name">
          {props.name}{" "}
          {props.badgeLikes && (
            <h5>
              <Badge pill bg="info">
                {props.badgeLikes} Likes
              </Badge>
            </h5>
          )}
        </Col>
        <Col>
          {props.hasOwnerRights && (
            <Button
              onClick={() => removeArtist(props.id)}
              variant="danger"
              className="artist-details__remove-artist"
            >
              Remove Artist
            </Button>
          )}
        </Col>
      </Row>
      {props.hasOwnerRights && <AddNewArtwork artistId={props.id} />}
      <ArtworksList
        artworks={props.artworks}
        hasOwnerRights={props.hasOwnerRights}
      />
    </Container>
  );
}
