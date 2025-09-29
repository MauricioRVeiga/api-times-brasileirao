# ⚽ API Times do Campeonato Brasileiro 2025

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org/)  
API REST desenvolvida em **Node.js + Express + MongoDB Atlas**, oferecendo um CRUD completo para gerenciar os times da **Série A do Brasileirão 2025**.

---

## 🚀 Tecnologias Utilizadas
- **Node.js** – Ambiente de execução JavaScript.
- **Express** – Framework para criação de APIs REST.
- **MongoDB Atlas** – Banco de dados NoSQL na nuvem.
- **Mongoose** – ODM para modelagem dos dados.
- **Nodemon** – Hot reload em desenvolvimento.
- **Dotenv** – Variáveis de ambiente.
- **Morgan** – Logger de requisições HTTP.
- **CORS** – Controle de acesso entre origens.

---

## ⚙️ Instalação e Execução

1. **Clone o repositório**
   ```bash
   git clone https://github.com/SEU_USUARIO/api-times-brasileirao.git
   cd api-times-brasileirao
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env` na raiz do projeto:
   ```env
   MONGODB_URI=mongodb+srv://usuario:senha@cluster0.xxxxx.mongodb.net/Brasileirao2025
   PORT=4000
   ```

4. **Execute em modo desenvolvimento**
   ```bash
   npm run dev
   ```

5. **Acesse a API**
   ```
   http://localhost:4000
   ```

---

## 📌 Endpoints da API

### ➕ Criar um time  
`POST /teams`  
**Body (JSON):**
```json
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
```

### 📋 Listar todos os times  
`GET /teams`

### 🔍 Buscar um time por ID  
`GET /teams/:id`

### ✏️ Atualizar um time  
`PUT /teams/:id`  
**Body (JSON):**
```json
{
  "cidade": "São Paulo - Capital",
  "estadio": { "nome": "Allianz Parque", "capacidade": 45000 }
}
```

### 🗑️ Remover um time  
`DELETE /teams/:id`

---

## 🧪 Testando com Insomnia/Postman
1. `POST /teams` → Crie alguns times.  
2. `GET /teams` → Liste todos e copie um `_id`.  
3. `GET /teams/:id` → Busque pelo ID.  
4. `PUT /teams/:id` → Atualize algum campo.  
5. `DELETE /teams/:id` → Remova o time.  
6. `GET /teams` → Confirme que foi removido.

---

## 📊 Banco de Dados
- **Banco:** `Brasileirao2025`  
- **Coleção:** `teams`  
Cada documento representa um time da Série A de 2025.

💡 **Inserção em massa (opcional)**:  
Implemente uma rota `/teams/bulk` para inserir todos os 19 times de uma vez usando um array JSON. O Santos pode ser inserido separadamente.

---

## 🛠️ .gitignore
Certifique-se de ter um arquivo `.gitignore` na raiz do projeto:
```
# Node.js
node_modules/
npm-debug.log
yarn-error.log

# Ambiente
.env

# Sistema
.DS_Store
Thumbs.db
```

---

## 👨‍💻 Autor
- Mauricio – [FATEC Registro](https://fatec.sp.gov.br)  
- Bruno Davies – [FATEC Registro](https://fatec.sp.gov.br)

---

## 📌 Observações
- IDs são gerados automaticamente pelo MongoDB.  
- O campo `temporada` é definido como `2025` por padrão.  
- Se enviar um ID inválido, a API retorna **400 Bad Request**.  
- Se o time não existir, retorna **404 Not Found**.  

---

### 💡 Sugestões Futuras
- Autenticação JWT para rotas protegidas.  
- Deploy no Render, Railway ou Vercel com banco MongoDB Atlas.  
- Documentação de API com Swagger/OpenAPI.
