import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Teams() {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  // Carrega os times
  useEffect(() => {
    fetchTeams();
  }, []);

  async function fetchTeams() {
    try {
      const res = await api.get("/teams");
      setTeams(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  // Deletar time
  async function handleDelete(id) {
    if (window.confirm("Tem certeza que deseja excluir este time?")) {
      try {
        await api.delete(`/teams/${id}`);
        alert("Time removido com sucesso!");
        fetchTeams(); // recarrega lista
      } catch (err) {
        alert("Erro ao excluir time");
      }
    }
  }

  // Ir para edição
  function handleEdit(id) {
    navigate(`/teams/edit/${id}`);
  }

  return (
    <div>
      <h2>Times do Brasileirão</h2>

      <Link to="/teams/new">
        <button>Novo Time</button>
      </Link>

      <ul>
        {teams.map((team) => (
          <li key={team._id}>
            {team.nome} - {team.estado} ({team.titulos} títulos)
            {" "}
            <button onClick={() => handleEdit(team._id)}>Editar</button>
            <button onClick={() => handleDelete(team._id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Teams;
