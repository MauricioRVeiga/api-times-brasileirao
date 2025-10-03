const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    state: { type: String, required: true }, // Ex: SP, RJ, MG
    founded: { type: Number },
    stadium: { type: String },
    capacity: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", TeamSchema);
