import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// import { Form } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "45ch",
  },
}));

const Login = (props) => {
  const {
    handleLogin,
    setEmail,
    email,
    pass,
    setPass,
    emailError,
    passError,
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  // const [value, setValue] = useState(false);

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  console.log(email);
  const classes = useStyles();
  return (
    <section className="login">
      <div className="loginContainer">
        {/* <h3 style={{ marginTop: "5rem" }}>Tree Identifier Admin Panel</h3> */}
        {/* <label>Username</label>
        <input
          type="text"
          required
          value=""
          onChange={(e) => setEmail(e.target.value)}
        /> */}
        <form autoComplete="on" style={{ width: "40rem" }}>
          <TextField
            id="outlined-email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
          />
          <p className="errorMsg">{emailError}</p>
          <FormControl className={clsx(classes.margin)}>
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              endAdornment={
                <InputAdornment position="end" autocomplete="current-password">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <p className="errorMsg">{passError}</p>
        </form>
        <div className="btnContainer">
          <button onClick={handleLogin}>Sign In</button>
        </div>
        {/* <label>password</label>
        <input
          type="text"
          autoFocus
          required
          value={value}
          onChange={handleChange}
        /> */}
      </div>
    </section>
  );
};

export default Login;
