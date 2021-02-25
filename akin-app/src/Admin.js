import React, { useState, useEffect } from "react";
// import Data from "./Data";
import MobileStepper from "@material-ui/core/MobileStepper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import firebase from "./Fire";
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
    minWidth: "130vh",
    flexGrow: 1,
    flexWrap: "wrap",
    flex: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  input: {
    // display: "none",
  },
}));

const Admin = ({ handleLogout }) => {
  const classes = useStyles();
  const theme = useTheme();
  // const codeArray = Data;
  // const [url, setUrl] = useState("");
  const [activeStep, setActiveStep] = React.useState(0);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleNext = () => {
    const db = firebase.firestore();
    newValue.forEach((val) => {
      db.collection("answers").doc(val.code).update(val);
    });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setOpen(true);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2500);
  // }, []);
  // const [ractiveStep, setRactiveStep] = useState();
  // const [numberOfConfigFS, setNumberOfConfigFS] = useState([]);
  // const defaultOutcomeDetails = {
  //   botanicalName: "",
  //   commonName: "",
  //   image: "",
  // };
  const [code, setCode] = useState([]);

  // const [code, setCode] = useState(
  //   codeArray.map((x, i) => ({
  //     code: x,
  //     ...defaultOutcomeDetails,
  //   }))
  // );

  useEffect(() => {
    firebase
      .firestore()
      .collection("answers")
      .get()
      .then((snapshot) => {
        const fetchedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCode(fetchedData);
        // console.log(fetchedData);
      });
    setIsLoading(true);
  }, []);
  // useEffect(() => {
  //   code.forEach((element) => {
  //     firebase.firestore().collection("answers").doc(element.code).set(element);
  //   });
  // }, []);

  const maxSteps = code.length;
  const newValue = code.slice(activeStep * 100, activeStep * 100 + 100);
  // console.log(newValue);
  const handleBotanicalName = (codeName, value) => {
    const newCodeArray = [...code];
    const newArray = newCodeArray.map((codeVal) => {
      if (codeName === codeVal.code) {
        return { ...codeVal, botanicalName: value };
      }
      return codeVal;
    });
    setCode(newArray);
  };

  const handleCommonName = (codeName, value) => {
    const newCodeArray = [...code];
    const newArray = newCodeArray.map((codeVal) => {
      if (codeName === codeVal.code) {
        return { ...codeVal, commonName: value };
      }
      return codeVal;
    });
    setCode(newArray);
  };
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const upload = (codeName) => {
    const ref = firebase.storage().ref(`images/${image.name}`).put(image);
    ref.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        firebase
          .storage()
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            alert("image uploaded");
            const newCodeArray = [...code];
            const newArray = newCodeArray.map((codeVal) => {
              if (codeName === codeVal.code) {
                return { ...codeVal, image: url };
              }
              return codeVal;
            });
            setCode(newArray);
          });
      }
    );
  };

  return (
    <section className="hero">
      <nav>
        <h4>
          <img src={Icon} alt="tree" width="50px" height="50px" />
          Tree identifier
        </h4>
        <Link to="/history">
          <button> History</button>
        </Link>
        <Link to="/question">
          <button> Questions</button>
        </Link>

        <button onClick={handleLogout}> logout</button>
      </nav>

      <div className={classes.root}>
        {isLoading ? (
          <>
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                style={{
                  flexDirection: "row",
                  display: "flex",
                  marginTop: "10px",
                }}
              >
                <h4
                  style={{ marginLeft: "20px", width: "14rem", color: "black" }}
                >
                  Binary Code
                </h4>
                <h4 style={{ width: "14rem", color: "black" }}>
                  Botanical Name
                </h4>
                <h4 style={{ width: "16rem", color: "black" }}> Common Name</h4>
              </Grid>
              {newValue.map((co, i) => (
                <Grid
                  item
                  xs={12}
                  style={{ flexDirection: "row", display: "flex" }}
                >
                  {/* <Grid item xs> */}
                  <input
                    className={classes.header}
                    type="text"
                    autoFocus
                    disabled
                    value={co.code}
                  />
                  {/* </Grid>
           <Grid item xs> */}
                  <input
                    className={classes.header}
                    type="text"
                    autoFocus
                    required
                    value={co.botanicalName}
                    onChange={(e) =>
                      handleBotanicalName(co.code, e.target.value)
                    }
                  />
                  {/* </Grid> */}
                  {/* <Grid item xs> */}
                  <input
                    className={classes.header}
                    type="text"
                    autoFocus
                    required
                    value={co.commonName}
                    onChange={(e) => handleCommonName(co.code, e.target.value)}
                  />

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="photo"
                      multiple
                      type="file"
                      onChange={handleChange}
                    />
                    {co.image !== "" ? (
                      <progress value={progress} max="100" />
                    ) : null}

                    <label htmlFor="contained-button-file">
                      <Button
                        style={{ fontSize: "1rem" }}
                        variant="contained"
                        color="primary"
                        onClick={() => upload(co.code)}
                        component="span"
                      >
                        Upload
                      </Button>
                    </label>
                  </div>
                  {co.image !== "" ? (
                    <img
                      src={co.image || ""}
                      alt={co.botanicalName}
                      style={{ height: 90, width: 90, marginLeft: "-70px" }}
                    />
                  ) : null}

                  {/* </Grid> */}
                </Grid>
              ))}
            </Grid>
            <MobileStepper
              steps={Math.ceil(maxSteps / 100)}
              position="static"
              variant="text"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                The answers has been updated successfully
              </Alert>
            </Snackbar>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </section>
  );
};
export default Admin;
