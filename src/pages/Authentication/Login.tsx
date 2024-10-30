import React from "react";
import { Grid2 as Grid } from "@mui/material";
import Button from "@mui/material/Button";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Login = () => {
  const [isSignInModalOpen, setIsSignInModalOpen] = React.useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = React.useState(false);

  return (
    <Grid container={true} style={{ minHeight: "100vh", height: "100%" }}>
      <>
        {/* <Logo size="large" /> */}
        <Grid container={true}>
          <Button
            color="primary"
            style={{ marginRight: "20px" }}
            onClick={() => setIsSignInModalOpen(true)}
          >
            Sign In
          </Button>
          <Button color="secondary" onClick={() => setIsSignUpModalOpen(true)}>
            Sign Up
          </Button>
        </Grid>
      </>
      <SignIn
        isOpen={isSignInModalOpen}
        handleSignInClose={() => setIsSignInModalOpen(false)}
        handleOpenSignUp={() => {
          setIsSignInModalOpen(false);
          setIsSignUpModalOpen(true);
        }}
      />
      <SignUp
        isOpen={isSignUpModalOpen}
        handleSignUpClose={() => setIsSignUpModalOpen(false)}
        handleOpenSignIn={() => {
          setIsSignUpModalOpen(false);
          setIsSignInModalOpen(true);
        }}
      />
    </Grid>
  );
};

export default Login;
