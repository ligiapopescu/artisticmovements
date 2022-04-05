import React, { useState, useContext } from "react";
import "./MyAccount.css";
import AuthenticationContext from "store/authentication-context";
import ArtistDetails from "components/ArtistDetails/ArtistDetails";
import { Container, Row } from "react-bootstrap";
import AddNewArtist from "components/AddNewArtist/AddNewArtist";
import ArtistsList from "components/ArtistsList/ArtistsList";

export default function MyAccount(props) {
  const authContext = useContext(AuthenticationContext);
  return (
    <main className="account-page-container">
      <Container>
        <AddNewArtist />
        <Row>
          {authContext &&
          authContext.userInformation &&
          authContext.userInformation.artists ? (
            <ArtistsList artists={authContext.userInformation.artists} hasOwnerRights={true}/>
          ) : (
            <div>There are no artists associated with your account</div>
          )}
        </Row>
      </Container>
    </main>
  );
}
