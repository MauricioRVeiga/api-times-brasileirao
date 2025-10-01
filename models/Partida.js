import mongoose from "mongoose";

const partidaSchema = new mongoose.Schema({
  mandante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  visitante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  golsMandante: {
    type: Number,
    default: null,
  },
  golsVisitante: {
    type: Number,
    default: null,
  },
  rodada: {
    type: Number,
    required: true,
  },
  campeonato: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campeonato",
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Partida", partidaSchema);