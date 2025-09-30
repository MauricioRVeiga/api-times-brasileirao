import Championship from "../models/Championship.js";

export async function listarCampeonatos() {
  return await Championship.find().populate("participantes");
}

export async function buscarPorId(id) {
  return await Championship.findById(id).populate("participantes");
}

export async function criarCampeonato(dados) {
  // Se for array, insere vários de uma vez
  if (Array.isArray(dados)) {
    return await Championship.insertMany(dados);
  }
  // Se for objeto único, insere só um
  return await Championship.create(dados);
}

export async function atualizarCampeonato(id, dados) {
  return await Championship.findByIdAndUpdate(id, dados, { new: true });
}

export async function removerCampeonato(id) {
  return await Championship.findByIdAndDelete(id);
}

export async function adicionarTimes(id, teamIds) {
  return await Championship.findByIdAndUpdate(
    id,
    { $addToSet: { participantes: { $each: teamIds } } },
    { new: true }
  ).populate("participantes");
}
