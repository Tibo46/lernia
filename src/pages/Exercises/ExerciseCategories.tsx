import {
  Card,
  CardActionArea,
  CardContent,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";

const ExerciseCategories = () => {
  const { categories } = useCategories();
  return (
    <Grid container={true} spacing={2}>
      <Grid size={12} mb={2}>
        <Typography variant="h1">¿Qué quieres estudiar?</Typography>
      </Grid>
      {categories?.map((category) => (
        <Grid
          key={category.id}
          size={{
            xs: 12,
            sm: 6,
            md: 4,
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
                <Typography>{category.description}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ExerciseCategories;
