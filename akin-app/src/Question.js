import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import firebase from "./Fire";
// import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Loader from "./Loading";
import Icon from "./tree.svg";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
const Question = ({ handleLogout }) => {
  // const [value, setValue] = useState("");
  // const [Dvalue, setDvalue] = useState("");
  // const code = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  // const defaultOutcomeDetails = {
  //   Question: "",
  //   Description: "",
  // };
  const [quest, setQuest] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // code.map((x, i) => ({
  //   number: x,
  //   ...defaultOutcomeDetails,
  // }))

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  // console.log(quest);
  useEffect(() => {
    firebase
      .firestore()
      .collection("questions")
      .get()
      .then((snapshot) => {
        const fetchedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuest(fetchedData);
        console.log(fetchedData);
      });
  }, []);
  const handleChange = (num, value) => {
    const newNub = [...quest];
    const newQuest = newNub.map((questValue) => {
      if (num === questValue.number) {
        return { ...questValue, Question: value };
      }
      return questValue;
    });
    setQuest(newQuest);
  };
  const handleChange2 = (num, value) => {
    const newNub = [...quest];
    const newQuest = newNub.map((questValue) => {
      if (num === questValue.number) {
        return { ...questValue, Description: value };
      }
      return questValue;
    });
    setQuest(newQuest);
  };
  const handleSave = () => {
    const db = firebase.firestore();
    quest.forEach((val) => {
      db.collection("questions").doc(val.number).update(val);
    });
    setOpen(true);
  };
  // useEffect(() => {
  //   quest.forEach((element) => {
  //     firebase
  //       .firestore()
  //       .collection("questions")
  //       .doc(element.number)
  //       .set(element);
  //   });
  // }, []);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);
  const classes = useStyles();

  return (
    <section className="hero">
      <nav>
        <h4>
          <img src={Icon} alt="tree" width="50px" height="50px" />
          Tree identifier
        </h4>

        <Link to="/adminPage">
          <button> Answers</button>
        </Link>
        <button onClick={handleLogout}> logout</button>
      </nav>

      <div style={{ marginTop: "2rem", height: "100%", width: "100%" }}>
        {isLoading === true ? (
          <Loader />
        ) : (
          <>
            {quest.map((co, i) => (
              <>
                <ol
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <li
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ marginLeft: "5rem" }}>
                      <TextField
                        id="standard-multiline-flexible"
                        label="Question"
                        multiline
                        rowsMax={4}
                        value={co.Question}
                        color="primary"
                        onChange={(e) =>
                          handleChange(co.number, e.target.value)
                        }
                      />
                    </div>
                    <div style={{ marginLeft: "10rem" }}>
                      <TextField
                        id="standard-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        color="primary"
                        value={co.Description}
                        onChange={(e) =>
                          handleChange2(co.number, e.target.value)
                        }
                      />
                    </div>
                  </li>
                </ol>
              </>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  width: "20rem",
                  borderRadius: "10px",
                }}
                onClick={handleSave}
              >
                Save
              </button>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                The Answers has been updated successfully
              </Alert>
            </Snackbar>
          </>
        )}
      </div>
    </section>
  );
};

export default Question;
