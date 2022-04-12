import React, { useState, useContext, useEffect } from "react";
import AuthenticationContext from "store/authentication-context";
import { Container, Row, Col, Button } from "react-bootstrap";
import ArtistsList from "components/ArtistsList/ArtistsList";
import Filter from "components/UI/Filter";
import ArtContentContext from "store/art-content-context";
import "./ArtGallery.css";

export default function ArtGallery(props) {
  const authContext = useContext(AuthenticationContext);
  const artContentContext = useContext(ArtContentContext);
  const [displayedContent, setDisplayedContent] = useState(
    artContentContext.artists
  );
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [filteredArtMovements, setFilteredArtMovements] = useState([]);
  const [sortByLikes, setSortByLikes] = useState("desc");
  useEffect(
    function () {
      const content = [];
      const contentAfterArtistFiltering = filterByArtists(
        artContentContext.artists,
        filteredArtists
      );
      const contentAfterArtMovementsFiltering = filterByArtMovements(
        contentAfterArtistFiltering,
        filteredArtMovements
      );
      const sortedContent = sortContentByLikes(
        contentAfterArtMovementsFiltering,
        sortByLikes
      );
      setDisplayedContent(sortedContent);
    },
    [
      filteredArtists,
      filteredArtMovements,
      sortByLikes,
      artContentContext,
      authContext,
      artContentContext.artists,
    ]
  );

  function filterByArtists(artContent, filterArtists) {
    if (filterArtists && filterArtists.length > 0) {
      let containsAll =
        filterArtists.findIndex(function (artist) {
          return artist.label === "All";
        }) >= 0;
      return containsAll
        ? artContent
        : filterArtists.filter((artist) => artist.label !== "All");
    } else {
      return artContent;
    }
  }

  function getArworksConentByArtMovements(artworks, artMovements) {
    return artworks.filter(function (artwork) {
      let includesAtLeasOneArtMovement = 0;
      artMovements.forEach(function (artMovement) {
        if (artMovement.label == "All") {
          includesAtLeasOneArtMovement++;
        }
        if (artwork.art_movements.includes(artMovement.name)) {
          includesAtLeasOneArtMovement++;
        }
      });

      return includesAtLeasOneArtMovement > 0;
    });
  }

  function filterByArtMovements(artContent, filterArtMovements) {
    let filteredArtContent = [];

    if (filterArtMovements && filterArtMovements.length) {
      for (let i = 0; i < artContent.length; i++) {
        let filteredArtworks = getArworksConentByArtMovements(
          artContent[i].artworkList,
          filterArtMovements
        );
        if (filteredArtworks && filteredArtworks.length > 0) {
          filteredArtContent.push(artContent[i]);
          filteredArtContent[filteredArtContent.length - 1].artworkList =
            filteredArtworks;
        }
      }
    } else {
      filteredArtContent = artContent;
    }
    return filteredArtContent;
  }

  function sortContentByLikes(artContent, sortByLikes) {
    let sortedContent = [...artContent];
    if (sortByLikes === "asc") {
      sortedContent.sort(function (a, b) {
        return a.numberOfLikes - b.numberOfLikes;
      });
    } else if (sortByLikes === "desc") {
      sortedContent.sort(function (a, b) {
        return b.numberOfLikes - a.numberOfLikes;
      });
    } else {
      sortedContent = artContent;
    }

    return sortedContent;
  }

  function changeSortingByLikes() {
    setSortByLikes(sortByLikes === "desc" ? "asc" : "desc");
  }

  return (
    <main className="art-gallery-container">
      <Container>
        <Row className="art_gallery_filters">
          <Col md={2}>
            <Filter
              filterData={artContentContext.artMovements}
              filterTitle="Art movements"
              setFunction={setFilteredArtMovements}
            />
          </Col>
          <Col md={2}>
            <Filter
              filterData={artContentContext.artists}
              filterTitle="Artists"
              setFunction={setFilteredArtists}
            />
          </Col>
          <Col md={{ span: 4, offset: 4 }}>
            <Button variant="light" onClick={changeSortingByLikes}>
              Sort by likes{" "}
              {sortByLikes === "desc" ? "ascending" : "descending"}
            </Button>
          </Col>
        </Row>
        <Row>
          {displayedContent ? (
            <ArtistsList
              artists={displayedContent}
              hasOwnerRights={
                authContext &&
                authContext.userInformation &&
                authContext.userInformation.isContentAdmin
              }
              canReview={
                authContext &&
                authContext.userIsAuthenticated &&
                authContext.userInformation
              }
            />
          ) : (
            <div>Loading...</div>
          )}
        </Row>
      </Container>
    </main>
  );
}
