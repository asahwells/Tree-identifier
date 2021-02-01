import React, { Component } from "react";
import { Link } from "react-router-dom";
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
          className="navbar fixed-top navbar-dark bg-dark"
          style={{
            backgroundColor: "#e3f2fd",
            height: "70px",
            padding: "0px",
          }}
        >
          {/* <Link to="/">
            <span className="navbar-text mr-auto">Tree Indicator</span>
          </Link> */}
          <Link to="/" className="nav-link">
            Tree Indicator
          </Link>
        </nav>
      </>
    );
  }
}
