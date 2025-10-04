import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
} from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/login", { username, password });

      // salva token
      localStorage.setItem("token", res.data.token);

      // salva username (se o back-end retornar)
      if (res.data.username) {
        localStorage.setItem("username", res.data.username);
      } else {
        // fallback: salva o que o usuário digitou
        localStorage.setItem("username", username);
      }

      navigate("/teams");
    } catch (err) {
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Erro de conexão com o servidor");
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
          <Button
            variant="contained" // igual ao botão ENTRAR
            color="primary" // mesma cor do ENTRAR
            fullWidth
            onClick={() => navigate("/register")}
          >
            Cadastrar novo usuário
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
