import {
  Grid2 as Grid,
  Typography,
  TextField,
  Button,
  Container,
  Stack,
} from "@mui/material";
import React from "react";
import { register, socialSignUp } from "../../services/auth";
import GoogleIcon from "../../assets/icons/google.svg";
import { useNavigate } from "react-router-dom";
// import FacebookIcon from '../../assets/icons/facebook.svg';

const SignUp: React.FC<{
  handleSignIn: () => void;
}> = ({ handleSignIn }) => {
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
    }
  };

  return (
    <Container sx={{ height: "100%" }} maxWidth="sm">
      <Stack spacing={2} justifyContent="space-between" sx={{ height: "100%" }}>
        <Stack spacing={2}>
          <Typography variant="h1" textAlign="center">
            Regístrate gratis
          </Typography>
          <Grid container={true} spacing={2}>
            <Grid size={12}>
              <Typography variant="subtitle1">Regístrate con</Typography>
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
              variant="outlined"
              fullWidth={true}
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
              <Typography variant="subtitle1">
                O con tu correo electrónico
              </Typography>
            </Grid>
          </Grid>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Grid container={true} spacing={2}>
              <Grid size={12}>
                <TextField
                  label="Nombre"
                  value={username}
                  fullWidth={true}
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                  type="text"
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  label="Correo Electrónico"
                  value={email}
                  fullWidth={true}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  type="email"
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  label="Contraseña"
                  value={password}
                  fullWidth={true}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  type="password"
                />
              </Grid>
              <Grid size={12}>
                <Button
                  type="submit"
                  disableElevation={false}
                  disabled={loading}
                  fullWidth={true}
                  variant="contained"
                >
                  Regístrate
                </Button>
              </Grid>
            </Grid>
          </form>
        </Stack>
        <Button variant="text" onClick={handleSignIn}>
          ¿Ya eres miembro? Inicia sesión
        </Button>
      </Stack>
    </Container>
  );
};

export default SignUp;
