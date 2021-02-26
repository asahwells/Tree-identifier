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
          className="card"
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
          <p style={{ marginTop: "5px" }}>
            <Link to="/">Try again</Link>
          </p>
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
          <div
            style={{
              textAlign: "center",
              marginTop: "-60px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignSelf: "center",
              width: "80%",
              padding: "20px",
              margin: " auto",
            }}
          >
            <h4>
              <Link to="/">Go Back</Link>
            </h4>
            <p>
              Doesn't match the tree you're trying to identify? <br /> Use the
              below button to contact us with the image of the tree you're
              trying to identify so we can help
            </p>
            <button>
              <a
                style={{ color: "white" }}
                href="https://treesidentifier.org.ng/contact-us/"
              >
                Contact Admin
              </a>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Final;
