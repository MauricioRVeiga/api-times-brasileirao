import mongoose from "mongoose";

const ChampionshipSchema = new mongoose.Schema(
    {
    nome: { type: String, required: true }, // Ex: Brasileirão Série A
    pais: { type: String, required: true }, // Ex: Brasil
    temporada: { type: Number, required: true }, // Ex: 2025
    participantes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
},
{ timestamps: true }
);

export default mongoose.model(
    "Championship",
    ChampionshipSchema,
    "campeonatos"
);
