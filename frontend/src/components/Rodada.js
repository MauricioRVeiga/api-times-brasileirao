import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export default function Rodada({ onPalpitar }) {
  const { campeonatoId, rodada } = useParams();
  const navigate = useNavigate();
  const [jogos, setJogos] = useState([]);
  const [palpitesConfirmados, setPalpitesConfirmados] = useState(false);
  const [resumoPalpites, setResumoPalpites] = useState([]);
  const [openResumo, setOpenResumo] = useState(false);

  useEffect(() => {
    if (!campeonatoId || !rodada) return;
    api
      .get(`/campeonatos/${campeonatoId}/rodadas/${rodada}`)
      .then((res) => setJogos(res.data))
      .catch((err) => console.error(err));
  }, [campeonatoId, rodada]);

  const handleChange = (id, campo, valor) => {
    setJogos(jogos.map((j) => (j._id === id ? { ...j, [campo]: valor } : j)));
  };

  const handlePalpitar = async () => {
    for (const jogo of jogos) {
      await api.put(`/campeonatos/${campeonatoId}/partidas/${jogo._id}`, {
        golsMandante: Number(jogo.golsMandante),
        golsVisitante: Number(jogo.golsVisitante),
      });
    }
    setResumoPalpites(jogos);
    setPalpitesConfirmados(true);
    if (onPalpitar) onPalpitar();
  };

  const handleEditar = () => {
    setPalpitesConfirmados(false);
  };

  const handleDeletar = async () => {
    for (const jogo of jogos) {
      await api.put(`/campeonatos/${campeonatoId}/partidas/${jogo._id}`, {
        golsMandante: null,
        golsVisitante: null,
      });
    }
    setJogos(jogos.map((j) => ({ ...j, golsMandante: "", golsVisitante: "" })));
    setResumoPalpites([]);
    setPalpitesConfirmados(false);
  };

  const handleOpenResumo = () => setOpenResumo(true);
  const handleCloseResumo = () => setOpenResumo(false);

  const rodadaNum = Number(rodada);

  return (
    <Box sx={{ p: 3 }}>
      {/* Cabeçalho */}
      <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
        Rodada {rodada}
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Botões de navegação */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Button
          variant="outlined"
          disabled={rodadaNum <= 1}
          onClick={() =>
            navigate(`/campeonatos/${campeonatoId}/rodadas/${rodadaNum - 1}`)
          }
        >
          ← Rodada anterior
        </Button>
        <Button
          variant="contained"
          disabled={rodadaNum >= 38}
          onClick={() =>
            navigate(`/campeonatos/${campeonatoId}/rodadas/${rodadaNum + 1}`)
          }
        >
          Próxima rodada →
        </Button>
      </Box>

      {/* Lista de jogos */}
      <Grid container spacing={3}>
        {jogos.map((j) => (
          <Grid item xs={12} md={6} key={j._id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 4,
                background: "linear-gradient(135deg, #f9f9f9, #f1f1f1)",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                }}
              >
                {/* Mandante */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <img
                    src={`http://localhost:4000${j.mandante?.logo}`}
                    alt={j.mandante?.nome}
                    style={{ width: 45, height: 45, objectFit: "contain" }}
                  />
                  <Typography variant="subtitle1" fontWeight="bold">
                    {j.mandante?.nome}
                  </Typography>
                </Box>

                {/* Placar */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    backgroundColor: "#fff",
                    borderRadius: 3,
                    px: 3,
                    py: 1,
                    minWidth: 160,
                    justifyContent: "center",
                  }}
                >
                  <TextField
                    type="number"
                    disabled={palpitesConfirmados}
                    value={j.golsMandante ?? ""}
                    onChange={(e) =>
                      handleChange(j._id, "golsMandante", e.target.value)
                    }
                    inputProps={{
                      min: 0,
                      style: {
                        textAlign: "center",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        MozAppearance: "textfield",
                      },
                    }}
                    sx={{
                      width: 70,
                      "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                        {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                    }}
                  />

                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    color="primary"
                    sx={{ mx: 1 }}
                  >
                    X
                  </Typography>

                  <TextField
                    type="number"
                    disabled={palpitesConfirmados}
                    value={j.golsVisitante ?? ""}
                    onChange={(e) =>
                      handleChange(j._id, "golsVisitante", e.target.value)
                    }
                    inputProps={{
                      min: 0,
                      style: {
                        textAlign: "center",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        MozAppearance: "textfield",
                      },
                    }}
                    sx={{
                      width: 70,
                      "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                        {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                    }}
                  />
                </Box>

                {/* Visitante */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {j.visitante?.nome}
                  </Typography>
                  <img
                    src={`http://localhost:4000${j.visitante?.logo}`}
                    alt={j.visitante?.nome}
                    style={{ width: 45, height: 45, objectFit: "contain" }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Botões de ação */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4, gap: 2 }}>
        {!palpitesConfirmados ? (
          <Button
            variant="contained"
            color="success"
            size="large"
            startIcon={<CheckIcon />}
            onClick={handlePalpitar}
          >
            Confirmar Palpites
          </Button>
        ) : (
          <>
            <Button variant="outlined" onClick={handleEditar}>
              Editar Palpites
            </Button>
            <Button variant="outlined" color="error" onClick={handleDeletar}>
              Deletar Palpites
            </Button>
            <Button variant="contained" color="primary" onClick={handleOpenResumo}>
              Ver Palpites
            </Button>
          </>
        )}
      </Box>

       {/* Modal de resumo */}
      <Dialog open={openResumo} onClose={handleCloseResumo} fullWidth maxWidth="sm">
        <DialogTitle>📋 Resumo dos Palpites</DialogTitle>
        <DialogContent dividers>
          {resumoPalpites.length > 0 ? (
            resumoPalpites.map((j) => (
              <Typography key={j._id} variant="subtitle1" sx={{ mb: 1 }}>
                {j.mandante?.nome} {j.golsMandante} x {j.golsVisitante} {j.visitante?.nome}
              </Typography>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              Nenhum palpite confirmado ainda.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResumo}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}