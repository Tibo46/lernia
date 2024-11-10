import React from "react";
import { Grid2 as Grid } from "@mui/material";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Bg1 from "../../assets/background/study-1.jpg";

const Login = () => {
  const [isSignIn, setIsSignIn] = React.useState(true);

  return (
    <Grid container={true} style={{ minHeight: "100vh", height: "100%" }}>
      <Grid
        size={{
          xs: 12,
          sm: 6,
        }}
        display={{ xs: "none", sm: "block" }}
        style={{ backgroundImage: `url(${Bg1})`, backgroundSize: "cover" }}
      />
      <Grid
        size={{
          xs: 12,
          sm: 6,
        }}
        style={{ padding: "2rem" }}
      >
        {isSignIn ? (
          <SignIn handleSignUp={() => setIsSignIn(false)} />
        ) : (
          <SignUp handleSignIn={() => setIsSignIn(true)} />
        )}
      </Grid>
    </Grid>
  );
};

export default Login;
