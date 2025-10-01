import mongoose from "mongoose";
import dotenv from "dotenv";
import Championship from "../models/Championship.js";

dotenv.config();

async function seedCampeonato() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Conectado ao MongoDB");

    // IDs dos times já cadastrados
    const participantes = [
      "68dd19c162eb985b0c2e917f", // Palmeiras
      "68dd19c162eb985b0c2e9180", // Flamengo
      "68dd19c162eb985b0c2e9181", // São Paulo
      "68dd19c162eb985b0c2e9182", // Corinthians
      "68dd19c162eb985b0c2e9183", // Santos
      "68dd19c162eb985b0c2e9184", // Grêmio
      "68dd19c162eb985b0c2e9185", // Internacional
      "68dd19c162eb985b0c2e9186", // Cruzeiro
      "68dd19c162eb985b0c2e9187", // Atlético Mineiro
      "68dd19c162eb985b0c2e9188", // Vasco
      "68dd19c162eb985b0c2e9189", // Botafogo
      "68dd19c162eb985b0c2e918a", // Fluminense
      "68dd19c162eb985b0c2e918b", // Bahia
      "68dd19c162eb985b0c2e918c", // Fortaleza
      "68dd19c162eb985b0c2e918d", // Ceará
      "68dd19c162eb985b0c2e918e", // Vitória
      "68dd19c162eb985b0c2e918f", // Juventude
      "68dd19c162eb985b0c2e9190", // Red Bull Bragantino
      "68dd19c162eb985b0c2e9191", // Sport
      "68dd19c162eb985b0c2e9192", // Mirassol
    ];

    // Cria o campeonato
    const campeonato = await Championship.create({
      nome: "Brasileirão Série A",
      pais: "Brasil",
      temporada: 2025,
      participantes,
    });

    console.log("🏆 Campeonato criado com sucesso!");
    console.log("ID do campeonato:", campeonato._id.toString());

    process.exit();
  } catch (err) {
    console.error("❌ Erro ao criar campeonato:", err.message);
    process.exit(1);
  }
}

seedCampeonato();