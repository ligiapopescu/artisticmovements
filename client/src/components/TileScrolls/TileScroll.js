import React from "react";

import TileScrollRow from "./TileScrollRow";

import "./TileScroll.css";
import TileScrollsConfig from "./TileScrollsConfig.json";

export default (props) => {
  const tileScrollType = props.tileScrollType;
  const config = TileScrollsConfig.filter(
    (config) => config.tileScroll == tileScrollType
  )[0];

  return (
    <div data-scroll-container>
      <section
        className={`tiles tiles--${tileScrollType}`}
        id={config.componentId}
      >
        <div className="tiles__wrap">
          {Array.from({ length: config.rowsNumber }, (_, i) => (
            <TileScrollRow
              rowNumber={i}
              tileScrollConfig={config}
              key={`${tileScrollType}_${i}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};