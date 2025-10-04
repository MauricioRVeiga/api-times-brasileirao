const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    state: { type: String, required: true },
    founded: { type: Number, required: true },
    stadium: { type: String, required: true },
    capacity: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);