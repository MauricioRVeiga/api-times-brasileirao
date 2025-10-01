import * as service from "../services/matchService.js";
import Match from "../models/Match.js"; // 👈 necessário para removeByCampeonato
import Partida from "../models/Partida.js";

export async function getAll(req, res) {
  const partidas = await service.listarPartidas(req.params.campeonatoId);
  res.json(partidas);
}

export async function create(req, res) {
  try {
    const partidas = await service.criarPartida(req.body);
    res.status(201).json(partidas);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function update(req, res) {
  try {
    const partida = await service.atualizarPartida(req.params.id, req.body);
    if (!partida)
      return res.status(404).json({ error: "Partida não encontrada" });
    res.json(partida);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function remove(req, res) {
  const partida = await service.removerPartida(req.params.id);
  if (!partida)
    return res.status(404).json({ error: "Partida não encontrada" });
  res.json({ message: "Partida removida com sucesso" });
}

export async function getClassificacao(req, res) {
  try {
    const tabela = await service.gerarClassificacao(req.params.campeonatoId);
    res.json(tabela);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getRodada(req, res) {
  try {
    const { id, rodada } = req.params;
    const jogos = await service.listarRodada(id, rodada);
    if (!jogos || jogos.length === 0) {
      return res.status(404).json({ error: "Rodada não encontrada" });
    }
    res.json(jogos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function removeByCampeonato(req, res) {
  try {
    const { campeonatoId } = req.params;
    const result = await Match.deleteMany({ campeonato: campeonatoId });
    res.json({ message: `Foram removidas ${result.deletedCount} partidas do campeonato.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const updatePartida = async (req, res) => {
  try {
    const { partidaId } = req.params;
    const { golsMandante, golsVisitante } = req.body;

    const partida = await Partida.findByIdAndUpdate(
      partidaId,
      { golsMandante, golsVisitante },
      { new: true }
    );

    if (!partida) {
      return res.status(404).json({ message: "Partida não encontrada" });
    }

    res.json(partida);
  } catch (err) {
    console.error("Erro ao atualizar partida:", err);
    res.status(500).json({ message: "Erro no servidor" });
  }
};