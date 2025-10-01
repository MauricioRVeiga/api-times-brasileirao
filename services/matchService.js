import Match from "../models/Match.js";
import Championship from "../models/Championship.js";

export async function listarRodada(campeonatoId, rodada) {
  return await Match.find({ campeonato: campeonatoId, rodada })
    .populate("mandante")
    .populate("visitante");
}

export async function listarPartidas(campeonatoId) {
  return await Match.find({ campeonato: campeonatoId }).populate(
    "mandante visitante campeonato"
  );
}

export async function criarPartida(dados) {
  if (Array.isArray(dados)) {
    return await Match.insertMany(dados);
  }
  return await Match.create(dados);
}

export async function atualizarPartida(id, dados) {
  return await Match.findByIdAndUpdate(id, dados, { new: true });
}

export async function removerPartida(id) {
  return await Match.findByIdAndDelete(id);
}

export async function gerarClassificacao(campeonatoId) {
  const campeonato = await Championship.findById(campeonatoId).populate("participantes");
  const partidas = await Match.find({ campeonato: campeonatoId });

  const tabela = campeonato.participantes.map((team) => ({
    timeId: team._id,
    nome: team.nome,
    logo: team.logo,
    jogos: 0,
    vitorias: 0,
    empates: 0,
    derrotas: 0,
    golsPro: 0,
    golsContra: 0,
    saldo: 0,
    pontos: 0,
  }));

  partidas.forEach((p) => {
    const mandante = tabela.find((t) => t.timeId.equals(p.mandante));
    const visitante = tabela.find((t) => t.timeId.equals(p.visitante));
    if (!mandante || !visitante) return;

    mandante.jogos++;
    visitante.jogos++;

    mandante.golsPro += p.golsMandante ?? 0;
    mandante.golsContra += p.golsVisitante ?? 0;
    visitante.golsPro += p.golsVisitante ?? 0;
    visitante.golsContra += p.golsMandante ?? 0;

    if (p.golsMandante > p.golsVisitante) {
      mandante.vitorias++;
      mandante.pontos += 3;
      visitante.derrotas++;
    } else if (p.golsMandante < p.golsVisitante) {
      visitante.vitorias++;
      visitante.pontos += 3;
      mandante.derrotas++;
    } else {
      mandante.empates++;
      visitante.empates++;
      mandante.pontos++;
      visitante.pontos++;
    }
  });

  tabela.forEach((t) => {
    t.saldo = t.golsPro - t.golsContra;
  });

  tabela.sort(
    (a, b) => b.pontos - a.pontos || b.saldo - a.saldo || b.golsPro - a.golsPro
  );

  return tabela;
}