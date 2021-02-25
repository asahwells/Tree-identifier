/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Text from "./Text";
import Visitor from "./VisitorLogin";
import "./App.css";
import Login from "./Login";
import { Route, Switch } from "react-router-dom";
import fire from "./Fire";
import Final from "./Final";
import Admin from "./Admin";
import Question from "./Question";
import History from "./History";

function App() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

  const clearInput = () => {
    setEmail("");
    setPass("");
  };
  const clearError = () => {
    setEmailError("");
    setPassError("");
  };
  const handleLogin = () => {
    clearError();
    fire
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/users-disable":
          case "auth/users-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPassError(err.message);
            break;
          default: //do nothing
        }
      });
  };
  const handleLogout = () => {
    fire.auth().signOut();
    console.log(user);
  };
  const authlistener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInput();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };
  useEffect(() => {
    authlistener();
  }, []);

  return (
    <React.Fragment>
      <Switch>
        <Route
          path="/admin"
          render={
            user
              ? () => <Admin handleLogout={handleLogout} />
              : () => (
                  <Login
                    handleLogin={handleLogin}
                    setEmail={setEmail}
                    email={email}
                    pass={pass}
                    setPass={setPass}
                    emailError={emailError}
                    passError={passError}
                    handleLogout={handleLogout}
                  />
                )
          }
        />
        <Route
          path="/question"
          component={
            user
              ? () => <Question handleLogout={handleLogout} />
              : () => (
                  <Login
                    handleLogin={handleLogin}
                    setEmail={setEmail}
                    email={email}
                    pass={pass}
                    setPass={setPass}
                    emailError={emailError}
                    passError={passError}
                    handleLogout={handleLogout}
                  />
                )
          }
        />
        <Route
          path="/history"
          component={
            user
              ? () => <History handleLogout={handleLogout} />
              : () => (
                  <Login
                    handleLogin={handleLogin}
                    setEmail={setEmail}
                    email={email}
                    pass={pass}
                    setPass={setPass}
                    emailError={emailError}
                    passError={passError}
                    handleLogout={handleLogout}
                  />
                )
          }
        />
        <Route exact path="/" component={Visitor} />
        <Route exact path="/search" component={Text} />
        <Route path="/Result" component={Final} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
