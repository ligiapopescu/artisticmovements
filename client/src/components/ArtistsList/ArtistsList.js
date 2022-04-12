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
              <Row key={artist.id}>
                <hr />
                {((artist.artworkList && artist.artworkList.length > 0) || props.hasOwnerRights) && <ArtistDetails
                  name={artist.full_name}
                  badgeLikes = {artist.numberOfLikes}
                  artworks={artist.artworkList}
                  hasOwnerRights={props.hasOwnerRights}
                  id={artist.id}
                  
                />
                }
              </Row>
            );
          })}
        </Row>
      </Container>
    </main>
  );
}
