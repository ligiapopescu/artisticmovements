import React from "react";
import UploadArtwork from "../UploadArtwork/UploadArtwork";

export default (props) => {
  const config = props.tileScrollConfig;
  const rowNumber = props.rowNumber;

  const scrollSpeedSign = rowNumber % 2 ? "-" : "";
  const scrollSpeed = scrollSpeedSign + config.scrollSpeed;

  let rowImages = [];
  for (let i = 0; i < config.imagesOnRow; i++) {
    let imageIdx = config.imagesOnRow * rowNumber + i;
    let image = config.images[imageIdx];
    if (image.type === "img") {
      rowImages.push(
        <img
          key={imageIdx}
          className="tiles__line-img"
          src={"../" + image.src}
        />
      );
    } else if (image.type == "upload") {
      rowImages.push(
        <UploadArtwork
          className="tiles__line-img"
          key={imageIdx}
        ></UploadArtwork>
      );
    }
  }

  return (
    <div
      className="tiles__line"
      data-scroll
      data-scroll-speed={scrollSpeed}
      data-scroll-target={`#${config.componentId}`}
      data-scroll-direction="horizontal"
    >
      {rowImages}
    </div>
  );
};
