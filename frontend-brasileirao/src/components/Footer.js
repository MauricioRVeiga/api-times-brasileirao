import React from "react";
import { Box, Typography } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        py: 2,
        px: 2,
        textAlign: "center",
        background: "linear-gradient(90deg, #2e7d32 0%, #66bb6a 100%)",
        color: "white",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <SportsSoccerIcon />
        Brasileirão Manager © {new Date().getFullYear()}
      </Typography>
      <Typography variant="caption" display="block">
        Criado para apaixonados por futebol ⚽
      </Typography>
    </Box>
  );
}

export default Footer;
