import React, { useReducer, Component } from "react";
import axios from "axios";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData();
    formData.append("username", "logintest");
    formData.append("password", "logintest");
    console.log("event", event);

    axios
      .post(`${process.env.REACT_APP_BACKEND_API}/api/users/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("response", response);
      })
      .catch((response) => {
        console.log("response error:", response);
      });
  }

  render() {
    return (
      <div className="login-wrapper">
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <label>
              <p>Username</p>
              <input type="text" name="username"/>
            </label>
            <label>
              <p>Password</p>
              <input type="password" name="password"/>
            </label>
          </fieldset>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
