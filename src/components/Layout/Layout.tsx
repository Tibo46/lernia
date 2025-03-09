import {
  Box,
  Card,
  CardContent,
  Grid2 as Grid,
  IconButton,
  List,
  ListItemButton,
  Stack,
  styled,
  Typography,
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
import { useCurrentUser } from "../../hooks/useCurrentUser";
import AdminIcon from "../../assets/icons/AdminIcon";
import AdminQuestionsIcon from "../../assets/icons/AdminQuestionsIcon";
import CategoriesIcon from "../../assets/icons/CategoriesIcon";
import { usePage } from "../../contexts/PageContext";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const { showNavigation } = usePage();

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <Grid container spacing={2} padding={2} minHeight="100vh">
      {/* {!showNavigation && <img src={logo} style={{ width: "50px" }} />} */}
      {!isMenuOpen && showNavigation && (
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
      {showNavigation && (
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
      )}
      <Grid
        sx={{
          width: showNavigation
            ? { xs: "100%", sm: "100%", md: "calc(100% - 140px)" }
            : "100%",
          marginLeft: showNavigation ? undefined : 0,
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
  const { user } = useCurrentUser();

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
              <LinkButton
                to="/"
                icon={<HomeIcon width="35px" height="35px" />}
                text="Inicio"
                strict
              />
              {/* <ListItemMenu>
                <IconButton
                  component={Link}
                  to="/"
                  sx={{
                    bgcolor: isCurrentPage("/", true)
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
                    color={isCurrentPage("/", true) ? "#fff" : undefined}
                  />
                </IconButton>
                <Typography>Inicio</Typography>
              </ListItemMenu> */}

              <LinkButton
                to="/exercises/"
                icon={<ExerciseIcon width="35px" height="35px" />}
                text="Ejercicios"
              />
            </List>
          </Stack>
          {user && user.isAdmin && (
            <List>
              <LinkButton
                to="/admin/"
                icon={<AdminIcon width="35px" height="35px" />}
                text="Admin"
                strict
              />
              <LinkButton
                to="/admin/categories"
                icon={<CategoriesIcon width="35px" height="35px" />}
                text="Categorías"
              />
              <LinkButton
                to="/admin/questions"
                icon={<AdminQuestionsIcon width="35px" height="35px" />}
                text="Preguntas"
              />
            </List>
          )}
          <List>
            <LinkButton
              to="/profile/"
              icon={<SettingsIcon width="35px" height="35px" />}
              text="Perfil"
            />
          </List>
        </Stack>
      </CardContent>
    </Card>
  );
};

const LinkButton = ({
  to,
  icon,
  text,
  strict,
}: {
  to: string;
  icon: React.ReactNode;
  text: string;
  strict?: boolean;
}) => {
  const location = useLocation();
  const { pathname } = location;

  const isCurrentPage = (path: string, strict?: boolean) => {
    return strict ? path === pathname : pathname.includes(path);
  };

  return (
    // @ts-expect-error ignore
    <ListItemMenu component={Link} to={to}>
      <IconButton
        sx={{
          border: isCurrentPage(to, strict)
            ? `1px solid ${colors.darkBackground}`
            : `1px solid ${colors.white}`,
          borderRadius: "50%",
          width: "60px",
          height: "60px",
        }}
      >
        {icon}
      </IconButton>
      <Typography>{text}</Typography>
    </ListItemMenu>
  );
};
const ListItemMenu = styled(ListItemButton)({
  flexDirection: "column",
});

export default Layout;
