import { useEffect, useState } from "react";
import api from "../api";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Avatar, Box
} from "@mui/material";

export default function Classificacao({ campeonatoId }) {
  const [tabela, setTabela] = useState([]);

  useEffect(() => {
    api.get(`/campeonatos/${campeonatoId}/classificacao`)
      .then(res => setTabela(res.data))
      .catch(err => console.error(err));
  }, [campeonatoId]);

  return (
    <div style={{ marginTop: 30 }}>
      <Typography variant="h4" gutterBottom>
        Classificação
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Posição</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Pontos</TableCell>
              <TableCell>Vitórias</TableCell>
              <TableCell>Empates</TableCell>
              <TableCell>Derrotas</TableCell>
              <TableCell>Saldo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tabela.map((t, index) => (
              <TableRow key={t.timeId}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar src={t.logo} alt={t.nome} sx={{ mr: 1 }} />
                    {t.nome}
                  </Box>
                </TableCell>
                <TableCell>{t.pontos}</TableCell>
                <TableCell>{t.vitorias}</TableCell>
                <TableCell>{t.empates}</TableCell>
                <TableCell>{t.derrotas}</TableCell>
                <TableCell>{t.saldoGols}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
