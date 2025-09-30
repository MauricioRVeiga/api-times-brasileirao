import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography
} from "@mui/material";

function Classificacao() {
  const [tabela, setTabela] = useState([]);

  useEffect(() => {
    fetch("/campeonatos/68dbf583e889f235c49962d6/partidas/classificacao")
      .then(res => res.json())
      .then(data => setTabela(data));
  }, []);

  const getRowColor = (posicao) => {
    if (posicao <= 4) return "#c8e6c9"; // G4 - verde claro
    if (posicao >= tabela.length - 3) return "#ffcdd2"; // Z4 - vermelho claro
    return "#f5f5f5"; // meio da tabela - cinza claro
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 900, margin: "20px auto" }}>
      <Typography variant="h5" align="center" sx={{ margin: 2 }}>
        Classificação - Brasileirão 2025
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Posição</b></TableCell>
            <TableCell><b>Time</b></TableCell>
            <TableCell><b>J</b></TableCell>
            <TableCell><b>V</b></TableCell>
            <TableCell><b>E</b></TableCell>
            <TableCell><b>D</b></TableCell>
            <TableCell><b>GP</b></TableCell>
            <TableCell><b>GC</b></TableCell>
            <TableCell><b>SG</b></TableCell>
            <TableCell><b>Pontos</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tabela.map((time, index) => (
            <TableRow key={time.timeId} sx={{ backgroundColor: getRowColor(index + 1) }}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{time.time}</TableCell>
              <TableCell>{time.jogos}</TableCell>
              <TableCell>{time.vitorias}</TableCell>
              <TableCell>{time.empates}</TableCell>
              <TableCell>{time.derrotas}</TableCell>
              <TableCell>{time.golsPro}</TableCell>
              <TableCell>{time.golsContra}</TableCell>
              <TableCell>{time.saldo}</TableCell>
              <TableCell><b>{time.pontos}</b></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Classificacao;