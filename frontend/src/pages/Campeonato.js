import { useState } from "react";
import Rodada from "../components/Rodada";
import Classificacao from "../components/Classificacao";

export default function Campeonato() {
  // 👉 Coloque aqui o ID real do campeonato que você criou no banco
  const campeonatoId = "68dc6a973de529c4324199bd"; 
  const [rodada, setRodada] = useState(1);
  const [refreshClassificacao, setRefreshClassificacao] = useState(false);

  const handlePalpitar = () => {
    // Depois de palpitar, atualiza a classificação
    setRefreshClassificacao(!refreshClassificacao);

    // Avança para a próxima rodada automaticamente (se quiser)
    if (rodada < 38) {
      setRodada(rodada + 1);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Campeonato Brasileiro</h1>

      {/* Jogos da rodada */}
      <Rodada
        campeonatoId={campeonatoId}
        rodada={rodada}
        onPalpitar={handlePalpitar}
      />

      <hr style={{ margin: "20px 0" }} />

      {/* Classificação atualizada */}
      <Classificacao
        campeonatoId={campeonatoId}
        key={refreshClassificacao} // força recarregar quando palpitar
      />
    </div>
  );
}