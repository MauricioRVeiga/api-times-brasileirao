import mongoose from "mongoose";
import dotenv from "dotenv";
import Championship from "../models/Championship.js";
import Match from "../models/Match.js";
import Team from "../models/Team.js";

dotenv.config();

async function generateRounds(campeonatoId) {
  const campeonato = await Championship.findById(campeonatoId).populate("participantes");
  if (!campeonato) throw new Error("Campeonato não encontrado");

  // 👇 mantém como ObjectId, sem .toString()
  const teams = campeonato.participantes.map((t) => t._id);
  if (teams.length !== 20) throw new Error("É necessário ter 20 times cadastrados");

  let rodada = 1;
  const matches = [];

  // Algoritmo round-robin (turno)
  const totalRodadas = teams.length - 1; // 19 rodadas
  const metade = teams.length / 2;
  let lista = [...teams];

  for (let r = 0; r < totalRodadas; r++) {
    for (let i = 0; i < metade; i++) {
      const mandante = lista[i];
      const visitante = lista[lista.length - 1 - i];

      matches.push({
        campeonato: campeonatoId,
        rodada: rodada,
        mandante,
        visitante,
        golsMandante: null,
        golsVisitante: null,
      });
    }
    // Rotaciona os times (fixando o primeiro)
    lista.splice(1, 0, lista.pop());
    rodada++;
  }

  // Returno (inverte mandos)
  const returno = matches.map((m) => ({
    campeonato: campeonatoId,
    rodada: m.rodada + totalRodadas,
    mandante: m.visitante,
    visitante: m.mandante,
    golsMandante: null,
    golsVisitante: null,
  }));

  await Match.insertMany([...matches, ...returno]);
  console.log("✅ Rodadas geradas com sucesso!");
}

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const campeonatoId = "68dd2534f8b3a7ea227ce92d"; // seu campeonato
    await generateRounds(campeonatoId);
  } catch (err) {
    console.error("Erro:", err.message);
  } finally {
    mongoose.disconnect();
  }
}

main();