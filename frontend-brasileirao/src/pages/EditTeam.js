import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { Container, Typography, TextField, Button, Paper, Box } from "@mui/material";

function EditTeam() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [founded, setFounded] = useState("");
  const [stadium, setStadium] = useState("");
  const [capacity, setCapacity] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await api.get(`/teams/${id}`);
        const team = res.data;
        setName(team.name);
        setState(team.state);
        setFounded(team.founded);
        setStadium(team.stadium);
        setCapacity(team.capacity);
      } catch (err) {
        alert("Erro ao carregar dados do time");
        navigate("/teams");
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, [id, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.put(`/teams/${id}`, {
        name,
        state,
        founded: Number(founded),
        stadium,
        capacity: Number(capacity),
      });
      alert("Time atualizado com sucesso!");
      navigate("/teams");
    } catch (err) {
      alert("Erro ao atualizar time");
    }
  }

  if (loading) return <Typography>Carregando dados do time...</Typography>;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Editar Time
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Nome do time" value={name} onChange={(e) => setName(e.target.value)} required />
          <TextField label="Estado" value={state} onChange={(e) => setState(e.target.value)} required />
          <TextField label="Ano de fundação" type="number" value={founded} onChange={(e) => setFounded(e.target.value)} required />
          <TextField label="Estádio" value={stadium} onChange={(e) => setStadium(e.target.value)} required />
          <TextField label="Capacidade" type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} required />
          <Button type="submit" variant="contained" color="primary">
            Salvar Alterações
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default EditTeam;
