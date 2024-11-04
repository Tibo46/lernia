import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid2 as Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import React from "react";
import { register, socialSignUp } from "../../services/auth";
import GoogleIcon from "../../assets/icons/google.svg";
import { useNavigate } from "react-router-dom";
// import FacebookIcon from '../../assets/icons/facebook.svg';

const SignUp: React.FC<{
  isOpen: boolean;
  handleSignUpClose: () => void;
  handleOpenSignIn: () => void;
}> = ({ isOpen, handleSignUpClose, handleOpenSignIn }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await register(email, password, username);
      setLoading(false);

      if (result === "email-already-in-use" || result === undefined) {
        // toast.error(
        //   `Registration failed, make sure your password is strong enough and that you do not have an account with this email address already`,
        //   {
        //     position: toast.POSITION.BOTTOM_CENTER,
        //   }
        // );
        return;
      }
      navigate("/");
    } catch {
      setLoading(false);
      handleSignUpClose();
      // toast.error(
      //   `Registration failed, make sure your password is strong enough and that you do not have an account with this email address already`,
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
      // toast.error(`Registration failed`, {
      //   position: toast.POSITION.BOTTOM_CENTER,
      // });
      return;
    } finally {
      setLoading(false);
      handleSignUpClose();
    }
  };

  return (
    <Dialog
      open={isOpen}
      fullWidth={true}
      maxWidth="sm"
      onClose={handleSignUpClose}
    >
      <DialogTitle>Join Lernia for free</DialogTitle>
      <DialogContent>
        <Button variant="text" onClick={handleOpenSignIn}>
          Already a member? Sign In
        </Button>
        <Grid container={true} spacing={2}>
          <Grid size={12}>
            <Typography variant="subtitle1">Sign up using</Typography>
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
                label="Name"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                type="text"
              />
            </Grid>

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
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                type="password"
              />
            </Grid>
            <Grid size={12}>
              <Button type="submit" disableElevation={false} disabled={loading}>
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignUp;
