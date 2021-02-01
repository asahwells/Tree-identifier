import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";
import Data from "./Data";
// import { Link } from "react-router-dom";
import Final from "./Final";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
});
const Questions = [
  "Does it have leaves?",
  "Are the leaves broad?",
  "is the leaf green?",
  "is it tall",
];
export default function Text() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

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

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // kpk

  const tree = Data;
  // const newTree = tree.map((trees) => trees.code);
  const filteredCode = tree.filter((tre) => {
    return tre.code.indexOf(binary.join()) !== -1;
  });
  console.log(filteredCode);
  // const getCode = (code) => {
  //   const index = tree.find((item) => item.code === code);

  //   return index.code;
  // };

  const newValue = [Questions[activeStep]];

  return (
    <div>
      {Questions.length !== activeStep ? (
        <>
          {newValue.map((i) => (
            <div style={{ margin: "100px 0 0 20px" }} key={i}>
              <h3 style={{ marginTop: "30px" }}>{i}</h3>
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
            steps={Questions.length}
            position="static"
            activeStep={activeStep}
            className={classes.root}
            nextButton={
              <Button
                size="large"
                onClick={handleNext}
                disabled={activeStep === Questions.length || value === ""}
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
        </>
      ) : (
        <>
          {filteredCode.map((filt) => (
            <Final
              key={filt.id}
              BotanicalName={filt.BotanicalName}
              CommonName={filt.CommonName}
              Image={filt.images}
            />
          ))}
        </>
      )}
    </div>
  );
}
