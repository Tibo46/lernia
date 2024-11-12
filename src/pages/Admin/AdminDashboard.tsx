import { useAllUsers } from "../../hooks/useAllUsers";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid2 as Grid,
} from "@mui/material";

const AdminDashboard = () => {
  const { user } = useCurrentUser();
  const { users } = useAllUsers();

  if (!user?.isAdmin) {
    return <div>Nope.</div>;
  }

  return (
    <Box
      height="100%"
      sx={{
        paddingTop: {
          xs: "50px",
          sm: "50px",
          md: "0",
        },
      }}
    >
      <Grid container={true} spacing={4} height="100%">
        <Grid
          size={{
            sm: 12,
          }}
          container={true}
          spacing={2}
          alignContent="baseline"
        >
          <Grid size={12}>
            <Typography variant="h1" mb={2}>
              Hola {user.name}
            </Typography>
            <Grid container spacing={2}>
              <CardStats title="Number of users" value={users?.length || 0} />
              <CardStats title="Completed exercises" value={451} />
              <CardStats title="In Progress exercises" value={45} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const CardStats = ({ title, value }: { title: string; value: number }) => {
  return (
    <Grid
      size={{
        xs: 12,
        sm: 4,
      }}
    >
      <Card
        sx={{
          height: "100%",
          transition: "box-shadow 0.5s ease",
        }}
      >
        <CardContent sx={{ height: "100%" }}>
          <Typography variant="h2">{title}</Typography>
          <Typography>{value}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default AdminDashboard;
