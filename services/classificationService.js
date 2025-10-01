import Match from "../models/Match.js";
import Team from "../models/Team.js";

export async function calcularClassificacao(campeonatoId) {
  const times = await Team.find();
  const partidas = await Match.find({ campeonato: campeonatoId });

  // inicializa tabela
  const tabela = times.map((t) => ({
    time: t.nome,
    pontos: 0,
    jogos: 0,
    vitorias: 0,
    empates: 0,
    derrotas: 0,
    golsPro: 0,
    golsContra: 0,
    saldo: 0,
  }));

  // percorre partidas já jogadas
  partidas.forEach((p) => {
    if (p.golsMandante === null || p.golsVisitante === null) return;

    const mandante = tabela.find(
      (t) => t.time === p.mandante.nome || t.time === p.mandante.toString()
    );
    const visitante = tabela.find(
      (t) => t.time === p.visitante.nome || t.time === p.visitante.toString()
    );

    mandante.jogos++;
    visitante.jogos++;
    mandante.golsPro += p.golsMandante;
    mandante.golsContra += p.golsVisitante;
    visitante.golsPro += p.golsVisitante;
    visitante.golsContra += p.golsMandante;

    mandante.saldo = mandante.golsPro - mandante.golsContra;
    visitante.saldo = visitante.golsPro - visitante.golsContra;

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

  // ordena classificação
  tabela.sort(
    (a, b) =>
      b.pontos - a.pontos ||
      b.vitorias - a.vitorias ||
      b.saldo - a.saldo ||
      b.golsPro - a.golsPro
  );

  return tabela;
}
