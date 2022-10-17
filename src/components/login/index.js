import "./styles.css";
import * as React from "react";
import { useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material/";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ButtonCustom from "../shared/button";
function Login({ loginRequest, isLoginRequested, isLoginError, token }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleButtonClick = () => {
    const re = /^[0-10\b]{0,10}$/;
    let isError = false;
    if (phone.length !== 10 || re.test(phone)) {
      isError = true;
      setPhoneError(true);
    }
    if (password == "") {
      setPasswordError(true);
      isError = true;
    }

    if (!isError) {
      loginRequest({ phone: parseInt(phone), password });
    }
  };
  const renderLoader = () => {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  };
  const renderErrorMessage = () => {
    return <p className="error-message">{isLoginError}</p>;
  };
  return (
    <div className="login-container">
      <CssBaseline />
      <Box>
        <p className="page-title ">Login to your Glowloc Account</p>
        {/* <h1>Login to your Glowloc Account</h1> */}
        {isLoginError && renderErrorMessage()}
        <TextField
          margin="normal"
          required
          fullWidth
          variant="standard"
          id="phone"
          label="Phone number"
          type="text"
          name="phone"
          value={phone}
          helperText={phoneError ? "Please provide Vaild Phone Number" : ""}
          error={phoneError}
          maxLength={10}
          InputProps={{ inputProps: { maxLength: 10 } }}
          onChange={(event) => {
            const { value } = event.target;
            setPhone(value);
            setPhoneError(false);
          }}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          error={passwordError}
          helperText={passwordError ? "Please provide password" : ""}
          value={password}
          variant="standard"
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(false);
          }}
        />
        <ButtonCustom
          handleButtonClick={handleButtonClick}
          isFullWidth={true}
          title="SIGN IN"
        />
        {isLoginRequested && renderLoader(token)}
      </Box>
    </div>
  );
}

export default Login;
