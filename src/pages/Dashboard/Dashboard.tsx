import {
  Card,
  CardActionArea,
  CardContent,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";

const Dashboard = () => {
  const { categories } = useCategories();
  return (
    <Grid container={true} spacing={2}>
      {categories?.map((category) => (
        <Grid key={category.id} size={4}>
          <Card
            sx={{
              height: "100%",
              boxShadow: "3px 6px 12px 3px rgba(0, 0, 0, 0.11)",
              borderRadius: "2px 2px 20px 20px",
              transition: "box-shadow 0.5s ease",
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

export default Dashboard;
