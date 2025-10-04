import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Paper, Box } from "@mui/material";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/register", { username, password });
      alert("Usuário cadastrado com sucesso!");
      navigate("/"); // volta para login
    } catch (err) {
      alert("Erro ao cadastrar usuário");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Cadastrar Usuário
        </Typography>
        <Box component="form" onSubmit={handleRegister} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;
