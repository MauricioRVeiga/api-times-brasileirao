const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const teamRoutes = require("./routes/teamRoutes");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();

// Middlewares globais
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json()); // 👈 necessário para interpretar JSON
app.use(express.urlencoded({ extended: true })); // 👈 opcional, para formulários

// Conexão com MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas conectado!"))
  .catch((err) => console.error(err));

// Rotas
app.use("/api", authRoutes);
app.use("/api", teamRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
