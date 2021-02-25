/* eslint-disable jsx-a11y/scope */
import React from "react";
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
            marginTop: "4rem",
            display: "flex",
            textAlign: "center",
            padding: "30px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h5>
            Sorry we were unable to identify your tree, Please contact admin and
            upload the picture of the tree you're identifying. You will be
            contacted with the tree name within few hours.
          </h5>
          <button>
            <a
              style={{ color: "white" }}
              href="https://treesidentifier.org.ng/contact-us/"
            >
              Contact Admin
            </a>
          </button>
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
                  style={{ fontStyle: "italic" }}
                >
                  {props.location.state.BotanicalName}
                </td>
                <td data-label="Common Name -">
                  {props.location.state.CommonName}
                </td>
              </tr>
            </tbody>
          </table>
          <h4 style={{ textAlign: "center", marginTop: "-40px" }}>
            <Link to="/">Go Back</Link>
          </h4>
        </div>
      )}
    </>
  );
};
export default Final;
