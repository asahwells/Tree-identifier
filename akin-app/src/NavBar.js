import React, { Component } from "react";
import { Link } from "react-router-dom";
import Icon from "./tree.svg";
// import { Navbar } from "react-bootstrap";
// import styled from "styled-components";
export default class NavBar extends Component {
  render() {
    return (
      <>
        {/* <Navbar bg="blue" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          Tree Identifier
        </Navbar> */}
        <nav
          className="navbar fixed-top navbar-dark "
          style={{
            backgroundColor: "#03a27b",
            height: "70px",
            padding: "0px",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          {/* <Link to="/">
            <span className="navbar-text mr-auto">Tree Indicator</span>
          </Link> */}
          <Link to="/" className="nav-link text-white">
            <img src={Icon} alt="tree" width="50px" height="50px" /> Tree
            Indicator
          </Link>
        </nav>
      </>
    );
  }
}
