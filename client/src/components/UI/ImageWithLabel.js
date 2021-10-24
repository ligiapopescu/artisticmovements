import './ImageWithLabel.css';

const ImageWithLabel = (props) => {
    const classes = "image-with-label " + props.className;

    return (
        <div className={classes}>
            <img className="" src={props.image} />
            <div className="image-label"><pre>{props.label}</pre></div>
        </div>);
};

export default ImageWithLabel;