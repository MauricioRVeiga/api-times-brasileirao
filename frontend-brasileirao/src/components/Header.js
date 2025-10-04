import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  }

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #2e7d32 0%, #66bb6a 100%)",
      }}
    >
      <Toolbar>
        <SportsSoccerIcon sx={{ mr: 1 }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Brasileirão Manager
        </Typography>

        {/* Botões de navegação */}
        <Box>
          <Button color="inherit" component={Link} to="/teams">
            Times
          </Button>
          <Button color="inherit" component={Link} to="/teams/new">
            Novo Time
          </Button>

          {/* Menu do usuário */}
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem disabled>
              {username ? `Olá, ${username}` : "Usuário"}
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
