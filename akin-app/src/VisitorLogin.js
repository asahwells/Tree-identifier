import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import firebase from "./Fire";
import { Link } from "react-router-dom";
import Icon from "./tree.svg";

// import { Form } from "react-bootstrap";

const Login = (props) => {
  const defaultUser = {
    Name: "",
    Email: "",
  };
  const [visitor, setVisitor] = useState([defaultUser]);
  const handleVisitorName = (value) => {
    const newArray = visitor.map((user) => {
      return { ...user, Name: value };
    });
    setVisitor(newArray);
  };
  const handleVisitorEmail = (value) => {
    const newArray = visitor.map((user) => {
      return { ...user, Email: value };
    });
    setVisitor(newArray);
  };
  const VisitorLogin = () => {
    visitor.forEach((element) => {
      firebase.firestore().collection("visitors").doc().set(element);
    });
  };
  // useEffect(() => {
  //        visitor.forEach((element) => {
  //          firebase.firestore().collection("visitors").doc().set(element);
  //        });
  //      }, []);
  return (
    <section className="login">
      <div className="loginContainer">
        <div
          style={{
            marginTop: "-70px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flexWrap: "nowrap",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <img src={Icon} alt="tree" width="100px" height="100px" />
          <h3 style={{ marginTop: 30 }}> Welcome to Tree Identifier</h3>
        </div>
        {visitor.map((co) => (
          <form
            autoComplete="on"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              marginTop: "80px",
            }}
          >
            <TextField
              id="outlined-email"
              label="Name"
              value={co.Name}
              onChange={(e) => handleVisitorName(e.target.value)}
              variant="outlined"
            />
            <p className="errorMsg"></p>
            <TextField
              id="outlined-name"
              label="Email"
              value={co.Email}
              onChange={(e) => handleVisitorEmail(e.target.value)}
              variant="outlined"
            />
          </form>
        ))}

        <div className="btnContainer">
          <Link to="/search">
            {" "}
            <button onClick={VisitorLogin}>Sign In</button>{" "}
          </Link>
        </div>
        {/* <label>password</label>
        <input
          type="text"
          autoFocus
          required
          value={value}
          onChange={handleChange}
        /> */}
      </div>
    </section>
  );
};

export default Login;
