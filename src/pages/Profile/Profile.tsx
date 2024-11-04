import {
  Card,
  CardContent,
  Stack,
  Avatar,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";

const Profile = () => {
  const [user] = useAuthState(auth);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ height: "100%" }}>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={{ height: "100%" }}
        >
          <Stack alignItems="center" spacing={2}>
            <Avatar
              sx={{ width: "60px", height: "60px" }}
              src={user?.photoURL ?? undefined}
            >
              {!user?.photoURL && user?.displayName?.substring(0, 1)}
            </Avatar>
            <Typography variant="h2">{user!.displayName}</Typography>
          </Stack>
          <Stack alignItems="center" spacing={2}>
            <Typography textAlign="center">
              Tus estadísticas aparecerán aquí una vez que empieces a practicar.
            </Typography>
            <Button variant="contained" onClick={handleSignOut}>
              Cerrar sesión
            </Button>
          </Stack>
          <Box></Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Profile;
