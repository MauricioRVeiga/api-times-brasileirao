import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Teams from "./pages/Teams";
import CreateTeam from "./pages/CreateTeam";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/new" element={<CreateTeam />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
