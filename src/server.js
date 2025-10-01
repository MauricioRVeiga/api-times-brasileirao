import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

import teamRoutes from "../routes/teamRoutes.js"
import championshipRoutes from "../routes/championshipRoutes.js"
import { matchRoutes, matchDirectRoutes } from "../routes/matchRoutes.js";

dotenv.config()

// 🔹 Corrigir __dirname e __filename no ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

// Rotas RESTful (com campeonatoId)
app.use("/campeonatos/:campeonatoId/partidas", matchRoutes);

// Rota direta (atalho)
app.use("/partidas", matchDirectRoutes);

// 🔹 Servir escudos de times
app.use("/escudos", express.static(path.join(__dirname, "../public/escudos")))

// Rotas da API
app.use("/campeonatos", championshipRoutes)
app.use("/campeonatos/:campeonatoId/partidas", matchRoutes)
app.use("/teams", teamRoutes)

// Conexão MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Atlas conectado"))
  .catch(err => console.error("❌ Erro ao conectar:", err))

// Rota simples de teste da API
app.get("/api", (req, res) => res.json({ msg: "API Times Brasileirão 2025" }))

// -------------------------
// Configuração para servir o React em produção
// -------------------------

// Servir arquivos estáticos do React
app.use(express.static(path.join(__dirname, "../frontend/build")))

// Fallback: qualquer rota que não seja da API devolve o React
app.get(/^(?!\/api|\/campeonatos|\/teams|\/escudos).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"))
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`🚀 Servidor rodando em http://localhost:${port}`))