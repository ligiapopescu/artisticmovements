import "./ImageWithLabel.css";
import { Spinner } from "react-bootstrap";

const ImageWithLabel = (props) => {
  const classes = "image-with-label " + props.className;

  return (
    <div className={classes}>
      <img className="" src={props.image} />
      <div className="image-label">
        <pre>
          {props.label || <Spinner animation="border" variant="light" />}
        </pre>
      </div>
    </div>
  );
};

export default ImageWithLabel;