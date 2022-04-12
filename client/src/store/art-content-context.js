import { createContext, useState } from "react";
import axios from "axios";

const ArtContentContext = createContext({
  artMovements: [],
  artists: [],
  reviewArtwork: null,
  deleteArtwork: null,
});

export function ArtContentContextProvider(props) {
  const [artMovements, setArtMovements] = useState([]);
  const [artists, setArtists] = useState([]);

  function countLikes(artist) {
    let likes = 0;
    artist.artworkList.forEach(function (artwork) {
      likes += artwork.appreciated_by.length;
    });
    return likes;
  }

  function getArtists() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/api/user-artist/`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setArtists(
          res.data.artists.map(function (item) {
            return {
              numberOfLikes: countLikes(item),
              full_name: item.full_name,
              label: item.full_name,
              id: item.id,
              value: item.id,
              artworkList: item.artworkList,
            };
          })
        );
      })
      .catch((err) => console.log(err));
  }

  function getArtMovements() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/api/artisticmovements/`)
      .then((res) => {
        setArtMovements(
          res.data.map(function (item) {
            return {
              label: item.name,
              name: item.name,
              id: item.id,
              value: item.id,
              numericLabel: item.label,
              artworkList: item.artwork_list,
              numberOfArtworks: item.number_of_artworks,
            };
          })
        );
      })
      .catch((err) => console.log(err));
  }

  function reviewArtwork(id, userToken) {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/api/artwork-review/${id}/`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
        }
      )
      .then((res) => {
        getArtists();
      })
      .catch((err) => console.log(err));
  }

  function deleteArtwork(id, userToken) {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_API}/api/artworks/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
      })
      .then((res) => {
        getArtists();
      })
      .catch((err) => console.log(err));
  }

  if (!(artMovements && artMovements.length > 0)) {
    getArtMovements();
  }
  //artists
  if (!(artists && artists.length > 0)) {
    getArtists();
  }

  const context = {
    artMovements: artMovements,
    artists: artists,
    reviewArtwork: reviewArtwork,
    deleteArtwork: deleteArtwork,
  };

  return (
    <ArtContentContext.Provider value={context}>
      {props.children}
    </ArtContentContext.Provider>
  );
}

export default ArtContentContext;
