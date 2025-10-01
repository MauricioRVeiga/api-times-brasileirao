import * as service from "../services/championshipService.js";
import { calcularClassificacao } from "../services/classificationService.js";

export async function getClassificacao(req, res) {
  const { id } = req.params;
  const tabela = await calcularClassificacao(id);
  res.json(tabela);
}

export async function getAll(req, res) {
  const campeonatos = await service.listarCampeonatos();
  res.json(campeonatos);
}

export async function getById(req, res) {
  const campeonato = await service.buscarPorId(req.params.id);
  if (!campeonato) {
    return res.status(404).json({ error: "Campeonato não encontrado" });
  }
  res.json(campeonato);
}

export async function create(req, res) {
  try {
    const campeonatos = await service.criarCampeonato(req.body);
    res.status(201).json(campeonatos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function update(req, res) {
  try {
    const campeonato = await service.atualizarCampeonato(
      req.params.id,
      req.body
    );
    if (!campeonato) {
      return res.status(404).json({ error: "Campeonato não encontrado" });
    }
    res.json(campeonato);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function remove(req, res) {
  const campeonato = await service.removerCampeonato(req.params.id);
  if (!campeonato) {
    return res.status(404).json({ error: "Campeonato não encontrado" });
  }
  res.json({ message: "Campeonato removido com sucesso" });
}

export async function addTeams(req, res) {
  try {
    const { id } = req.params;
    const { teamIds } = req.body;
    const campeonato = await service.adicionarTimes(id, teamIds);
    if (!campeonato) {
      return res.status(404).json({ error: "Campeonato não encontrado" });
    }
    res.json(campeonato);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function removeAll(req, res) {
  try {
    await service.removerTodosCampeonatos();
    res.json({ message: "Todos os campeonatos foram removidos com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao remover campeonatos" });
  }
}
