import React, { useState, useContext, useEffect } from "react";
import AuthenticationContext from "store/authentication-context";
import { Container, Row } from "react-bootstrap";
import ArtistsList from "components/ArtistsList/ArtistsList";
import axios from "axios";

export default function ArtGallery(props) {
  const authContext = useContext(AuthenticationContext);
  const [communityArtists, setCommunityArtists] = useState(null);
  useEffect(() => {
    getArtists()
  }, [authContext]);
  function getArtists() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/api/user-artist/`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setCommunityArtists(res.data.artists);
      })
      .catch((err) => console.log(err));
  }
  if (communityArtists === null) {
    getArtists();
  }

  return (
    <main className="art-gallery-container">
      <Container>
        <Row>
          {communityArtists ? (
            <ArtistsList
              artists={communityArtists}
              hasOwnerRights={false}
              canReview={authContext && authContext.userIsAuthenticated && authContext.userInformation}
            />
          ) : (
            <div>Loading...</div>
          )}
        </Row>
      </Container>
    </main>
  );
}
