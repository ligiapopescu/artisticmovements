import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import "./MainNavigation.css";
import AuthenticationContext from "store/authentication-context";

function MainNavigation(props) {
  const authContext = useContext(AuthenticationContext);

  return (
    <header className="navigation-menu">
      <div className="navigation-menu__option">
        <Link to="/">Home</Link>
      </div>
      <nav>
        <ul>
          <li className="navigation-menu__option">
            <Link to="/availableArtMovements">Art Movements</Link>
          </li>
          {authContext.userIsAuthenticated ? (
            <li className="navigation-menu__option">
              My account
              <ul>
                <li>
                  <Link to="/">My wall</Link>
                </li>
                <li onClick={authContext.logout}>
                  <Link to="/">Log out</Link>
                </li>
              </ul>
            </li>
          ) : (
            <li className="navigation-menu__option">
              <Link to="/login">Log in</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
