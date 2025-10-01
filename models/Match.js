import mongoose from "mongoose";

const MatchSchema = new mongoose.Schema(
  {
    campeonato: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Championship",
      required: true,
    },
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
    golsMandante: { type: Number, default: null },
    golsVisitante: { type: Number, default: null },
    rodada: { type: Number, required: true },
    data: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Match", MatchSchema, "partidas");
