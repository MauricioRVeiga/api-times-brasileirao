import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

export default function Home() {
  const [campeonatos, setCampeonatos] = useState([]);

  useEffect(() => {
    api.get("/campeonatos")
      .then((res) => setCampeonatos(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Campeonatos disponíveis
      </Typography>
      <List>
        {campeonatos.map((c) => (
          <ListItem
            key={c._id}
            button
            component={Link}
            to={`/campeonatos/${c._id}`}
          >
            <ListItemText primary={c.nome} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
