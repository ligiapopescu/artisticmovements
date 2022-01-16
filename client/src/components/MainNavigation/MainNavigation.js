import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./MainNavigation.css";

class MainNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <header className="navigation-menu">
        <div className="navigation-menu__home">
          <Link to="/">Home</Link>
        </div>
        <nav className="navigation-menu__navigation-list">
          <ul>
            <li className="navigation-menu__link">
              <Link to="/availableArtMovements">Art Movements</Link>
            </li>
            <li className="navigation-menu__link">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default MainNavigation;
