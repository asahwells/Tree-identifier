import React from "react";
import { Table } from "react-bootstrap";
// import Table from './'
// import { makeStyles, useTheme } from "@material-ui/core/styles";

// const useStyle = makeStyles({

// })
export default function Final({ BotanicalName, CommonName, Image }) {
  // const classes = useStyles();
  //   const theme = useTheme();
  //   console.log(Image);
  return (
    <Table
      striped
      bordered
      hover
      style={{
        margin: "100px 50px 50px 20px",
        textAlign: "center",
        justifyContent: "center",
        alignContent: "center",
        width: "90%",
        alignItems: "center",
      }}
    >
      <>
        <thead>
          <tr>
            <th>Image</th>
            <th>Botanical Name</th>
            <th>Common Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img
                src={Image}
                alt={BotanicalName}
                style={{ height: "200px", width: "200px" }}
              />
            </td>
            <td style={{ paddingTop: "50px" }}>
              <h3>{BotanicalName}</h3>
            </td>
            <td style={{ paddingTop: "50px" }}>
              {" "}
              <h3>{CommonName}</h3>
            </td>
          </tr>
        </tbody>
      </>
    </Table>
  );
}
