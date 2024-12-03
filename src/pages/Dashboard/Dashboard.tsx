import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import GraphIcon from "../../assets/icons/GraphIcon";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const { categories } = useCategories();
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
      <Grid
        container={true}
        spacing={4}
        height="100%"
        direction={{
          xs: "column-reverse",
          sm: "column-reverse",
          md: "row",
        }}
      >
        <Grid
          size={{
            sm: 12,
            md: 8,
          }}
          container={true}
          spacing={2}
          alignContent="baseline"
        >
          <Grid size={12} mb={2}>
            <Typography
              variant="h1"
              sx={{
                marginTop: {
                  md: "45px",
                  sm: "0",
                },
              }}
            >
              Empieza a practicar inglés
            </Typography>
          </Grid>
          {categories?.map((category) => (
            <Grid
              key={category.id}
              size={{
                xs: 12,
                sm: 6,
                md: 6,
                lg: 4,
                xl: 3,
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  transition: "box-shadow 0.5s ease",
                  backgroundColor: category.color,
                  "&:hover": {
                    boxShadow: "3px 6px 12px 3px rgba(0, 0, 0, 0.2)",
                    transition: "box-shadow 0.5s ease",
                  },
                }}
              >
                <CardActionArea
                  sx={{ height: "100%" }}
                  component={Link}
                  to={`/exercises/${category.id}`}
                >
                  <CardContent sx={{ height: "100%" }}>
                    <Typography variant="h2">{category.name}</Typography>
                    <Typography sx={{ textAlign: "justify" }}>
                      {category.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid
          size={{
            sm: 12,
            md: 4,
          }}
        >
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
                  <GraphIcon height="100px" width="100px" />
                  <Typography textAlign="center">
                    Tus estadísticas aparecerán aquí una vez que empieces a
                    practicar.
                  </Typography>
                </Stack>
                <Box></Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
