import * as service from "../services/matchService.js";

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