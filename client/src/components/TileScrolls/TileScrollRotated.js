import React, { Component } from "react";

import "./TileScroll.css";

export default ({ images }) => (
  <div data-scroll-container>
    {images && images.length > 20 ? (
      <section className="tiles tiles--rotated" id="grid2">
        <div className="tiles__wrap">
          <div
            className="tiles__line"
            data-scroll
            data-scroll-speed="4"
            data-scroll-target="#grid2"
            data-scroll-direction="horizontal"
          >
            <img className="tiles__line-img" src={images[0].artwork_image} />
            <img className="tiles__line-img" src={images[0].artwork_image} />
            <img className="tiles__line-img" src={images[0].artwork_image} />
            <img className="tiles__line-img" src={images[0].artwork_image} />
            <img className="tiles__line-img" src={images[1].artwork_image} />
            <img className="tiles__line-img" src={images[2].artwork_image} />
          </div>
          <div
            className="tiles__line"
            data-scroll
            data-scroll-speed="-4"
            data-scroll-target="#grid2"
            data-scroll-direction="horizontal"
          >
            <div className="tiles__line-img"></div>
            <img className="tiles__line-img" src={images[3].artwork_image} />
            <img className="tiles__line-img" src={images[4].artwork_image} />
            <img className="tiles__line-img" src={images[5].artwork_image} />
            <img className="tiles__line-img" src={images[6].artwork_image} />
            <img className="tiles__line-img" src={images[7].artwork_image} />
          </div>
          <div
            className="tiles__line"
            data-scroll
            data-scroll-speed="4"
            data-scroll-target="#grid2"
            data-scroll-direction="horizontal"
          >
            <img className="tiles__line-img" src={images[8].artwork_image} />
            <img className="tiles__line-img" src={images[9].artwork_image} />
            <img className="tiles__line-img" src={images[10].artwork_image} />
            <img className="tiles__line-img" src={images[11].artwork_image} />
            <img className="tiles__line-img" src={images[12].artwork_image} />
            <img className="tiles__line-img" src={images[13].artwork_image} />
          </div>
          <div
            className="tiles__line"
            data-scroll
            data-scroll-speed="-4"
            data-scroll-target="#grid2"
            data-scroll-direction="horizontal"
          >
            <img className="tiles__line-img" src={images[14].artwork_image} />
            <img className="tiles__line-img" src={images[15].artwork_image} />
            <img className="tiles__line-img" src={images[16].artwork_image} />
            <img className="tiles__line-img" src={images[17].artwork_image} />
            <img className="tiles__line-img" src={images[18].artwork_image} />
            <div className="tiles__line-img"></div>
          </div>
          <div
            className="tiles__line"
            data-scroll
            data-scroll-speed="5"
            data-scroll-target="#grid2"
            data-scroll-direction="horizontal"
          >
            <div className="tiles__line-img"></div>
            <img className="tiles__line-img" src={images[16].artwork_image} />
            <img className="tiles__line-img" src={images[17].artwork_image} />
            <img className="tiles__line-img" src={images[18].artwork_image} />
            <div className="tiles__line-img"></div>
            <div className="tiles__line-img"></div>
          </div>
        </div>
      </section>
    ) : (
      <div className="loading"></div>
    )}
  </div>
);
