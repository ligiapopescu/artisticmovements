import React, { useState, useContext } from "react";
import "./Login.css";
import AuthenticationContext from "store/authentication-context";

export default function Login(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const [existingUser, setExistingUser] = useState();
  const authContext = useContext(AuthenticationContext);
  const [errorMessage, setErrorMessage] = useState();

  function handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    if (existingUser) {
      authContext.login(formData);
    } else {
      formData.append("passwordConfirmation", passwordConfirmation);
      if (password != passwordConfirmation) {
        setErrorMessage("Passwords do not match");
      } else {
        setErrorMessage(null);
        authContext.signup(formData);
      }
    }
  }

  function changeAction() {
    setExistingUser(!existingUser);
  }

  return (
    <div className="login-wrapper">
      {!authContext.userIsAuthenticated && errorMessage && <div>{errorMessage}</div>}
      {!authContext.userIsAuthenticated && authContext.authenticationErrorMessage && (
        <div>{authContext.authenticationErrorMessage} </div>
      )}
      {!authContext.userIsAuthenticated && (
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            <p>Password</p>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {!existingUser && (
            <label>
              <p>Confirm Password</p>
              <input
                type="password"
                name="passwordConfirmation"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </label>
          )}
          <div>
            <button type="submit">Submit</button>
          </div>
          {existingUser ? (
            <div>
              Don't have an account?
              <span onClick={changeAction}> Sign up </span>
            </div>
          ) : (
            <div>
              Already have an account?
              <span onClick={changeAction}> Sign in </span>
            </div>
          )}
        </form>
      )}
      {authContext.userIsAuthenticated && "Log in with success"}
    </div>
  );
}
