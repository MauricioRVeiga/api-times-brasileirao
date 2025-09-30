import mongoose from "mongoose"

const PlayerSchema = new mongoose.Schema({
  nome: String,
  posicao: String,
  numero: Number
}, { _id: false })

const TeamSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
  estado: String,
  cidade: String,
  fundacao: Number,
  cores: [String],
  estadio: {
    nome: String,
    capacidade: Number
  },
  elenco: [PlayerSchema],
  temporada: { type: Number, default: 2025 }
}, { timestamps: true })

export default mongoose.model("Team", TeamSchema, "times");