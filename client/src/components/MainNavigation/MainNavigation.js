import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import "./MainNavigation.css";
import AuthenticationContext from "store/authentication-context";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
function MainNavigation(props) {
  const authContext = useContext(AuthenticationContext);
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/availableArtMovements">Art movements</Nav.Link>
          <Nav.Link href="/artGallery"> Art Gallery</Nav.Link>
        </Nav>
        <Nav>
          {authContext.userIsAuthenticated ? (
            <NavDropdown title="Account" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/myAccount">My account</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={authContext.logout}>
                Log out
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <li className="navigation-menu__option">
              <Nav.Link href="/login">Log in</Nav.Link>
            </li>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MainNavigation;
