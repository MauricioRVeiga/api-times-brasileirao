const teamService = require("../services/teamService");

exports.getAll = async (req, res) => {
  const teams = await teamService.getAllTeams();
  res.json(teams);
};

exports.getById = async (req, res) => {
  const team = await teamService.getTeamById(req.params.id);
  if (!team) return res.status(404).json({ message: "Time não encontrado" });
  res.json(team);
};

exports.create = async (req, res) => {
  const team = await teamService.createTeam(req.body);
  res.status(201).json(team);
};

exports.update = async (req, res) => {
  const team = await teamService.updateTeam(req.params.id, req.body);
  if (!team) return res.status(404).json({ message: "Time não encontrado" });
  res.json(team);
};

exports.remove = async (req, res) => {
  const team = await teamService.deleteTeam(req.params.id);
  if (!team) return res.status(404).json({ message: "Time não encontrado" });
  res.json({ message: "Time removido com sucesso" });
};
