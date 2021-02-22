import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Navbar from "./NavBar";
import Loader from "./Loading";
// import FormLabel from "@material-ui/core/FormLabel";
// import Data from "./Data";
import { Link } from "react-router-dom";
// import Final from "./Final";
import firebase from "./Fire";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
});
// const Questions = [
//   "Does it have leaves?",
//   "Are the leaves broad?",
//   "is the leaf green?",
//   "is it tall",
// ];
export default function Text() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [data, setData] = useState([]);
  const [questdata, setQuestdata] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();
    let newdata = [];
    db.collection("answers")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => newdata.push(doc.data()));
        setData(newdata);
      });
  }, []);
  useEffect(() => {
    const db = firebase.firestore();
    db.collection("questions")
      .get()
      .then((querySnapshot) => {
        const fetchedData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedData.push(data);
        });
        setQuestdata(fetchedData);
      });
  }, []);
  const handleNext = () => {
    setBinary([...binary, value]);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setValue("");
  };

  const handleBack = () => {
    const lastItemRemoved = binary.pop();
    setBinary(binary);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    console.log(lastItemRemoved);
  };

  const [value, setValue] = React.useState("1");
  const [binary, setBinary] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // kpk

  const tree = data;
  // const newTree = tree.map((trees) => trees.code);
  const filteredCode = tree.filter((tre) => {
    return tre.code.indexOf(binary.join()) !== -1;
  });
  // console.log(data);
  // const getCode = (code) => {
  //   const index = tree.find((item) => item.code === code);

  //   return index.code;
  // };
  const newquest = questdata.map((da) => da);
  const newValue = [newquest[activeStep]];
  // const number = questdata.map((da) => da.number);

  // console.log(newquest);

  return (
    <div>
      <Navbar />
      {isLoading === true ? (
        <Loader />
      ) : (
        <div className="card">
          {newquest.length !== activeStep ? (
            <div className="card-body">
              {newValue.map((i) => (
                <div key={i}>
                  <h3 className="card-title" style={{ marginTop: "30px" }}>
                    {i.number}. {i.Question}
                  </h3>
                  <FormControl component="fieldset">
                    {/* <FormLabel component="legend">Questions</FormLabel> */}
                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      value={value}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio color="primary" />}
                        label="Yes"
                        style={{ paddingTop: "20px" }}
                      />
                      <FormControlLabel
                        value="0"
                        control={<Radio color="primary" />}
                        label="No"
                        style={{ paddingTop: "20px" }}
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              ))}
              <MobileStepper
                style={{ marginTop: "30px" }}
                variant="progress"
                steps={newquest.length}
                position="static"
                activeStep={activeStep}
                className={classes.root}
                nextButton={
                  <Button
                    size="large"
                    style={{ width: "10rem" }}
                    onClick={handleNext}
                    disabled={activeStep === newquest.length || value === ""}
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
                    style={{ width: "10rem" }}
                    size="large"
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
            </div>
          ) : (
            <>
              <div
                style={{
                  marginTop: "10rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>Click next to view the result of your search</div>
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
                        width: "20rem",
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
            </>
          )}
        </div>
      )}
    </div>
  );
}
