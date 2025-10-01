import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Box,
  Container,
} from "@mui/material";

import Classificacao from "../components/Classificacao";

export default function Campeonato() {
  const { campeonatoId } = useParams(); // pega o ID da URL
  const [tab, setTab] = useState(0);
  const [refreshClassificacao] = useState(false);
  const navigate = useNavigate();

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
    if (newValue === 0) {
      // 👉 se clicar em "Rodadas", redireciona para a rodada 1
      navigate(`/campeonatos/${campeonatoId}/rodadas/1`);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Cabeçalho */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Campeonato Brasileiro 2025
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Tabs de navegação */}
      <AppBar position="static" color="default">
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Rodadas" />
          <Tab label="Classificação" />
        </Tabs>
      </AppBar>

      {/* Conteúdo */}
      <Container sx={{ marginTop: 4 }}>
        {tab === 1 && (
          <Classificacao campeonatoId={campeonatoId} key={refreshClassificacao} />
        )}
      </Container>
    </Box>
  );
}
