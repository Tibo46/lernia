import {
  Box,
  Card,
  CardContent,
  Grid2 as Grid,
  IconButton,
  List,
  ListItem,
  Stack,
} from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import HomeIcon from "../../assets/icons/HomeIcon";
import ExerciseIcon from "../../assets/icons/ExerciseIcon";
import SettingsIcon from "../../assets/icons/SettingsIcon";
import { colors } from "../../constants";
import MenuIcon from "../../assets/icons/MenuIcon";
import React from "react";
import CloseIcon from "../../assets/icons/CloseIcon";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <Grid container spacing={2} padding={2} minHeight="100vh">
      {!isMenuOpen && (
        <IconButton
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            background: "#fff",
            border: "1px solid #5b5860",
            width: "45px",
            height: "45px",
            position: "fixed",
            top: "10px",
            left: "10px",
            zIndex: 9,
          }}
          onClick={() => setIsMenuOpen(true)}
        >
          <MenuIcon width="25px" height="25px" />
        </IconButton>
      )}
      <Grid
        size={1}
        minHeight="100%"
        sx={{
          display: {
            xs: isMenuOpen ? "block" : "none",
            sm: isMenuOpen ? "block" : "none",
            md: "block",
            width: "120px",
          },
          ...(isMenuOpen
            ? {
                position: "fixed",
                top: "10px",
                bottom: "10px",
                left: "10px",
                zIndex: 1,
                height: "100%",
              }
            : {}),
        }}
      >
        <NavMenu handleCloseMenu={() => setIsMenuOpen(false)} />
      </Grid>
      <Grid
        sx={{
          width: { xs: "100%", sm: "100%", md: "calc(100% - 140px)" },
        }}
        minHeight="100%"
      >
        <Box
          sx={{
            height: "100%",
            paddingX: 2,
          }}
        >
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
};

const NavMenu: React.FC<{ handleCloseMenu: () => void }> = ({
  handleCloseMenu,
}) => {
  const location = useLocation();
  const { pathname } = location;

  const isCurrentPage = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.includes(path);
  };

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "20px",
        maxHeight: "calc(100vh - 33px)",
        border: {
          xs: "1px solid #E0E0E0",
          sm: "1px solid #E0E0E0",
          md: "none",
        },
      }}
    >
      <CardContent sx={{ height: "100%" }}>
        <Stack height="100%" justifyContent="space-between" alignItems="center">
          <Stack alignItems="center" textAlign="center" spacing={4}>
            <IconButton
              sx={{
                display: { xs: "block", sm: "block", md: "none" },
                background: "#fff",
                border: "1px solid #5b5860",
                width: "45px",
                height: "45px",
              }}
              onClick={handleCloseMenu}
            >
              <CloseIcon fontSize="22px" />
            </IconButton>
            <img src={logo} style={{ width: "50px" }} />
            <List>
              <ListItem>
                <IconButton
                  component={Link}
                  to="/"
                  sx={{
                    bgcolor: isCurrentPage("/")
                      ? colors.darkBackground
                      : colors.white,
                    borderRadius: "50%",
                    width: "60px",
                    height: "60px",
                  }}
                >
                  <HomeIcon
                    width="35px"
                    height="35px"
                    color={isCurrentPage("/") ? "#fff" : undefined}
                  />
                </IconButton>
              </ListItem>

              <ListItem>
                <IconButton
                  component={Link}
                  to="/exercises/"
                  sx={{
                    bgcolor: isCurrentPage("/exercises/")
                      ? colors.darkBackground
                      : colors.white,
                    borderRadius: "50%",
                    width: "60px",
                    height: "60px",
                  }}
                >
                  <ExerciseIcon
                    width="35px"
                    height="35px"
                    color={isCurrentPage("/exercises/") ? "#fff" : undefined}
                  />
                </IconButton>
              </ListItem>
            </List>
          </Stack>
          <List>
            <ListItem>
              <IconButton
                component={Link}
                to="/profile/"
                sx={{
                  bgcolor: isCurrentPage("/profile/")
                    ? colors.darkBackground
                    : colors.white,
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                }}
              >
                <SettingsIcon
                  width="35px"
                  height="35px"
                  color={isCurrentPage("/profile/") ? "#fff" : undefined}
                />
              </IconButton>
            </ListItem>
          </List>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Layout;
