const Team = require("../models/Team");

async function getAllTeams() {
  return await Team.find();
}

async function getTeamById(id) {
  return await Team.findById(id);
}

async function createTeam(data) {
  const team = new Team(data);
  return await team.save();
}

async function updateTeam(id, data) {
  return await Team.findByIdAndUpdate(id, data, { new: true });
}

async function deleteTeam(id) {
  return await Team.findByIdAndDelete(id);
}

module.exports = {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};
