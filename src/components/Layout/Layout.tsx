import {
  Card,
  CardContent,
  Collapse,
  Grid2 as Grid,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link, Outlet } from "react-router-dom";
import React from "react";
import { useCategories } from "../../hooks/useCategories";

const Layout = () => {
  const { categories } = useCategories();
  const [openPracticarGramatica, setOpenPracticarGramatica] =
    React.useState(false);

  return (
    <Grid container spacing={2} padding={2} minHeight="100vh">
      <Grid size={3} minHeight="100%">
        <Card sx={{ height: "100%" }}>
          <CardContent>
            <List>
              <ListItemButton component={Link} to="/">
                Dashboard
              </ListItemButton>
              <ListItemButton
                onClick={() =>
                  setOpenPracticarGramatica(!openPracticarGramatica)
                }
              >
                <ListItemText primary="Practicar gramática" />
                {openPracticarGramatica ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                in={openPracticarGramatica}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding sx={{ pl: 4 }}>
                  {categories?.map((category) => (
                    <ListItemButton
                      component={Link}
                      to={`/exercises/${category.id}`}
                      key={category.id}
                    >
                      {category.name}
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </List>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={9} minHeight="100%">
        <Card sx={{ height: "100%" }}>
          <CardContent sx={{ height: "100%" }}>
            <Outlet />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Layout;
