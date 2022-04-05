import React, { useState, useContext } from "react";
import AuthenticationContext from "store/authentication-context";
import ArtistDetails from "components/ArtistDetails/ArtistDetails";
import { Container, Row } from "react-bootstrap";

export default function ArtistsList(props) {
  return (
    <main>
      <Container>
        <Row>
          {props.artists.map((artist) => {
            return (
              <Row>
                <hr />
                <ArtistDetails
                  name={artist.full_name}
                  artworks={artist.artworkList}
                  hasOwnerRights={props.hasOwnerRights}
                  id={artist.id}
                  key={artist.id}
                />
              </Row>
            );
          })}
        </Row>
      </Container>
    </main>
  );
}
