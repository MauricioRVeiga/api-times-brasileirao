import Team from "../models/Team.js"

export async function listarTimes() {
  return await Team.find()
}

export async function buscarPorId(id) {
  return await Team.findById(id)
}

export async function criarTime(dados) {
  return await Team.create(dados)
}

export async function atualizarTime(id, dados) {
  return await Team.findByIdAndUpdate(id, dados, { new: true })
}

export async function removerTime(id) {
  return await Team.findByIdAndDelete(id)
}