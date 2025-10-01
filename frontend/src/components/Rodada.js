import { useEffect, useState } from "react";
import api from "../api";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";

export default function Rodada({ campeonatoId, rodada, onPalpitar }) {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    api.get(`/campeonatos/${campeonatoId}/rodadas/${rodada}`)
      .then(res => setJogos(res.data))
      .catch(err => console.error(err));
  }, [campeonatoId, rodada]);

  const handleChange = (id, campo, valor) => {
    setJogos(jogos.map(j => j._id === id ? { ...j, [campo]: valor } : j));
  };

  const handlePalpitar = async () => {
    for (const jogo of jogos) {
      await api.put(`/partidas/${jogo._id}`, {
        golsMandante: Number(jogo.golsMandante),
        golsVisitante: Number(jogo.golsVisitante),
      });
    }
    onPalpitar();
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Rodada {rodada}
      </Typography>

      <Grid container spacing={2}>
        {jogos.map(j => (
          <Grid item xs={12} md={6} key={j._id}>
            <Card>
              <CardContent style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h6">{j.mandante?.nome}</Typography>
                <TextField
                  type="number"
                  value={j.golsMandante ?? ""}
                  onChange={e => handleChange(j._id, "golsMandante", e.target.value)}
                  size="small"
                  style={{ width: 50 }}
                />
                <Typography variant="h6">x</Typography>
                <TextField
                  type="number"
                  value={j.golsVisitante ?? ""}
                  onChange={e => handleChange(j._id, "golsVisitante", e.target.value)}
                  size="small"
                  style={{ width: 50 }}
                />
                <Typography variant="h6">{j.visitante?.nome}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handlePalpitar}
        style={{ marginTop: 20 }}
      >
        Palpitar
      </Button>
    </div>
  );
}