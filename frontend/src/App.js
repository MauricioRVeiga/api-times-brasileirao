import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Campeonato from "./pages/Campeonato";
import Rodada from "./components/Rodada";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página inicial */}
        <Route path="/" element={<Home />} />

        {/* Página principal do campeonato */}
        <Route path="/campeonatos/:campeonatoId" element={<Campeonato />} />

        {/* Página de uma rodada específica */}
        <Route path="/campeonatos/:campeonatoId/rodadas/:rodada" element={<Rodada />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
