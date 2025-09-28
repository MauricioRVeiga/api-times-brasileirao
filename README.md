⚽ API Times do Campeonato Brasileiro 2025
API REST desenvolvida em Node.js + Express + MongoDB Atlas, com CRUD completo para gerenciar os times da Série A do Brasileirão 2025.

🚀 Tecnologias Utilizadas
Node.js

Express

MongoDB Atlas

Mongoose

Nodemon

Dotenv

Morgan

CORS

⚙️ Instalação e Execução
Clone o repositório:

bash
git clone https://github.com/SEU_USUARIO/api-times-brasileirao.git
cd api-times-brasileirao
Instale as dependências:

bash
npm install
Configure o arquivo .env:

env
MONGODB_URI=mongodb+srv://usuario:senha@cluster0.xxxxx.mongodb.net/Brasileirao2025
PORT=4000
Rode em modo desenvolvimento:

bash
npm run dev
Acesse no navegador ou Insomnia:

Código
http://localhost:4000
📌 Endpoints da API
➕ Criar um time
POST /teams

Body (JSON):

json
{
  "nome": "Palmeiras",
  "estado": "SP",
  "cidade": "São Paulo",
  "fundacao": 1914,
  "cores": ["verde", "branco"],
  "estadio": { "nome": "Allianz Parque", "capacidade": 43000 },
  "elenco": [],
  "temporada": 2025
}
📋 Listar todos os times
GET /teams

🔍 Buscar um time por ID
GET /teams/:id

✏️ Atualizar um time
PUT /teams/:id

Body (JSON):

json
{
  "cidade": "São Paulo - Capital",
  "estadio": { "nome": "Allianz Parque", "capacidade": 45000 }
}
🗑️ Remover um time
DELETE /teams/:id

🧪 Testando no Insomnia/Postman
POST → Crie alguns times.

GET /teams → Liste todos e copie um _id.

GET /teams/:id → Busque pelo ID.

PUT /teams/:id → Atualize algum campo.

DELETE /teams/:id → Remova o time.

GET /teams → Confirme que foi removido.

📊 Banco de Dados
Banco: Brasileirao2025

Coleção: teams

Cada documento representa um time da Série A 2025.

📦 Inserção em Massa (opcional)

Você pode criar uma rota /teams/bulk para inserir os 19 times de uma vez usando um array JSON. O Santos pode ser inserido separadamente.

🛠️ .gitignore

Certifique-se de ter um arquivo .gitignore na raiz do projeto com o seguinte conteúdo:

Código
# Node.js
node_modules/

npm-debug.log

yarn-error.log

# Ambiente
.env

# Sistema
.DS_Store
Thumbs.db


👨‍💻 Autor
Mauricio – FATEC Registro
Bruno Davies - FATEC Registro

📌 Observações
IDs são gerados automaticamente pelo MongoDB.

O campo temporada já vem como 2025 por padrão.

Se enviar um ID inválido, a API retorna 400 Bad Request.

Se o time não existir, retorna 404 Not Found.
