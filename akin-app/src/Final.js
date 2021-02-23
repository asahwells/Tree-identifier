/* eslint-disable jsx-a11y/scope */
import React, { useEffect } from "react";
import Navbar from "./NavBar";
// import { Table } from "react-bootstrap";
import "./Table.css";
import { Link } from "react-router-dom";

const Final = (props) => {
  // useEffect(() => {
  //   const BotanicalName = props.location.state.BotanicalName;
  //   console.log(BotanicalName);
  // }, []);
  // const classes = useStyles();
  //   const theme = useTheme();
  // console.log(BotanicalName);
  return (
    <>
      <Navbar />

      {props.location.state.BotanicalName === "" ? (
        <div
          style={{
            marginTop: "10rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>Sorry we were unable to identify your tree</h3>
          <h5>
            <Link to="/">Back</Link>
          </h5>
        </div>
      ) : (
        <div>
          <table
            style={{
              margin: "100px 50px 50px 20px",
              textAlign: "center",
              justifyContent: "center",
              alignContent: "center",
              width: "90%",
              alignItems: "center",
            }}
          >
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Botanical Name </th>
                <th scope="col">Common Name </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Image">
                  <img
                    src={props.location.state.Image}
                    alt={props.location.state.BotanicalName}
                    style={{ height: "200px", width: "200px" }}
                  />
                </td>
                <td
                  data-label="Botanical Name -"
                  style={{ paddingTop: "50px" }}
                >
                  {props.location.state.BotanicalName}
                </td>
                <td data-label="Common Name -" style={{ paddingTop: "50px" }}>
                  {props.location.state.CommonName}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
export default Final;
