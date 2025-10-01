import Championship from "../models/Championship.js";
import Team from "../models/Team.js";
import * as matchService from "../services/matchService.js";

// 📌 Listar todos os campeonatos
export async function getAll(req, res) {
  try {
    const campeonatos = await Championship.find().populate("participantes");
    res.json(campeonatos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 📌 Buscar campeonato por ID
export async function getById(req, res) {
  try {
    const campeonato = await Championship.findById(req.params.id).populate("participantes");
    if (!campeonato) {
      return res.status(404).json({ error: "Campeonato não encontrado" });
    }
    res.json(campeonato);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 📌 Criar novo campeonato
export async function create(req, res) {
  try {
    const campeonato = await Championship.create(req.body);
    res.status(201).json(campeonato);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// 📌 Atualizar campeonato
export async function update(req, res) {
  try {
    const campeonato = await Championship.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!campeonato) {
      return res.status(404).json({ error: "Campeonato não encontrado" });
    }
    res.json(campeonato);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// 📌 Remover campeonato por ID
export async function remove(req, res) {
  try {
    const campeonato = await Championship.findByIdAndDelete(req.params.id);
    if (!campeonato) {
      return res.status(404).json({ error: "Campeonato não encontrado" });
    }
    res.json({ message: "Campeonato removido com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 📌 Remover todos os campeonatos
export async function removeAll(req, res) {
  try {
    await Championship.deleteMany({});
    res.json({ message: "Todos os campeonatos foram removidos" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 📌 Adicionar times participantes a um campeonato
export async function addTeams(req, res) {
  try {
    const campeonato = await Championship.findById(req.params.id);
    if (!campeonato) {
      return res.status(404).json({ error: "Campeonato não encontrado" });
    }

    const { teamIds } = req.body; // array de IDs de times
    const teams = await Team.find({ _id: { $in: teamIds } });

    campeonato.participantes.push(...teams.map(t => t._id));
    await campeonato.save();

    res.json(campeonato);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// 📌 Gerar classificação do campeonato
export async function getClassificacao(req, res) {
  try {
    const tabela = await matchService.gerarClassificacao(req.params.id);
    res.json(tabela);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}