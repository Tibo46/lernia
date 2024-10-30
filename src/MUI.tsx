import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { colors } from "./constants";

const theme = createTheme({
  typography: {
    fontFamily: "'Lato', sans-serif",
    subtitle1: {
      color: colors.secondary,
      marginBottom: "10px",
      textAlign: "center",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.4rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
    },
  },
  palette: {
    background: {
      default: colors.background,
    },
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    success: {
      main: colors.valid,
    },
    error: {
      main: colors.invalid,
    },
  },
  components: {
    // MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       textTransform: "capitalize",
    //       boxShadow: "rgba(251, 200, 79, 0.4) 7px 5px 0px",
    //     },
    //     contained: {
    //       textTransform: "capitalize",
    //       boxShadow: "rgba(251, 200, 79, 0.4) 7px 5px 0px",
    //     },
    //   },
    // },
    // MuiTooltip: {
    //   styleOverrides: {
    //     arrow: {
    //       color: "rgba(255, 255, 255, .9)",
    //     },
    //     tooltip: {
    //       backgroundColor: "rgba(255, 255, 255, .9)",
    //       padding: "1rem",
    //       color: "#000",
    //       fontSize: "1rem",
    //       textAlign: "center",
    //     },
    //   },
    // },
  },
});

export const MUI: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
