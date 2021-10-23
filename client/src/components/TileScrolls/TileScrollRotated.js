import React, { Component } from "react";

import './TileScroll.css';

function TileScrollRotated(props) {
    return (
        <div data-scroll-container >
            {
                props && props.images && props.images.length > 20 ? (
                    <section className="tiles tiles--rotated" id="grid2">
                        <div className="tiles__wrap">
                            <div className="tiles__line" data-scroll data-scroll-speed="4" data-scroll-target="#grid2" data-scroll-direction="horizontal">
                                <div className="tiles__line-img"></div>
                                <div className="tiles__line-img"></div>
                                <div className="tiles__line-img"></div>
                                <img className="tiles__line-img" src={props.images[0].artwork_image} />
                                <img className="tiles__line-img" src={props.images[1].artwork_image} />
                                <img className="tiles__line-img" src={props.images[2].artwork_image} />

                            </div>
                            <div className="tiles__line" data-scroll data-scroll-speed="-4" data-scroll-target="#grid2" data-scroll-direction="horizontal">
                                <div className="tiles__line-img"></div>
                                <img className="tiles__line-img" src={props.images[3].artwork_image} />
                                <img className="tiles__line-img" src={props.images[4].artwork_image} />
                                <img className="tiles__line-img" src={props.images[5].artwork_image} />
                                <img className="tiles__line-img" src={props.images[6].artwork_image} />
                                <img className="tiles__line-img" src={props.images[7].artwork_image} />
                            </div>
                            <div className="tiles__line" data-scroll data-scroll-speed="4" data-scroll-target="#grid2" data-scroll-direction="horizontal">
                                <img className="tiles__line-img" src={props.images[8].artwork_image} />
                                <img className="tiles__line-img" src={props.images[9].artwork_image} />
                                <img className="tiles__line-img" src={props.images[10].artwork_image} />
                                <img className="tiles__line-img" src={props.images[11].artwork_image} />
                                <img className="tiles__line-img" src={props.images[12].artwork_image} />
                                <img className="tiles__line-img" src={props.images[13].artwork_image} />
                            </div>
                            <div className="tiles__line" data-scroll data-scroll-speed="-4" data-scroll-target="#grid2" data-scroll-direction="horizontal">
                                <img className="tiles__line-img" src={props.images[14].artwork_image} />
                                <img className="tiles__line-img" src={props.images[15].artwork_image} />
                                <img className="tiles__line-img" src={props.images[16].artwork_image} />
                                <img className="tiles__line-img" src={props.images[17].artwork_image} />
                                <img className="tiles__line-img" src={props.images[18].artwork_image} />
                                <div className="tiles__line-img"></div>
                            </div>
                            <div className="tiles__line" data-scroll data-scroll-speed="5" data-scroll-target="#grid2" data-scroll-direction="horizontal">
                                <div className="tiles__line-img"></div>
                                <img className="tiles__line-img" src={props.images[16].artwork_image} />
                                <img className="tiles__line-img" src={props.images[17].artwork_image} />
                                <img className="tiles__line-img" src={props.images[18].artwork_image} />
                                <div className="tiles__line-img"></div>
                                <div className="tiles__line-img"></div>
                            </div>
                        </div>
                    </section>
                ) : (<div className="loading"></div>)
            }
        </div>)
};

export default TileScrollRotated;
