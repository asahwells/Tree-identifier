import React from "react";
import { Link } from "react-router-dom";

const Second = ({ filteredCode }) => {
  return (
    <div
      style={{
        // marginTop: "10rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h5>Click next to view the result of your search</h5>
      {filteredCode.map((filt) => (
        <Link
          key={filt.code}
          to={{
            pathname: "/Result",
            state: {
              BotanicalName: filt.botanicalName,
              CommonName: filt.commonName,
              Image: filt.image,
            },
          }}
        >
          <button
            style={{
              width: "120px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Next
          </button>
        </Link>
      ))}
    </div>
  );
};

export default Second;
