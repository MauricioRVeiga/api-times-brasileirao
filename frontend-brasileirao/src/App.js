import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Teams from "./pages/Teams";
import CreateTeam from "./pages/CreateTeam";
import EditTeam from "./pages/EditTeam";

function AppContent() {
  const location = useLocation();

  // Se a rota atual for "/" (Login) ou "/register" (Cadastro), não mostra Header nem Footer
  const hideLayout =
    location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {!hideLayout && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/new" element={<CreateTeam />} />
        <Route path="/teams/edit/:id" element={<EditTeam />} />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
