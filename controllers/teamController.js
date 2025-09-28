import * as service from "../services/teamService.js"

export async function getAll(req, res) {
  const times = await service.listarTimes()
  res.json(times)
}

export async function getById(req, res) {
  const team = await service.buscarPorId(req.params.id)
  if (!team) return res.status(404).json({ error: "Time não encontrado" })
  res.json(team)
}

export async function create(req, res) {
  try {
    const team = await service.criarTime(req.body)
    res.status(201).json(team)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export async function update(req, res) {
  try {
    const team = await service.atualizarTime(req.params.id, req.body)
    if (!team) return res.status(404).json({ error: "Time não encontrado" })
    res.json(team)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export async function remove(req, res) {
  const team = await service.removerTime(req.params.id)
  if (!team) return res.status(404).json({ error: "Time não encontrado" })
  res.json({ message: "Time removido com sucesso" })
}