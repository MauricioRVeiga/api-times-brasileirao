import mongoose from "mongoose";
import dotenv from "dotenv";
import Match from "./models/Match.js";
import Championship from "./models/Championship.js";
import generateRounds from "./generateRounds.js";
import "./models/Team.js"; // garante que o schema Team esteja registrado

dotenv.config();

async function resetCampeonato(temporada) {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "api_futebol" });
    console.log("✅ Conectado ao MongoDB");

    // Busca o campeonato pela temporada
    const campeonato = await Championship.findOne({ temporada });
    if (!campeonato) throw new Error(`Nenhum campeonato encontrado para ${temporada}`);

    console.log(`🏆 Campeonato encontrado: ${campeonato.nome} (${campeonato._id})`);

    // Remove partidas antigas
    const result = await Match.deleteMany({ campeonato: campeonato._id });
    console.log(`🗑️  ${result.deletedCount} partidas removidas.`);

    // Gera rodadas novas
    await generateRounds(campeonato._id);
    console.log("📅 Rodadas recriadas com sucesso!");

    process.exit();
  } catch (err) {
    console.error("❌ Erro:", err.message);
    process.exit(1);
  }
}

// Aqui você só passa a temporada, não o ID
resetCampeonato(2025);
