import React from "react";

import "./TileScroll.css";
import UploadArtwork from "../UploadArtwork/UploadArtwork";

function TileScrollOneLine(props) {
  return (
    <div data-scroll-container>
      {props && props.images && props.images.length > 30 ? (
        <div>
          <section className="tiles tiles--oneline" id="grid3">
            <div className="tiles__wrap">
              <div
                className="tiles__line"
                data-scroll
                data-scroll-speed="2"
                data-scroll-target="#grid3"
                data-scroll-direction="horizontal"
              >
                <img
                  className="tiles__line-img"
                  src={props.images[19].artwork_image}
                />
                <img
                  className="tiles__line-img"
                  src={props.images[20].artwork_image}
                />
                <UploadArtwork className="tiles__line-img"></UploadArtwork>
                <img
                  className="tiles__line-img"
                  src={props.images[21].artwork_image}
                />
                <img
                  className="tiles__line-img"
                  src={props.images[22].artwork_image}
                />
              </div>
            </div>
          </section>
          <section className="tiles tiles--oneline" id="grid4">
            <div className="tiles__wrap">
              <div
                className="tiles__line"
                data-scroll
                data-scroll-speed="-2"
                data-scroll-target="#grid4"
                data-scroll-direction="horizontal"
              >
                <img
                  className="tiles__line-img"
                  src={props.images[23].artwork_image}
                />
                <img
                  className="tiles__line-img"
                  src={props.images[24].artwork_image}
                />
                <img
                  className="tiles__line-img"
                  src={props.images[25].artwork_image}
                />
                <img
                  className="tiles__line-img"
                  src={props.images[26].artwork_image}
                />
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="loading"></div>
      )}
    </div>
  );
}

export default TileScrollOneLine;
