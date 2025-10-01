import mongoose from "mongoose";
import dotenv from "dotenv";
import Team from "../models/Team.js";

dotenv.config();

const teams = [
  { nome: "Palmeiras", logo: "/escudos/palmeiras.png" },
  { nome: "Flamengo", logo: "/escudos/flamengo.png" },
  { nome: "São Paulo", logo: "/escudos/saopaulo.png" },
  { nome: "Corinthians", logo: "/escudos/corinthians.png" },
  { nome: "Santos", logo: "/escudos/santos.png" },
  { nome: "Grêmio", logo: "/escudos/gremio.png" },
  { nome: "Internacional", logo: "/escudos/internacional.png" },
  { nome: "Cruzeiro", logo: "/escudos/cruzeiro.png" },
  { nome: "Atlético Mineiro", logo: "/escudos/atleticomg.png" },
  { nome: "Vasco", logo: "/escudos/vasco.png" },
  { nome: "Botafogo", logo: "/escudos/botafogo.png" },
  { nome: "Fluminense", logo: "/escudos/fluminense.png" },
  { nome: "Bahia", logo: "/escudos/bahia.png" },
  { nome: "Fortaleza", logo: "/escudos/fortaleza.png" },
  { nome: "Ceará", logo: "/escudos/ceara.png" },
  { nome: "Vitória", logo: "/escudos/vitoria.png" },
  { nome: "Juventude", logo: "/escudos/juventude.png" },
  { nome: "Red Bull Bragantino", logo: "/escudos/bragantino.png" },
  { nome: "Sport", logo: "/escudos/sport.png" },
  { nome: "Mirassol", logo: "/escudos/mirassol.png" },
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("✅ Conectado ao MongoDB");
    await Team.deleteMany({});
    await Team.insertMany(teams);
    console.log("✅ Times inseridos com sucesso!");
    process.exit();
  })
  .catch(err => console.error("❌ Erro:", err));