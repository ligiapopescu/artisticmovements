import React, { Component } from "react";
import axios from "axios";

import "./UploadSection.css";
import TileScroll from "components/TileScrolls/TileScroll";
import UnsplashReact, { BlobUploader, withDefaultProps } from "unsplash-react";
import ImageWithLabel from "../UI/ImageWithLabel";

class UploadSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploaded: false,
      file: null,
      label: null,
    };
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload(upload) {
    let formData = new FormData();
    formData.append("title", "Uploaded by user");
    formData.append("artwork_image", upload, "image.jpg");
    formData.append("uploaded_by_user", true);

    axios
      .post(`${process.env.REACT_APP_BACKEND_API}/api/artworks/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const predictions = response.data.map(
          (prediction) => prediction.className
        );
        this.setState({
          label: predictions.join(" \n"),
        });
      })
      .catch((response) => {
        console.log("response error:", response);
      });

    this.setState({
      file: URL.createObjectURL(upload),
    });
  }

  render() {
    return (
      <section className="upload-section" data-scroll-section>
        <div className="upload-section__content content-container">
          <div className="upload-section__info">
            <div className="upload-section__title text-h2">
              Discover artistic movements
            </div>
            <div className="upload-section__description text-copy text-clr-primary">
              Choose an Artwork from Unsplash or Upload your own
            </div>
            {this.state.file && (
              <ImageWithLabel
                className="upload-section__image"
                image={this.state.file}
                label={this.state.label}
              />
            )}
          </div>
          <div className="upload-section__unsplash">
            <UnsplashReact
              applicationName="ArtisticMovements"
              className="upload-section__photo-search"
              accessKey="eD6WgNG0ZEAqEBQlFeZO9Ckn1Ya7h_9Otdefc2cZEpk"
              columns={3}
              defaultSearch="art"
              Uploader={withDefaultProps(BlobUploader, {
                onBlobLoaded: this.handleUpload,
              })}
            />
          </div>
        </div>
        <div>
          <TileScroll tileScrollType="oneline" />
        </div>
      </section>
    );
  }
}

export default UploadSection;
