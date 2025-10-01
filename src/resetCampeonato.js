import mongoose from "mongoose";
import dotenv from "dotenv";
import Match from "../models/Match.js";
import Championship from "../models/Championship.js";
import generateRounds from "./generateRounds.js"; // importa sua função já pronta

dotenv.config();

async function resetCampeonato(campeonatoId) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Conectado ao MongoDB");

    // Verifica se o campeonato existe
    const campeonato = await Championship.findById(campeonatoId);
    if (!campeonato) {
      throw new Error("Campeonato não encontrado");
    }

    // Apaga todas as partidas do campeonato
    const result = await Match.deleteMany({ campeonato: campeonatoId });
    console.log(`🗑️  ${result.deletedCount} partidas removidas do campeonato.`);

    // Gera novamente as rodadas
    await generateRounds(campeonatoId);
    console.log("🏆 Rodadas recriadas com sucesso!");

    // Mostra a primeira rodada
    const primeiraRodada = await Match.find({
      campeonato: campeonatoId,
      rodada: 1,
    })
      .populate("mandante")
      .populate("visitante");

    console.log("📅 Primeira rodada:");
    primeiraRodada.forEach((jogo) => {
      console.log(`${jogo.mandante.nome} x ${jogo.visitante.nome}`);
    });

    process.exit();
  } catch (err) {
    console.error("❌ Erro:", err.message);
    process.exit(1);
  }
}

// 👉 Troque aqui pelo ID do campeonato que você criou
const campeonatoId = "68dd2534f8b3a7ea227ce92d"; // ID do Brasileirão Série A 2025
resetCampeonato(campeonatoId);