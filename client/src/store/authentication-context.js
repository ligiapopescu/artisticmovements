import { createContext, useState } from "react";
import axios from "axios";

const AuthenticationContext = createContext({
  authenticationToken: sessionStorage.getItem("authenticationToken"),
  userIsAuthenticated: sessionStorage.getItem("authenticationToken") != null,
  login: (userData) => {},
  logout: () => {},
  signup: (userData) => {},
  authenticationErrorMessage: null,
  userInformation: {},
  updateUserInformation: () => {},
});

export function AuthenticationContextProvider(props) {
  const [authenticationToken, setAuthenticationToken] = useState(
    sessionStorage.getItem("authenticationToken")
  );
  const [authenticationErrorMessage, setAuthenticationErrorMessage] =
    useState();
  const [userInformation, setUserInformation] = useState();

  function login(userData) {
    axios
      .post(`${process.env.REACT_APP_BACKEND_API}/api-token-auth/`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status == 200) {
          sessionStorage.setItem("authenticationToken", response.data.token);
          setAuthenticationToken((prev) => {
            return response.data.token;
          });
        }
      })
      .catch((response) => {
        sessionStorage.removeItem("authenticationToken");
        setAuthenticationToken((prev) => {
          return null;
        });
      });
  }

  function logout() {
    sessionStorage.removeItem("authenticationToken");
    setAuthenticationToken((prev) => {
      return null;
    });
  }

  function signup(userData) {
    try {
      axios
        .post(`${process.env.REACT_APP_BACKEND_API}/api/users/`, userData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status == 201) {
            sessionStorage.setItem("authenticationToken", response.data.token);
            setAuthenticationToken((prev) => {
              return response.data.token;
            });
          } else {
            setAuthenticationErrorMessage(
              "Username is not available. Please try again"
            );
          }
        })
        .catch((response) => {
          sessionStorage.removeItem("authenticationToken");
          setAuthenticationToken((prev) => {
            return null;
          });
        });
    } catch (error) {
      console.log("error", error);
    }
  }

  function getUserInformation() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/api/user-information/`, {
        headers: { Authorization: `Token ${authenticationToken}` },
      })
      .then((res) => {
        console.log("res.data", res.data);
        const userInformation = res.data;
        userInformation.isContentAdmin =
          res.data.groups.includes("Content Admin");
        setUserInformation(userInformation);
      })
      .catch((err) => console.log(err));
  }

  if (authenticationToken && !userInformation) {
    getUserInformation();
  }

  const context = {
    authenticationToken: authenticationToken,
    userIsAuthenticated:
      authenticationToken != null && authenticationToken != undefined,
    login: login,
    logout: logout,
    signup: signup,
    authenticationErrorMessage: authenticationErrorMessage,
    userInformation: userInformation,
    updateUserInformation: getUserInformation,
  };

  return (
    <AuthenticationContext.Provider value={context}>
      {props.children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationContext;
