import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateTeam() {
  const [nome, setNome] = useState("");
  const [estado, setEstado] = useState("");
  const [titulos, setTitulos] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/teams", { nome, estado, titulos: Number(titulos) });
      alert("Time criado com sucesso!");
      navigate("/teams"); // redireciona para listagem
    } catch (err) {
      alert("Erro ao criar time. Verifique se está logado.");
    }
  }

  return (
    <div>
      <h2>Cadastrar Novo Time</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do time"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        /><br/>
        <input
          type="text"
          placeholder="Estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          required
        /><br/>
        <input
          type="number"
          placeholder="Títulos"
          value={titulos}
          onChange={(e) => setTitulos(e.target.value)}
          required
        /><br/>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default CreateTeam;
