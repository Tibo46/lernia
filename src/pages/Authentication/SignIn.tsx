import {
  Grid2 as Grid,
  Typography,
  Button,
  TextField,
  Container,
  Stack,
} from "@mui/material";
import React from "react";
import GoogleIcon from "../../assets/icons/google.svg";
import { login, socialSignUp } from "../../services/auth";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC<{ handleSignUp: () => void }> = ({ handleSignUp }) => {
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
    }
  };

  return (
    <Container sx={{ height: "100%" }} maxWidth="sm">
      <Stack spacing={2} justifyContent="space-between" sx={{ height: "100%" }}>
        <Stack spacing={2}>
          <Typography variant="h1" textAlign="center">
            ¡Hola!
          </Typography>
          <Grid container={true} spacing={2}>
            <Grid size={12}>
              <Typography variant="subtitle1">Iniciar sesión con</Typography>
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
                  label="Correo Electrónico"
                  fullWidth={true}
                  value={email}
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
                  // helperText={<Link href="#">Forgot password?</Link>}
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
                  Iniciar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Stack>

        <Button variant="text" onClick={handleSignUp}>
          ¿No eres miembro? Regístrate ahora gratis
        </Button>
      </Stack>
    </Container>
  );
};

export default SignIn;
