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
import "./AddNewArtist.css";

export default function AddNewArtist(props) {
  const [open, setOpen] = useState(false);
  const [artistName, setArtistName] = useState('');
  const authContext = useContext(AuthenticationContext);

  function handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData();
    formData.append("artistName", artistName);
    axios
      .post(`${process.env.REACT_APP_BACKEND_API}/api/user-artist/`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authContext.authenticationToken}`,
        },
      })
      .then((res) => {
        setArtistName(null)
        setOpen(false)
        authContext.updateUserInformation();
      })
      .catch((err) => console.log(err));
  }
  return (
    <Container className="add-new-artist">
      <Row>
        <Col>
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="artist-input-collapse"
            aria-expanded={open}
            variant="success"
          >
            Add new artist to your account
          </Button>
        </Col>
      </Row>
      <Collapse in={open}>
        <Form onSubmit={handleSubmit} className="add-new-artist__form">
          <Row xs={1} md={3} id="artist-input-collapse">
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Artist name</InputGroup.Text>
                <FormControl
                  placeholder="Full name"
                  aria-label="Full name"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setArtistName(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col>
              <Button variant="dark" type="submit">
                Submit
              </Button>{" "}
            </Col>
          </Row>
        </Form>
      </Collapse>
    </Container>
  );
}
