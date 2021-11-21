import React, { Component } from "react";
import axios from "axios";

import "./UploadSection.css";
import TileScroll from "components/TileScrolls/TileScroll";
import UnsplashReact, { BlobUploader, withDefaultProps } from "unsplash-react";

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

  handleUpload(change) {
    const loadedFile = change.target.files[0]; //

    let formData = new FormData();
    formData.append("title", "Uploaded by user");
    formData.append("artwork_image", loadedFile);
    formData.append("uploaded_by_user", true);

    axios
      .post("/api/artworks/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("response success", response);
        const predictions = response.data.map(
          (prediction) =>
            prediction.className +
            " - " +
            Number(prediction.classPercent).toFixed(2) +
            "%"
        );
        this.setState({
          label: predictions.join(" \n"),
        });
      })
      .catch((response) => {
        console.log("response error:", response);
      });

    this.setState({
      file: URL.createObjectURL(loadedFile),
    });
  }

  render() {
    return (
      <section className="upload-section" data-scroll-section>
        <div className="upload-section__content content-container">
          <div className="upload-section__info">
            <div className="upload-section__title text-h2">Upload your own</div>
            <div className="upload-section__description text-copy text-clr-primary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </div>
          </div>
          <div className="upload-section__unsplash">
            <UnsplashReact
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
        <div className="">
          <TileScroll tileScrollType="oneline" />
        </div>
      </section>
    );
  }
}

export default UploadSection;
