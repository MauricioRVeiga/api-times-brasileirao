const express = require("express");
const mongoose = require("mongoose");
const teamRoutes = require("./routes/teamRoutes");
const authRoutes = require("./routes/authRoutes"); // 👈 novo
require("dotenv").config();

const app = express();
app.use(express.json());

// Conexão com MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas conectado!"))
  .catch((err) => console.error(err));

// Rotas
app.use("/api", authRoutes); // 👈 rota de login
app.use("/api", teamRoutes); // 👈 rotas de times (protegidas depois com middleware)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
