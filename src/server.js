import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"

import teamRoutes from "../routes/teamRoutes.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Atlas conectado"))
  .catch(err => console.error("❌ Erro ao conectar:", err))

app.get("/", (req, res) => res.json({ msg: "API Times Brasileirão 2025" }))
app.use("/teams", teamRoutes)

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`))