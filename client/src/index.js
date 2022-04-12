import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { AuthenticationContextProvider } from "store/authentication-context";
import { ArtContentContextProvider } from "store/art-content-context";

ReactDOM.render(
  <AuthenticationContextProvider>
    <ArtContentContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ArtContentContextProvider>
  </AuthenticationContextProvider>,
  document.getElementById("root")
);
