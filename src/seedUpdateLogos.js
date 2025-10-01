import mongoose from "mongoose";
import dotenv from "dotenv";
import Team from "../models/Team.js";

dotenv.config();

const logos = {
  "Palmeiras": "/escudos/palmeiras.png",
  "Flamengo": "/escudos/flamengo.png",
  "São Paulo": "/escudos/saopaulo.png",
  "Corinthians": "/escudos/corinthians.png",
  "Santos": "/escudos/santos.png",
  "Grêmio": "/escudos/gremio.png",
  "Internacional": "/escudos/internacional.png",
  "Cruzeiro": "/escudos/cruzeiro.png",
  "Atlético Mineiro": "/escudos/atleticomg.png",
  "Vasco": "/escudos/vasco.png",
  "Botafogo": "/escudos/botafogo.png",
  "Fluminense": "/escudos/fluminense.png",
  "Bahia": "/escudos/bahia.png",
  "Fortaleza": "/escudos/fortaleza.png",
  "Ceará": "/escudos/ceara.png",
  "Vitória": "/escudos/vitoria.png",
  "Juventude": "/escudos/juventude.png",
  "Red Bull Bragantino": "/escudos/bragantino.png",
  "Sport": "/escudos/sport.png",
  "Mirassol": "/escudos/mirassol.png"
};

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("✅ Conectado ao MongoDB");
    for (const [nome, logo] of Object.entries(logos)) {
      await Team.updateOne({ nome }, { $set: { logo } });
      console.log(`✔️ Atualizado: ${nome}`);
    }
    console.log("✅ Logos atualizados com sucesso!");
    process.exit();
  })
  .catch(err => console.error("❌ Erro:", err));
