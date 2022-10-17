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
  const handleButtonClick = () => {
    if (phone && password) {
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
          // error={emailError}
          onChange={(e) => setPhone(e.target.value)}
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
          // error={passwordError}
          // helperText={passwordError ? 'Please provide password' : ''}
          value={password}
          variant="standard"
          onChange={(e) => setPassword(e.target.value)}
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
