import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid2 as Grid,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import React from "react";
import GoogleIcon from "../../assets/icons/google.svg";
import { login, socialSignUp } from "../../services/auth";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC<{
  isOpen: boolean;
  handleSignInClose: () => void;
  handleOpenSignUp: () => void;
}> = ({ isOpen, handleSignInClose, handleOpenSignUp }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await login(email, password);

      setLoading(false);
      if (!result.user) {
        // toast.error(
        //   `Login failed, please check your password and email address`,
        //   {
        //     position: toast.POSITION.BOTTOM_CENTER,
        //   }
        // );
        return;
      }
      navigate("/");
    } catch {
      setLoading(false);
      handleSignInClose();
      // toast.error(
      //   `Login failed, please check your password and email address`,
      //   {
      //     position: toast.POSITION.BOTTOM_CENTER,
      //   }
      // );
    }
  };
  const handleSocialSignIn = async (socialNetwork: "facebook" | "google") => {
    setLoading(true);
    try {
      await socialSignUp(socialNetwork);
      navigate("/");
    } catch {
      // toast.error(`Login failed`, {
      //   position: toast.POSITION.BOTTOM_CENTER,
      // });
      return;
    } finally {
      setLoading(false);
      handleSignInClose();
    }
  };

  return (
    <Dialog
      open={isOpen}
      fullWidth={true}
      maxWidth="sm"
      onClose={handleSignInClose}
    >
      <DialogTitle>Welcome back</DialogTitle>
      <DialogContent>
        <Button variant="text" onClick={handleOpenSignUp}>
          Not a member? Sign up now
        </Button>
        <Grid container={true} spacing={2}>
          <Grid size={12}>
            <Typography variant="subtitle1">Sign in using</Typography>
          </Grid>
        </Grid>
        <Grid container={true}>
          <Button
            startIcon={
              <img
                src={GoogleIcon}
                style={{ width: "25px" }}
                alt="Login with Google"
              />
            }
            variant="text"
            onClick={() => handleSocialSignIn("google")}
          >
            Google
          </Button>
          {/* <Button
            startIcon={
              <img
                src={FacebookIcon}
                style={{ width: '25px' }}
                alt="Login with Facebook"
              />
            }
            variant="text"
            onClick={() => handleSocialSignIn('facebook')}
          >
            Facebook
          </Button> */}
        </Grid>
        <Grid container={true} spacing={2}>
          <Grid size={12}>
            <Typography variant="subtitle1">Or with your email</Typography>
          </Grid>
        </Grid>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Grid container={true} spacing={2}>
            <Grid size={12}>
              <TextField
                label="Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                type="email"
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Password"
                value={password}
                // helperText={<Link href="#">Forgot password?</Link>}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                type="password"
              />
            </Grid>
            <Grid size={12}>
              <Button type="submit" disableElevation={false} disabled={loading}>
                Sign In
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignIn;
