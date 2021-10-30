import "./Section.css";

const Section = (props) => {
  const classes = "section " + props.className;

  return (
    <div className={classes} data-scroll-section>
      <div className="section__title text-h2">{props.title}</div>
      <div className="section__description text-copy">{props.description}</div>
      <div className="section__content">{props.children}</div>
    </div>
  );
};

export default Section;
