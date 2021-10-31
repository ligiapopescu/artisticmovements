import "./UploadSection.css";
import TileScroll from "components/TileScrolls/TileScroll";
import UnsplashReact, { BlobUploader, withDefaultProps } from "unsplash-react";

export default () => {
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
              onBlobLoaded: (data) => {
                console.log("sunt uploadat", data);
              },
            })}
          />
        </div>
      </div>
      <div className="">
        <TileScroll tileScrollType="oneline"/>
      </div>
    </section>
  );
};
