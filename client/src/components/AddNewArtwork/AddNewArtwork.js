import React, { useState, useContext } from "react";
import {
  Button,
  Collapse,
  InputGroup,
  FormControl,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import axios from "axios";
import AuthenticationContext from "store/authentication-context";
import "./AddNewArtwork.css";
function handleSubmit() {}

export default function AddNewArtwork(props) {
  const [open, setOpen] = useState(false);
  const [artworkTitle, setArtworkTitle] = useState();
  const [artworkFile, setArtworkFile] = useState();
  const authContext = useContext(AuthenticationContext);

  function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData();
    formData.append("title", artworkTitle);
    formData.append("artistId", props.artistId);
    formData.append("artwork_image", artworkFile);
    formData.append("uploaded_by_user", true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_API}/api/artworks/`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authContext.authenticationToken}`,
        },
      })
      .then((res) => {
        setArtworkTitle(null);
        setArtworkFile(null);
        setOpen(false);
        authContext.updateUserInformation();
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="add-new-artwork">
      <Row>
        <Col>
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="artwork-input-collapse"
            aria-expanded={open}
            variant="success"
          >
            Add new artwork
          </Button>
        </Col>
      </Row>
      <Collapse in={open}>
        <Form onSubmit={handleSubmit} className="add-new-artwork__form">
          <Row xs={1} md={3} id="artwork-input-collapse">
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
                <FormControl
                  placeholder="Artwork title"
                  aria-label="Artwork title"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setArtworkTitle(e.target.value)}
                />
              </InputGroup>
              <Form.Group controlId="imageUpload" className="mb-3">
                <Form.Label>Upload artwork image</Form.Label>
                <Form.Control type="file" onChange={(e) => setArtworkFile(e.target.files[0])}/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="dark" type="submit">
                Submit
              </Button>{" "}
            </Col>
          </Row>
        </Form>
      </Collapse>
    </div>
  );
}
