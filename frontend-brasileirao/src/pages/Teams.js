import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchTeams();
    }
  }, []);

  async function fetchTeams() {
    try {
      setLoading(true);
      const res = await api.get("/teams");
      setTeams(res.data);
    } catch (err) {
      alert("Erro ao carregar times");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (window.confirm("Tem certeza que deseja excluir este time?")) {
      try {
        await api.delete(`/teams/${id}`);
        alert("Time removido com sucesso!");
        fetchTeams();
      } catch (err) {
        alert("Erro ao excluir time");
      }
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Times do Brasileirão</Typography>
        <Button component={Link} to="/teams/new" variant="contained" color="primary">
          Novo Time
        </Button>
      </Box>

      {loading ? (
        <Typography>Carregando times...</Typography>
      ) : teams.length === 0 ? (
        <Typography>Nenhum time cadastrado.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Nome</strong></TableCell>
                <TableCell><strong>Estado</strong></TableCell>
                <TableCell><strong>Fundado</strong></TableCell>
                <TableCell><strong>Estádio</strong></TableCell>
                <TableCell><strong>Capacidade</strong></TableCell>
                <TableCell><strong>Ações</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teams.map((team) => (
                <TableRow key={team._id}>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{team.state}</TableCell>
                  <TableCell>{team.founded}</TableCell>
                  <TableCell>{team.stadium}</TableCell>
                  <TableCell>{team.capacity}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => navigate(`/teams/edit/${team._id}`)}
                      sx={{ mr: 1 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(team._id)}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default Teams;
