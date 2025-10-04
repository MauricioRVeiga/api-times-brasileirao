// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32", // verde campo
    },
    secondary: {
      main: "#fdd835", // amarelo bola/seleção
    },
    error: {
      main: "#d32f2f", // vermelho cartão
    },
    background: {
      default: "#f4fdf4", // verde clarinho de fundo
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: {
      fontWeight: "bold",
      color: "#2e7d32",
    },
    h5: {
      fontWeight: "bold",
      color: "#1b5e20",
    },
    button: {
      textTransform: "none",
      fontWeight: "bold",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
